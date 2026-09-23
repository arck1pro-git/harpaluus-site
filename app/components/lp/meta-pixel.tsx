"use client";

import { useEffect } from "react";

import type { OrigemLead } from "./lead";
import { conteudo, eventosDeConversao, PIXEL_ID } from "./meta-eventos";

/**
 * Meta Pixel das duas LPs do Funil 1.
 *
 * O snippet oficial do Meta vive aqui reescrito como função, e não num
 * `<Script>` inline: o inline roda uma vez por carregamento de documento, e
 * quem chega a uma LP por navegação interna (da home, ou de uma LP para a
 * outra) nunca dispararia o PageView. Aqui o `fbq` é instalado uma única vez
 * por sessão de página, e o PageView sai a cada montagem de LP.
 *
 * Eventos, por ordem no funil:
 *  - `PageView` e `ViewContent` — a visita, com o nome da LP;
 *  - `AbriuFormulario` (personalizado) — clique em qualquer CTA;
 *  - `Lead` — cadastro aceito pelo servidor. Na LP01 também
 *    `CompleteRegistration`, porque a troca ali é o material gratuito.
 *
 * Nada de dado pessoal nos parâmetros do navegador. Nome, e-mail e WhatsApp
 * vão só pela API de Conversões, com hash, a partir do servidor
 * (`meta-capi.ts`) — e o `eventID` compartilhado faz o Meta contar o
 * cadastro uma vez só.
 */

type Fbq = ((...argumentos: unknown[]) => void) & {
  callMethod?: (...argumentos: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** O snippet do Meta, idempotente: a partir da segunda chamada não faz nada. */
function instalarPixel() {
  if (window.fbq) return;

  const fbq = function (...argumentos: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...argumentos);
    else fbq.queue.push(argumentos);
  } as Fbq;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq ??= fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", PIXEL_ID);
}

/** Clique num CTA: a janela do formulário abriu. */
export function rastrearAbertura(origem: OrigemLead) {
  window.fbq?.("trackCustom", "AbriuFormulario", conteudo(origem));
}

/**
 * Cadastro aceito. Só as respostas de qualificação da LP02 acompanham o
 * evento — elas servem para montar público e otimizar campanha por faixa.
 */
export function rastrearLead(
  origem: OrigemLead,
  envio?: { idEvento?: string; faixaCapital?: string; experiencia?: string }
) {
  if (!window.fbq) return;

  const parametros = {
    ...conteudo(origem),
    ...(envio?.faixaCapital && { faixa_capital: envio.faixaCapital }),
    ...(envio?.experiencia && { participou_scp: envio.experiencia }),
  };
  const opcoes = envio?.idEvento ? { eventID: envio.idEvento } : undefined;

  for (const evento of eventosDeConversao(origem)) {
    window.fbq("track", evento, parametros, opcoes);
  }
}

/** PageView e ViewContent da LP. Vai uma vez em cada página. */
export function MetaPixel({ origem }: { origem: OrigemLead }) {
  useEffect(() => {
    instalarPixel();
    window.fbq?.("track", "PageView");
    window.fbq?.("track", "ViewContent", conteudo(origem));
  }, [origem]);

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element -- pixel de 1px sem JS, não é imagem de conteúdo */}
      <img
        height="1"
        width="1"
        alt=""
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
