"use client";

import { useEffect, useRef } from "react";

import type { OrigemLead } from "./lead";
import { conteudo, nomeDoEvento, ROTA_SINAL } from "./meta-eventos";

/**
 * Eventos do Meta Pixel nas LPs do Funil 1.
 *
 * Nas LPs os eventos são personalizados, com a LP no nome (ver
 * `nomeDoEvento`, em `meta-eventos.ts`). `PageView` e `Lead` saem também na
 * versão padrão do Meta, porque as métricas nativas do Gerenciador de
 * Anúncios dependem delas. Por ordem no funil:
 *  - `PageView` + `PageView_lp1` / `_lp2` — do código base no `<head>` (ver
 *    `components/meta-pixel-base.tsx`);
 *  - `ViewContent_lp1` / `_lp2` — a pessoa chegou ao fim da página;
 *  - `AbriuFormulario_lp1` / `_lp2` — clique em qualquer CTA;
 *  - `Lead` + `Lead_lp1` / `_lp2` — cadastro aceito pelo servidor.
 *
 * Todos saem também pela API de Conversões, com o mesmo `eventID` dos dois
 * lados — é o que faz o Meta contar cada um uma vez só. O Lead pela Server
 * Action do formulário; os outros por `emitirEvento`, aqui embaixo.
 *
 * Nada de dado pessoal nos parâmetros do navegador. Nome, e-mail e WhatsApp
 * vão só pela API de Conversões, com hash, a partir do servidor
 * (`meta-capi.ts`).
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
 * Um id por acontecimento. `randomUUID` só existe em contexto seguro (HTTPS
 * ou localhost); fora dele — o celular abrindo o servidor de dev pelo IP da
 * rede — sai um id de tempo + acaso, que também passa por `idDeEventoValido`.
 */
function novoIdDeEvento() {
  return (
    crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2)
  );
}

/**
 * Dispara o evento pelos dois caminhos com o mesmo id: no Pixel, aqui, e na
 * API de Conversões, pela rota `ROTA_SINAL`. Mais de um nome é o mesmo
 * acontecimento contado de dois jeitos — o padrão e o da LP —, e por isso
 * divide o id.
 *
 * O servidor recebe o evento mesmo se o Pixel não carregar: é para isso que
 * ele existe. O `sendBeacon` sobrevive à aba fechando logo em seguida.
 *
 * O PageView da primeira página faz o mesmo, mas escrito à mão no snippet do
 * `<head>` (`meta-pixel-base.tsx`), que roda antes do React.
 */
export function emitirEvento(eventos: [nome: string, parametros?: object][]) {
  const id = novoIdDeEvento();

  for (const [nome, parametros] of eventos) {
    window.fbq?.(nome === "PageView" ? "track" : "trackCustom", nome, parametros ?? {}, {
      eventID: id,
    });
  }

  const corpo = JSON.stringify({ id, nomes: eventos.map(([nome]) => nome), url: location.href });
  if (!navigator.sendBeacon?.(ROTA_SINAL, corpo)) {
    fetch(ROTA_SINAL, { method: "POST", body: corpo, keepalive: true }).catch(() => {});
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
      emitirEvento([[nomeDoEvento("ViewContent", origem), conteudo(origem)]]);
    });

    observador.observe(alvo);
    return () => observador.disconnect();
  }, [origem]);

  return <div ref={marco} aria-hidden className="h-px w-full" />;
}

/** Clique num CTA: a janela do formulário abriu. */
export function rastrearAbertura(origem: OrigemLead) {
  emitirEvento([[nomeDoEvento("AbriuFormulario", origem), conteudo(origem)]]);
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

  /* O padrão e o da LP, com o mesmo `eventID`: o Meta deduplica por nome +
     id, então cada um se junta ao seu par da API de Conversões. */
  window.fbq("track", "Lead", parametros, opcoes);
  window.fbq("trackCustom", nomeDoEvento("Lead", origem), parametros, opcoes);
}
