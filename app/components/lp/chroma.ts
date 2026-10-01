import "server-only";

import type { OrigemLead } from "./lead";
import {
  FAIXAS_CAPITAL,
  FAIXAS_CAPITAL_LP3,
  MODALIDADES_LP3,
  PARTICIPOU_SCP,
  PRAZOS_DECISAO_LP3,
} from "./lp-config";
import { PIXEL_ID } from "./meta-eventos";
import type { Utms } from "./utms";
import type { Lead } from "./validar";

/**
 * Envio do lead ao CRM Chroma — uma webhook por LP.
 *
 * As da LP01 e da LP02 são webhooks irmãs, de corpo idêntico, e a única
 * diferença está do lado do CRM: cada uma faz o contato nascer numa etapa
 * diferente do funil. Por isso o destino é escolhido pela origem do lead, e
 * não por uma constante única — trocar as duas de lugar não daria erro nenhum
 * aqui, nem no CRM: os leads apenas cairiam na etapa errada, e só o Comercial
 * notaria, dias depois. A da LP03 ("LP3", formulário de investimento) é de
 * outra família, com chaves próprias — ver `PayloadChromaLp3`.
 *
 * O segredo de cada webhook viaja na query string, então a URL inteira é o
 * segredo — e por isso todas vêm do ambiente (`CHROMA_WEBHOOK_LP1`,
 * `CHROMA_WEBHOOK_LP2` e `CHROMA_WEBHOOK_LP3`, no `.env.local` e na Vercel),
 * e não do repositório. Trocar uma delas é trocar a variável e publicar de
 * novo.
 *
 * O `import "server-only"` da primeira linha continua de guarda: importar
 * este módulo de um componente cliente quebra o build, em vez de deixar o
 * código que lê as URLs chegar ao pacote do navegador.
 *
 * Nada aqui barra a tela de sucesso: a chamada roda em `after()` (ver
 * `actions.ts`), depois da resposta já ter saído. Quem preencheu não espera o
 * CRM, e as retentativas cabem sem segurar o formulário.
 */
const WEBHOOKS: Record<OrigemLead, string | undefined> = {
  /* Webhook "LPs amaan" — o contato entra na etapa novo contato. */
  "lp1-checklist": process.env.CHROMA_WEBHOOK_LP1,
  /* Webhook "LPs amaan - sem doc" — cópia da de cima, com uma etapa própria:
     novo contato - sem doc. */
  "lp2-interesse": process.env.CHROMA_WEBHOOK_LP2,
  /* LP03 sem a webhook própria no ambiente: entra pela da LP02, no corpo da
     LP02 — etapa errada, mas no CRM. É a troca consciente contra a
     alternativa, que seria o lead ficar só no log esperando reenvio manual.
     Com `CHROMA_WEBHOOK_LP3` presente, quem decide é `destino`. */
  "lp3-scp": process.env.CHROMA_WEBHOOK_LP2,
};

/** Webhook "LP3" do Chroma (formulário de investimento). */
const WEBHOOK_LP3 = process.env.CHROMA_WEBHOOK_LP3;

/**
 * As chaves que a webhook lê.
 *
 * Tipo fechado de propósito: chave fora desta lista o CRM descarta em
 * silêncio, sem erro nenhum na resposta — e acento, hífen e maiúscula contam
 * (`email` não é `e-mail`). Um erro de digitação aqui não apareceria em lugar
 * nenhum a não ser num campo vazio na ficha do contato, semanas depois.
 *
 * As dez estão conferidas contra a ficha do contato. As de UTM entraram
 * depois, com o nome padrão do parâmetro, e foram confirmadas por envio de
 * teste em 21/09/2026: o contato chegou com os cinco campos preenchidos.
 */
type PayloadChroma = {
  /** Contato · Nome */
  nome?: string;
  /** Contato · WhatsApp */
  whatsapp?: string;
  /** Contato · E-mail */
  email?: string;
  /** Contato · campo "valor_inicial" */
  valor?: string;
  /** Contato · campo "participa_de_uma_scp" */
  scp?: string;
  /** Id do Pixel do Meta que disparou o Lead na LP — o mesmo nas duas. */
  pixel_id?: string;
  /**
   * As três de baixo são da LP03 e só viajam neste corpo quando ela cai na
   * webhook da LP02, sem `CHROMA_WEBHOOK_LP3` no ambiente. ⚠️ Nunca foram
   * conferidas contra a ficha daquela webhook: se ela não tiver campos com
   * estes nomes, as três respostas são descartadas em silêncio — o lead
   * entra mesmo assim.
   */
  modalidade?: string;
  prazo_decisao?: string;
  profissao?: string;
} & Utms;

