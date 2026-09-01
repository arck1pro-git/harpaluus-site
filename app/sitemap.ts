import type { MetadataRoute } from "next";

import { SITE_URL } from "./components/landing/site-config";

/**
 * Gera /sitemap.xml.
 *
 * Uma entrada só, e é o correto: o site é uma página única e as seções do menu
 * são âncoras dela (`/#sobre`, `/#empreendimentos`), não rotas. Listar âncora
 * como URL faria o Google tratá-las como páginas duplicadas da home.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
