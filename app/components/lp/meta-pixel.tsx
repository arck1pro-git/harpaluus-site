"use client";

import { useEffect, useRef } from "react";

import type { OrigemLead } from "./lead";
import { conteudo, nomeDoEvento } from "./meta-eventos";

/**
 * Eventos do Meta Pixel nas duas LPs do Funil 1.
 *
 * Nas LPs todos os eventos são personalizados, com a LP no nome (ver
 * `nomeDoEvento`, em `meta-eventos.ts`) — nenhum evento padrão do Meta sai
 * delas. Por ordem no funil:
 *  - `PageView_lp1` / `_lp2` — do código base no `<head>` (ver
 *    `components/meta-pixel-base.tsx`);
 *  - `ViewContent_lp1` / `_lp2` — a pessoa chegou ao fim da página;
 *  - `AbriuFormulario_lp1` / `_lp2` — clique em qualquer CTA;
 *  - `Lead_lp1` / `_lp2` — cadastro aceito pelo servidor.
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

/**
 * ViewContent de quem rolou até o fim da LP. Fica no último lugar da página:
 * quando entra na tela, o evento sai — uma vez por visita à página.
 */
export function MetaViuConteudo({ origem }: { origem: OrigemLead }) {
  const marco = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alvo = marco.current;
    if (!alvo) return;

    const observador = new IntersectionObserver((entradas) => {
      if (!entradas.some((entrada) => entrada.isIntersecting)) return;
      observador.disconnect();
      window.fbq?.("trackCustom", nomeDoEvento("ViewContent", origem), conteudo(origem));
    });

    observador.observe(alvo);
    return () => observador.disconnect();
  }, [origem]);

  return <div ref={marco} aria-hidden className="h-px w-full" />;
}

/** Clique num CTA: a janela do formulário abriu. */
export function rastrearAbertura(origem: OrigemLead) {
  window.fbq?.("trackCustom", nomeDoEvento("AbriuFormulario", origem), conteudo(origem));
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

  window.fbq("trackCustom", nomeDoEvento("Lead", origem), parametros, opcoes);
}
