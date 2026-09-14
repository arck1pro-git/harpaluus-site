import type { MetadataRoute } from "next";

import { ROTA_LP1, ROTA_LP2 } from "./components/lp/lp-config";
import { SITE_URL } from "./components/landing/site-config";

/**
 * Gera /sitemap.xml.
 *
 * Três URLs, e nenhuma âncora: as seções do menu da home (`/#sobre`,
 * `/#empreendimentos`) continuam de fora porque listar âncora como URL faria
 * o Google tratá-las como páginas duplicadas da home.
 *
 * As LPs entram com prioridade abaixo da home e `changeFrequency` baixa: o
 * conteúdo delas é estável — muda quando a copy do funil mudar, não por
 * atualização de catálogo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

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
  ];
}
