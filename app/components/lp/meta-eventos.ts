import type { OrigemLead } from "./lead";
import { ROTA_LP1, ROTA_LP2, ROTA_LP3 } from "./lp-config";

/**
 * O que o Pixel (navegador) e a API de Conversões (servidor) precisam dizer
 * igual para o Meta juntar os dois lados de um mesmo evento.
 *
 * Fica fora de `meta-pixel.tsx` porque aquele é `"use client"`: importado de
 * um módulo de servidor, ele não entrega valores, só referências de cliente.
 */

export const PIXEL_ID = "1124238353883498";

/**
 * O sufixo de cada LP. Os eventos das LPs saem com o sufixo no nome
 * (`Lead_lp1`, `PageView_lp2`…), para que cada página apareça como linha
 * própria no Gerenciador de Eventos e a campanha otimize direto pelo evento
 * da LP. `PageView` e `Lead` saem também na versão padrão, ao lado destes.
 * O sufixo também vai como `content_name`. Curto e fixo de propósito: mudar
 * o valor troca o nome do evento e quebra a otimização das campanhas.
 */
const CONTEUDO: Record<OrigemLead, string> = {
  "lp1-checklist": "lp1",
  "lp2-interesse": "lp2",
  "lp3-scp": "lp3",
};

export function conteudo(origem: OrigemLead) {
  return { content_name: CONTEUDO[origem], content_category: "SCP imobiliária" };
}

/** Os quatro eventos das LPs, antes do sufixo. */
export type EventoLp = "PageView" | "ViewContent" | "AbriuFormulario" | "Lead";

/** O nome com que o evento chega ao Meta: `Lead_lp1`, `PageView_lp2`… */
export function nomeDoEvento(evento: EventoLp, origem: OrigemLead) {
  return `${evento}_${CONTEUDO[origem]}`;
}

const ORIGEM_DA_ROTA: Record<string, OrigemLead> = {
  [ROTA_LP1]: "lp1-checklist",
  [ROTA_LP2]: "lp2-interesse",
  [ROTA_LP3]: "lp3-scp",
};

/**
 * O PageView de cada rota de LP — nome e parâmetros —, para o snippet do
 * `<head>`, que roda antes do React e só enxerga `location.pathname`. Fora das
 * LPs não há entrada, e sai o `PageView` padrão.
 */
export const PAGEVIEW_POR_ROTA: Record<string, [string, ReturnType<typeof conteudo>]> =
  Object.fromEntries(
    Object.entries(ORIGEM_DA_ROTA).map(([rota, origem]) => [
      rota,
      [nomeDoEvento("PageView", origem), conteudo(origem)],
    ])
  );

/** O mesmo, para o PageView das navegações internas. */
export function pageViewDaRota(caminho: string) {
  return PAGEVIEW_POR_ROTA[caminho.replace(/\/+$/, "")] as
    | [string, ReturnType<typeof conteudo>]
    | undefined;
}

/**
 * O id que o navegador gera e manda nos dois caminhos. É ele que faz o Meta
 * contar o evento uma vez só, e não uma pelo Pixel e outra pelo servidor.
 * Chega do navegador, então é conferido antes de ser usado.
 */
export function idDeEventoValido(valor: string) {
  return /^[\w-]{8,64}$/.test(valor) ? valor : undefined;
}

/**
 * A rota que repete na API de Conversões os eventos do navegador (ver
 * `app/api/sinal/route.ts`). O nome é neutro de propósito: bloqueador de
 * anúncio barra caminho com "pixel", "track" ou "event", e o servidor existe
 * justamente para o evento que o bloqueador tira do Pixel.
 */
export const ROTA_SINAL = "/api/sinal";

/**
 * Os eventos que o navegador pode pedir para o servidor repetir, com os
 * parâmetros de cada um. A lista é fechada porque a rota é pública: sem ela,
 * qualquer um mandaria evento inventado para o Pixel. Os parâmetros saem
 * daqui, e não do que o navegador manda, pelo mesmo motivo.
 *
 * O Lead não está aqui: o par de servidor dele sai da Server Action do
 * formulário, que tem os dados do cadastro (ver `meta-capi.ts`).
 */
export const EVENTOS_DO_NAVEGADOR = new Map<string, ReturnType<typeof conteudo> | undefined>([
  ["PageView", undefined],
  ...(Object.keys(CONTEUDO) as OrigemLead[]).flatMap((origem) =>
    (["PageView", "ViewContent", "AbriuFormulario"] as const).map(
      (evento) => [nomeDoEvento(evento, origem), conteudo(origem)] as const
    )
  ),
]);
