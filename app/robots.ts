import type { MetadataRoute } from "next";

import { SITE_URL } from "./components/landing/site-config";

/**
 * Gera /robots.txt.
 *
 * Repare que `/home` NÃO entra em `disallow`, mesmo estando fora do ar para o
 * público: bloquear o rastreamento impediria o Google de ler justamente a tag
 * `noindex` que a página declara, e uma URL já indexada continuaria na busca
 * sem nunca poder sair. Deixar rastrear é o que permite removê-la.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
