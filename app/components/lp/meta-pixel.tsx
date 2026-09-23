"use client";

import { useEffect } from "react";

import type { OrigemLead } from "./lead";
import { conteudo, eventosDeConversao } from "./meta-eventos";

/**
 * Eventos do Meta Pixel nas duas LPs do Funil 1.
 *
 * O código base (`init` e PageView) está no `<head>` de todas as páginas —
 * ver `components/meta-pixel-base.tsx`. Aqui ficam só os eventos que dizem
 * respeito às LPs, por ordem no funil:
 *  - `ViewContent` — a visita, com o nome da LP;
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

/** ViewContent da LP. Vai uma vez em cada página. */
export function MetaPixel({ origem }: { origem: OrigemLead }) {
  useEffect(() => {
    window.fbq?.("track", "ViewContent", conteudo(origem));
  }, [origem]);

  return null;
}
