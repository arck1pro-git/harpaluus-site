import type { OrigemLead } from "./lead";
import { ROTA_LP1, ROTA_LP2 } from "./lp-config";

/**
 * O que o Pixel (navegador) e a API de Conversões (servidor) precisam dizer
 * igual para o Meta juntar os dois lados de um mesmo evento.
 *
 * Fica fora de `meta-pixel.tsx` porque aquele é `"use client"`: importado de
 * um módulo de servidor, ele não entrega valores, só referências de cliente.
 */

export const PIXEL_ID = "1124238353883498";

/**
 * O sufixo de cada LP. Nas LPs nenhum evento sai com nome padrão do Meta:
 * todos são personalizados, com o sufixo no nome (`Lead_lp1`,
 * `PageView_lp2`…), para que cada página apareça como linha própria no
 * Gerenciador de Eventos e a campanha otimize direto pelo evento da LP.
 * O sufixo também vai como `content_name`. Curto e fixo de propósito: mudar
 * o valor troca o nome do evento e quebra a otimização das campanhas.
 */
const CONTEUDO: Record<OrigemLead, string> = {
  "lp1-checklist": "lp1",
  "lp2-interesse": "lp2",
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
 * O id que o navegador gera no envio e manda nos dois caminhos. É ele que faz
 * o Meta contar o cadastro uma vez só, e não uma pelo Pixel e outra pelo
 * servidor. Chega por campo oculto, então é conferido antes de ser usado.
 */
export function idDeEventoValido(valor: string) {
  return /^[\w-]{8,64}$/.test(valor) ? valor : undefined;
}
