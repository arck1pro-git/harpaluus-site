import "server-only";

import { createHash } from "node:crypto";
import { cookies, headers } from "next/headers";

import { conteudo, EVENTOS_DO_NAVEGADOR, idDeEventoValido, nomeDoEvento, PIXEL_ID } from "./meta-eventos";
import type { Lead } from "./validar";

/**
 * Envio dos eventos à API de Conversões do Meta, pelo servidor.
 *
 * Existe em paralelo ao Pixel porque o navegador perde evento — bloqueador
 * de anúncio, iOS, aba fechada antes de o `fbevents.js` carregar. Todo evento
 * sai pelos dois caminhos com o mesmo `event_id`, gerado no navegador, e o
 * Meta conta cada um uma vez só:
 *  - o Lead, pela Server Action do formulário (`enviarAoMeta`) — o id vem
 *    do campo oculto, ver `formulario.tsx`;
 *  - PageView, ViewContent e AbriuFormulario, pela rota `/api/sinal`
 *    (`enviarEventosDoNavegador`) — o id vem de `emitirEvento`, em
 *    `meta-pixel.tsx`, e do código base no `<head>`.
 *
 * Só o Lead leva o que o Pixel não manda: e-mail, WhatsApp e nome, sempre em
 * SHA-256, como o Meta exige — o dado legível nunca sai do servidor.
 *
 * O token vem de `META_CAPI_TOKEN` (só no `.env.local` e na Vercel). Sem ele,
 * o envio simplesmente não acontece. `META_CAPI_TEST_CODE` é opcional: com um
 * código da aba "Eventos de teste" do Gerenciador, os eventos caem lá em vez
 * de contarem para as campanhas.
 *
 * Roda em `after()`, como o envio ao CRM: falha vira log, nunca erro na tela.
 */

const VERSAO_API = "v23.0";

/** O que só a requisição conhece: quem é o navegador e de onde ele veio. */
export type ContextoEvento = {
  idEvento?: string;
  url?: string;
  ip?: string;
  userAgent?: string;
  /** cookie `_fbp`, criado pelo Pixel */
  fbp?: string;
  /** cookie `_fbc`, ou montado a partir do `fbclid` do anúncio */
  fbc?: string;
};

/**
 * O que liga o evento ao clique no anúncio, lido da requisição em curso — a
 * da Server Action ou a da rota. Chamar durante a requisição, e não dentro
 * do `after()`.
 *
 * `idEvento` e `urlInformada` vêm do navegador. A URL é a da página, com o
 * `fbclid` de quem chegou pelo anúncio; o Referer fica de reserva, porque
 * política de referrer, proxy ou extensão de privacidade podem reduzi-lo à
 * origem — e aí o Meta registra `amaan.com.br/` sem o `/lp1` ou `/lp2`. Só
 * vale URL deste mesmo host: o campo é forjável.
 */
export async function lerContexto(idEvento: string, urlInformada: string): Promise<ContextoEvento> {
  const cabecalhos = await headers();
  const biscoitos = await cookies();

  const host = cabecalhos.get("host");
  const url = [urlInformada, cabecalhos.get("referer")].find(
    (valor) => valor && URL.canParse(valor) && new URL(valor).host === host
  ) || undefined;
  let fbc = biscoitos.get("_fbc")?.value;

  if (!fbc && url) {
    const fbclid = new URL(url).searchParams.get("fbclid");
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }

  return {
    idEvento: idDeEventoValido(idEvento),
    url,
    ip: cabecalhos.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    userAgent: cabecalhos.get("user-agent") ?? undefined,
    fbp: biscoitos.get("_fbp")?.value,
    fbc,
  };
}

function hash(valor: string) {
  return createHash("sha256").update(valor.trim().toLowerCase()).digest("hex");
}

/** O navegador, sem dado pessoal: é o que todo evento leva em `user_data`. */
function dadosDoNavegador(contexto: ContextoEvento) {
  return {
    ...(contexto.ip && { client_ip_address: contexto.ip }),
    ...(contexto.userAgent && { client_user_agent: contexto.userAgent }),
    ...(contexto.fbp && { fbp: contexto.fbp }),
    ...(contexto.fbc && { fbc: contexto.fbc }),
  };
}

/** Um evento do lado do servidor. Nome e `event_id` iguais aos do Pixel. */
function evento(
  nome: string,
  contexto: ContextoEvento,
  dadosUsuario: object,
  dadosCustom: object | undefined
) {
  return {
    event_name: nome,
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    ...(contexto.idEvento && { event_id: contexto.idEvento }),
    ...(contexto.url && { event_source_url: contexto.url }),
    user_data: dadosUsuario,
    ...(dadosCustom && { custom_data: dadosCustom }),
  };
}

async function enviar(eventos: object[]) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return;

  const corpo = {
    data: eventos,
    ...(process.env.META_CAPI_TEST_CODE && {
      test_event_code: process.env.META_CAPI_TEST_CODE,
    }),
  };

  try {
    const resposta = await fetch(
      `https://graph.facebook.com/${VERSAO_API}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(corpo),
        signal: AbortSignal.timeout(10_000),
      }
    );

    if (!resposta.ok) {
      throw new Error(`respondeu ${resposta.status}: ${await resposta.text()}`);
    }
  } catch (erro) {
    /* Sem o lead no log: ele já está no CRM, e aqui só importa saber que o
       Meta não recebeu. */
    console.error("[meta-capi] falha ao enviar evento:", erro);
  }
}

/** O cadastro, com os dados da pessoa em hash. */
export async function enviarAoMeta(lead: Lead, contexto: ContextoEvento) {
  const [primeiro, ...resto] = lead.nome.split(/\s+/);
  const sobrenome = resto.at(-1);

  const dadosUsuario = {
    em: [hash(lead.email)],
    // já chega em E.164 sem o "+", que é o formato que o Meta pede
    ph: [hash(lead.whatsapp)],
    fn: [hash(primeiro)],
    ...(sobrenome && { ln: [hash(sobrenome)] }),
    country: [hash("br")],
    ...dadosDoNavegador(contexto),
  };

  const dadosCustom = {
    ...conteudo(lead.origem),
    ...(lead.faixaCapital && { faixa_capital: lead.faixaCapital }),
    ...(lead.experiencia && { participou_scp: lead.experiencia }),
  };

  // os mesmos dois do Pixel — `Lead` e `Lead_lp1` / `Lead_lp2`: nome e
  // `event_id` iguais é o que faz o Meta juntar os dois lados num cadastro só
  await enviar(
    ["Lead", nomeDoEvento("Lead", lead.origem)].map((nome) =>
      evento(nome, contexto, dadosUsuario, dadosCustom)
    )
  );
}

/**
 * O par de servidor de PageView, ViewContent e AbriuFormulario. Os nomes já
 * vêm conferidos contra `EVENTOS_DO_NAVEGADOR`, e os parâmetros saem de lá.
 */
export async function enviarEventosDoNavegador(nomes: string[], contexto: ContextoEvento) {
  const dadosUsuario = dadosDoNavegador(contexto);

  await enviar(
    nomes.map((nome) => evento(nome, contexto, dadosUsuario, EVENTOS_DO_NAVEGADOR.get(nome)))
  );
}
