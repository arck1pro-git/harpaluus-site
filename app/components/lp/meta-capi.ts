import "server-only";

import { createHash } from "node:crypto";

import { conteudo, eventosDeConversao, PIXEL_ID } from "./meta-eventos";
import type { Lead } from "./validar";

/**
 * Envio do cadastro à API de Conversões do Meta, pelo servidor.
 *
 * Existe em paralelo ao Pixel porque o navegador perde evento — bloqueador
 * de anúncio, iOS, aba fechada logo depois do envio. Os dois caminhos mandam o
 * mesmo `event_id` (gerado no navegador, ver `formulario.tsx`), e o Meta conta
 * o cadastro uma vez só.
 *
 * Aqui vai o que o Pixel não manda: e-mail, WhatsApp e nome, sempre em SHA-256,
 * como o Meta exige — o dado legível nunca sai do servidor.
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

function hash(valor: string) {
  return createHash("sha256").update(valor.trim().toLowerCase()).digest("hex");
}

export async function enviarAoMeta(lead: Lead, contexto: ContextoEvento) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return;

  const [primeiro, ...resto] = lead.nome.split(/\s+/);
  const sobrenome = resto.at(-1);

  const dadosUsuario = {
    em: [hash(lead.email)],
    // já chega em E.164 sem o "+", que é o formato que o Meta pede
    ph: [hash(lead.whatsapp)],
    fn: [hash(primeiro)],
    ...(sobrenome && { ln: [hash(sobrenome)] }),
    country: [hash("br")],
    ...(contexto.ip && { client_ip_address: contexto.ip }),
    ...(contexto.userAgent && { client_user_agent: contexto.userAgent }),
    ...(contexto.fbp && { fbp: contexto.fbp }),
    ...(contexto.fbc && { fbc: contexto.fbc }),
  };

  const dadosCustom = {
    ...conteudo(lead.origem),
    ...(lead.faixaCapital && { faixa_capital: lead.faixaCapital }),
    ...(lead.experiencia && { participou_scp: lead.experiencia }),
  };

  const momento = Math.floor(Date.now() / 1000);

  const corpo = {
    data: eventosDeConversao(lead.origem).map((nome) => ({
      event_name: nome,
      event_time: momento,
      action_source: "website",
      ...(contexto.idEvento && { event_id: contexto.idEvento }),
      ...(contexto.url && { event_source_url: contexto.url }),
      user_data: dadosUsuario,
      custom_data: dadosCustom,
    })),
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