/** Quantas vezes tentar no total (a primeira mais duas retentativas). */
const TENTATIVAS = 3;

/**
 * Teto por tentativa e espera progressiva entre elas.
 *
 * O pior caso soma ~20s, e só acontece se o CRM pendurar a conexão nas três
 * tentativas. É orçamento de `after()`, que corre dentro do tempo máximo da
 * função na plataforma — se estourar, o envio morre com ela, que é o mesmo
 * desfecho de desistir: o lead fica no log para reenvio manual.
 */
const TIMEOUT_MS = 6_000;
const ESPERAS_MS = [1_000, 3_000];

const esperar = (ms: number) => new Promise((pronto) => setTimeout(pronto, ms));

/**
 * O CRM recebe o rótulo, não o `value` do `<select>`.
 *
 * "De R$ 100 mil a R$ 300 mil" é o que o Comercial precisa ler na ficha;
 * "100k-300k" é detalhe de implementação do formulário. Valor fora da lista
 * não deveria chegar aqui — `validarLead` confere os dois selects contra as
 * opções —, mas se chegar, segue como veio: dado torto na ficha é melhor do
 * que campo vazio.
 */
function rotulo(
  lista: readonly { value: string; label: string }[],
  valor?: string
) {
  if (!valor) return undefined;
  return lista.find((opcao) => opcao.value === valor)?.label ?? valor;
}

/**
 * Do lead validado para o corpo da webhook.
 *
 * `undefined` sai do JSON sozinho no `stringify`, então os campos que a LP01
 * não coleta simplesmente não viajam — nenhum campo é obrigatório do lado do
 * CRM, e mandar string vazia só escreveria vazio por cima da ficha.
 */
export function payloadChroma(lead: Lead): PayloadChroma {
  /* A LP03 tem faixas próprias; o mesmo `value` ("100k-300k") existe nas
     duas listas, então a lista certa sai da origem, não de uma busca geral. */
  const faixas = lead.origem === "lp3-scp" ? FAIXAS_CAPITAL_LP3 : FAIXAS_CAPITAL;

  return {
    nome: lead.nome,
    /* `normalizarWhatsApp` já devolve E.164 sem símbolos (`5547999998888`),
       que é exatamente o que a webhook pede: só dígitos, com DDI e DDD. */
    whatsapp: lead.whatsapp,
    email: lead.email,
    valor: rotulo(faixas, lead.faixaCapital),
    scp: rotulo(PARTICIPOU_SCP, lead.experiencia),
    modalidade: rotulo(MODALIDADES_LP3, lead.modalidade),
    prazo_decisao: rotulo(PRAZOS_DECISAO_LP3, lead.prazoDecisao),
    profissao: lead.profissao,
    pixel_id: PIXEL_ID,
    /* Uma chave por parâmetro, com o nome padrão da UTM. `lead.utm` só
       carrega as que existem, então a visita orgânica não escreve nenhuma —
       nem vazia, que é o que apagaria a campanha de um contato reenviado. */
    ...lead.utm,
  };
}

/**
 * As chaves da webhook "LP3" (formulário de investimento), como a
 * especificação do Chroma as define em 01/10/2026. São outras que as das
 * LP01/LP02, e a regra é a mesma: chave fora da lista o CRM descarta em
 * silêncio. `nome_completo` e `whatsapp` são obrigatórias — sem elas a
 * webhook responde 422 —, e `validarLead` já não deixa nenhuma das duas
 * chegar vazia.
 */
type PayloadChromaLp3 = {
  /** Contato · Nome */
  nome_completo: string;
  /** Contato · WhatsApp — só dígitos, com DDI e DDD */
  whatsapp: string;
  /** Contato · E-mail */
  email?: string;
  /** Contato · campo "valor_inicial" */
  quanto_pretende_investir?: string;
  /** Contato · campo "ja_investe" */
  onde_investe_hoje?: string;
  /** Contato · campo "pronto_para_investir" */
  em_quanto_tempo_pretende_investir?: string;
  /** Contato · campo "profissao" */
  profissao?: string;
} & Utms;

