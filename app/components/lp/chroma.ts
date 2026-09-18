import { FAIXAS_CAPITAL, PARTICIPOU_SCP } from "./lp-config";
import type { Lead } from "./validar";

/**
 * Envio do lead ao CRM Chroma — webhook "LPs amaan".
 *
 * O segredo da webhook viaja na query string, então a URL inteira é o
 * segredo: a chamada só pode sair do servidor. Este módulo é importado
 * exclusivamente pela Server Action (`actions.ts`), e a URL vem de
 * `CHROMA_WEBHOOK_URL` — sem o prefixo `NEXT_PUBLIC_`, que é justamente o
 * que impede o Next de inliná-la no pacote que vai para o navegador. Posta
 * daqui de dentro de um componente cliente, ela apareceria inteira na aba de
 * rede de qualquer visitante.
 *
 * Nada aqui barra a tela de sucesso: a chamada roda em `after()` (ver
 * `actions.ts`), depois da resposta já ter saído. Quem preencheu não espera o
 * CRM, e as retentativas cabem sem segurar o formulário.
 *
 * Variável de ambiente:
 *
 *   CHROMA_WEBHOOK_URL=https://chromacrm.vercel.app/api/webhooks/nova-captacao-515314?secret=…
 *
 * (em `.env.local` para desenvolvimento; na Vercel, em Settings → Environment
 * Variables — `.env.local` não sobe no deploy.)
 */

/**
 * As cinco chaves que a webhook lê.
 *
 * Tipo fechado de propósito: chave fora desta lista o CRM descarta em
 * silêncio, sem erro nenhum na resposta — e acento, hífen e maiúscula contam
 * (`email` não é `e-mail`). Um erro de digitação aqui não apareceria em lugar
 * nenhum a não ser num campo vazio na ficha do contato, semanas depois.
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
};

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
  };
}

/**
 * Posta o lead na webhook. Nunca lança: quem chama está em `after()`, onde
 * uma exceção não teria a quem ser contada.
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
  const url = process.env.CHROMA_WEBHOOK_URL;

  if (!url) {
    console.error(
      "[chroma] CHROMA_WEBHOOK_URL não configurada — lead para reenvio manual:",
      lead
    );
    return;
  }

  const corpo = JSON.stringify(payloadChroma(lead));

  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa++) {
    try {
      const resposta = await fetch(url, {
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
          `[chroma] lead registrado (contato ${dados?.contato_id ?? "sem id"})`
        );
        return;
      }

      if (resposta.status < 500) {
        const detalhe = await resposta.text().catch(() => "");
        console.error(
          `[chroma] recusado com ${resposta.status}: ${detalhe} — lead para reenvio manual:`,
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
          `[chroma] falha após ${TENTATIVAS} tentativas:`,
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
