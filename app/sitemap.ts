import type { MetadataRoute } from "next";

import { listarArtigos } from "./components/blog/api";
import { caminhoDoArtigo } from "./components/blog/formato";
import { ROTA_LP1, ROTA_LP2, ROTA_LP3 } from "./components/lp/lp-config";
import { ROTA_ALEMAO, ROTA_BLOG, SITE_URL } from "./components/landing/site-config";

/**
 * Gera /sitemap.xml.
 *
 * Home, LPs, o blog e cada artigo publicado — e nenhuma âncora: as seções do
 * menu da home (`/#sobre`, `/#empreendimentos`) continuam de fora porque
 * listar âncora como URL faria o Google tratá-las como páginas duplicadas da
 * home.
 *
 * As LPs entram com prioridade abaixo da home e `changeFrequency` baixa: o
 * conteúdo delas é estável — muda quando a copy do funil mudar, não por
 * atualização de catálogo.
 *
 * Os artigos vêm do CRM, e o sitemap revalida no mesmo ritmo do blog, a cada
 * 5 minutos: artigo publicado entra, despublicado sai. A URL de cada um é a
 * `url` que o CRM devolve — a mesma do canonical da página.
 */
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const agora = new Date();
  const artigos = await listarArtigos();

  /* o blog mudou quando o artigo mais recente mudou */
  const blogAtualizadoEm = artigos.reduce<string | undefined>(
    (maisRecente, artigo) =>
      !maisRecente || artigo.atualizado_em > maisRecente ? artigo.atualizado_em : maisRecente,
    undefined
  );

  return [
    {
      url: SITE_URL,
      lastModified: agora,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${ROTA_LP1}`,
      lastModified: agora,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}${ROTA_LP2}`,
      lastModified: agora,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}${ROTA_LP3}`,
      lastModified: agora,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}${ROTA_ALEMAO}`,
      lastModified: agora,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}${ROTA_BLOG}`,
      lastModified: blogAtualizadoEm ?? agora,
      changeFrequency: "daily",
      priority: 0.7,
    },
    ...artigos.map((artigo) => ({
      url: artigo.url || `${SITE_URL}${caminhoDoArtigo(artigo.slug)}`,
      lastModified: artigo.atualizado_em,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