/** O lead da LP03 no corpo da webhook "LP3" — rótulos, como nas outras. */
export function payloadChromaLp3(lead: Lead): PayloadChromaLp3 {
  return {
    nome_completo: lead.nome,
    whatsapp: lead.whatsapp,
    email: lead.email,
    quanto_pretende_investir: rotulo(FAIXAS_CAPITAL_LP3, lead.faixaCapital),
    onde_investe_hoje: rotulo(MODALIDADES_LP3, lead.modalidade),
    em_quanto_tempo_pretende_investir: rotulo(PRAZOS_DECISAO_LP3, lead.prazoDecisao),
    profissao: lead.profissao,
    ...lead.utm,
  };
}

/**
 * Para onde vai o lead, e em que formato. A LP03 só usa a webhook e o corpo
 * próprios quando `CHROMA_WEBHOOK_LP3` existe; sem ela, segue o caminho da
 * LP02 (ver `WEBHOOKS`).
 */
function destino(lead: Lead) {
  if (lead.origem === "lp3-scp" && WEBHOOK_LP3) {
    return { webhook: WEBHOOK_LP3, corpo: payloadChromaLp3(lead) };
  }
  return { webhook: WEBHOOKS[lead.origem], corpo: payloadChroma(lead) };
}

/**
 * Posta o lead na webhook da LP de onde ele veio. Nunca lança: quem chama
 * está em `after()`, onde uma exceção não teria a quem ser contada.
 *
 * O tratamento segue o contrato da webhook:
 *
 * - 200 — recebido, com `contato_id` no corpo. Não reenviar.
 * - 4xx — recusa definitiva (422 payload inválido, 401 segredo errado, 404
 *   webhook desativada). Repetir o mesmo corpo falha igual, então para aqui.
 * - 5xx e falha de rede — instabilidade do CRM: reenvia com espera
 *   progressiva.
 *
 * Em toda saída sem sucesso o lead inteiro vai para o log de erro. É de lá
 * que ele é reenviado à mão — nenhum cadastro pode sumir em silêncio porque
 * uma integração estava fora do ar.
 */
export async function enviarAoChroma(lead: Lead) {
  const { webhook, corpo: payload } = destino(lead);
  const corpo = JSON.stringify(payload);

  /* Variável faltando é erro de configuração, não motivo para perder o
     cadastro: o lead vai para o log, como em qualquer outra falha. */
  if (!webhook) {
    console.error(
      `[chroma] ${lead.origem}: webhook não configurada no ambiente — lead para reenvio manual:`,
      lead
    );
    return;
  }

  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa++) {
    try {
      const resposta = await fetch(webhook, {
        method: "POST",
        /* O segredo já está na URL: a webhook não espera header de
           autenticação, e mandar um só vazaria credencial em log de proxy. */
        headers: { "content-type": "application/json" },
        body: corpo,
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (resposta.ok) {
        /* O corpo é `{ ok: true, contato_id: "…" }`. O id é o que permite
           achar o contato no CRM depois — e a leitura é tolerante porque uma
           resposta 200 com corpo inesperado não desfaz o registro. */
        const dados = (await resposta.json().catch(() => null)) as {
          contato_id?: string;
        } | null;

        console.info(
          `[chroma] ${lead.origem}: lead registrado (contato ${dados?.contato_id ?? "sem id"})`
        );
        return;
      }

      if (resposta.status < 500) {
        const detalhe = await resposta.text().catch(() => "");
        console.error(
          `[chroma] ${lead.origem}: recusado com ${resposta.status}: ${detalhe} — lead para reenvio manual:`,
          lead
        );
        return;
      }

      /* 5xx cai no `catch` de propósito: falha temporária do CRM e falha de
         rede são a mesma coisa daqui, e as duas têm o mesmo remédio. */
      throw new Error(`CRM respondeu ${resposta.status}`);
    } catch (erro) {
      if (tentativa === TENTATIVAS) {
        console.error(
          `[chroma] ${lead.origem}: falha após ${TENTATIVAS} tentativas:`,
          erro,
          "— lead para reenvio manual:",
          lead
        );
        return;
      }

      await esperar(ESPERAS_MS[tentativa - 1]);
    }
  }
}
