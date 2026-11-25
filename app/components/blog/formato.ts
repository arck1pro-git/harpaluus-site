import { ROTA_BLOG } from "../landing/site-config";
import { ROTA_LP3 } from "../lp/lp-config";

/**
 * Funções puras do blog: endereço de cada artigo, datas por extenso e o link
 * da conversa com o especialista. Ficam fora de `api.ts` porque aquele
 * arquivo é só do servidor, e estas servem a qualquer componente.
 */

/**
 * Caminho do artigo no site: `/blog/{slug}`, com o slug exatamente como veio
 * do CRM. Nada de gerar a partir do título, trocar hífen ou forçar
 * minúsculas — o slug é o endereço dos dois lados.
 */
export function caminhoDoArtigo(slug: string) {
  return `${ROTA_BLOG}/${encodeURIComponent(slug)}`;
}

/**
 * O slug como chegou na rota, de volta à forma em que o CRM o publicou.
 *
 * Os slugs de hoje são só letras, números e hífen, e passam por aqui sem
 * mudar nada; a volta existe para o dia em que um vier com acento e o
 * navegador o mandar codificado.
 */
export function slugDaRota(segmento: string) {
  try {
    return decodeURIComponent(segmento);
  } catch {
    return segmento;
  }
}

/* No fuso de Porto Belo: artigo publicado às 23h não pode aparecer com a
   data do dia seguinte só porque o servidor roda em UTC. */
const DATA = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});

/** "6 de novembro de 2026", ou `null` se a data vier torta. */
export function dataPorExtenso(iso: string) {
  const data = new Date(iso);
  return Number.isNaN(data.getTime()) ? null : DATA.format(data);
}

/**
 * Para onde vai quem quer conversar com um especialista: o formulário da
 * LP03, o mesmo que capta investidores pelos anúncios.
 *
 * As UTMs não são enfeite. A LP03 lê a campanha da URL de chegada, e quem vem
 * de dentro do site chega sem nenhuma — o lead apareceria no CRM como
 * "direto". Com elas, a ficha diz que o lead veio do blog, de qual artigo
 * (`utm_campaign` é o slug) e de qual chamada (`utm_content`).
 */
export function linkConversa(slug: string, posicao: "lateral" | "final") {
  const utms = new URLSearchParams({
    utm_source: "blog",
    utm_medium: "artigo",
    utm_campaign: slug,
    utm_content: posicao,
  });

  return `${ROTA_LP3}?${utms}#formulario`;
}
