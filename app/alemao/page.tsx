import type { Metadata } from "next";

import { jsonLd, organizacao, site } from "../components/landing/dados-estruturados";
import { EmpreendimentosSection } from "../components/landing/empreendimentos-section";
import { Footer } from "../components/landing/footer";
import { Header } from "../components/landing/header";
import { Hero } from "../components/landing/hero";
import { InvestSection } from "../components/landing/invest-section";
import { PilaresSection } from "../components/landing/pilares-section";
import { marca, ROTA_ALEMAO } from "../components/landing/site-config";
import {
  empreendimentosDe,
  heroDe,
  investDe,
  navDe,
  pilaresDe,
  rodapeDe,
  sobreDe,
  textosDe,
} from "../components/landing/site-config-de";
import { SobreSection } from "../components/landing/sobre-section";

/**
 * A home institucional em alemão: as mesmas seções da home (`app/page.tsx`),
 * com o texto de `site-config-de.ts`.
 *
 * O `<html lang>` vem do layout raiz, em pt-BR; aqui o `lang="de"` vai no
 * `<main>`, que contém a página inteira (header e rodapé inclusos). É o que
 * leitores de tela, tradutores automáticos e a hifenização do navegador leem.
 *
 * O `alternates.languages` liga as duas versões para o Google (hreflang): a
 * home declara o mesmo par, ao contrário.
 */

const TITULO = `${marca} · Lebendige Immobilien in Santa Catarina`;
const DESCRICAO =
  "Amaan konzipiert, entwickelt und betreibt „Lebendige Immobilien“ in Santa Catarina, Brasilien: Gebäude, die mitwachsen und auch nach der Fertigstellung Werte schaffen.";

export const metadata: Metadata = {
  title: { absolute: TITULO },
  description: DESCRICAO,
  alternates: {
    canonical: ROTA_ALEMAO,
    languages: { "pt-BR": "/", de: ROTA_ALEMAO },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["pt_BR"],
    url: ROTA_ALEMAO,
    siteName: marca,
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
  },
};

const dadosEstruturados = jsonLd(organizacao, site);

export default function Alemao() {
  return (
    <main lang="de" className="relative w-full bg-fundo font-[family-name:var(--font-inter)]">
      {/* JSON-LD: a mesma empresa da home em português */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: dadosEstruturados }}
      />

      <Header itens={navDe} textos={textosDe} />

      <Hero conteudo={heroDe} textos={textosDe} />
      <SobreSection conteudo={sobreDe} />
      <PilaresSection conteudo={pilaresDe} />
      <EmpreendimentosSection conteudo={empreendimentosDe} />
      <InvestSection conteudo={investDe} textos={textosDe} />
      <Footer conteudo={rodapeDe} textos={textosDe} />
    </main>
  );
}
