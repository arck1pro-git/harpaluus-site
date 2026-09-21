import "server-only";

import type { OrigemLead } from "./lead";
import { FAIXAS_CAPITAL, PARTICIPOU_SCP } from "./lp-config";
import type { Utms } from "./utms";
import type { Lead } from "./validar";

/**
 * Envio do lead ao CRM Chroma — uma webhook por LP.
 *
 * São duas webhooks irmãs, de corpo idêntico, e a única diferença está do
 * lado do CRM: cada uma faz o contato nascer numa etapa diferente do funil.
 * Por isso o destino é escolhido pela origem do lead, e não por uma constante
 * única — trocar as duas de lugar não daria erro nenhum aqui, nem no CRM: os
 * leads apenas cairiam na etapa errada, e só o Comercial notaria, dias
 * depois.
 *
 * O segredo de cada webhook viaja na query string, então a URL inteira é o
 * segredo, e as duas estão fixas aqui embaixo (`WEBHOOKS`) em vez de virem do
 * ambiente. Quem lê o repositório lê a credencial: trocá-la é trocar estas
 * linhas e publicar de novo, e o histórico do git guarda as antigas.
 *
 * O que impede as URLs de acabarem no navegador é o `import "server-only"` da
 * primeira linha: com ele, importar este módulo de um componente cliente
 * quebra o build em vez de embutir as strings no pacote. Sem essa linha nada
 * avisaria — uma constante não tem o `NEXT_PUBLIC_` para servir de aviso, e
 * o vazamento só apareceria na aba de rede de um visitante.
 *
 * Nada aqui barra a tela de sucesso: a chamada roda em `after()` (ver
 * `actions.ts`), depois da resposta já ter saído. Quem preencheu não espera o
 * CRM, e as retentativas cabem sem segurar o formulário.
 */
const WEBHOOKS: Record<OrigemLead, string> = {
  /* Webhook "LPs amaan" — o contato entra na etapa novo contato. */
  "lp1-checklist":
    "https://chromacrm.vercel.app/api/webhooks/nova-captacao-515314?secret=0bfc50194e3224c2822387d1d75856630f637044fcd6360856c28f37190ba3c5",
  /* Webhook "LPs amaan - sem doc" — cópia da de cima, com uma etapa própria:
     novo contato - sem doc. */
  "lp2-interesse":
    "https://chromacrm.vercel.app/api/webhooks/lps-amaan-sem-doc-381d95?secret=faf4c41f566b07d963e26c08b5d43ddeaa25ae4bd0d4fe777765289369c7635d",
};

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
  return {
    nome: lead.nome,
    /* `normalizarWhatsApp` já devolve E.164 sem símbolos (`5547999998888`),
       que é exatamente o que a webhook pede: só dígitos, com DDI e DDD. */
    whatsapp: lead.whatsapp,
    email: lead.email,
    valor: rotulo(FAIXAS_CAPITAL, lead.faixaCapital),
    scp: rotulo(PARTICIPOU_SCP, lead.experiencia),
    /* Uma chave por parâmetro, com o nome padrão da UTM. `lead.utm` só
       carrega as que existem, então a visita orgânica não escreve nenhuma —
       nem vazia, que é o que apagaria a campanha de um contato reenviado. */
    ...lead.utm,
  };
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
  const corpo = JSON.stringify(payloadChroma(lead));
  const webhook = WEBHOOKS[lead.origem];

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
