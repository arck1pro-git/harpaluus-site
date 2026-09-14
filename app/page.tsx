import type { Metadata } from "next";

import { jsonLd, organizacao, site } from "./components/landing/dados-estruturados";
import { EmpreendimentosSection } from "./components/landing/empreendimentos-section";
import { Footer } from "./components/landing/footer";
import { Header } from "./components/landing/header";
import { Hero } from "./components/landing/hero";
import { InvestSection } from "./components/landing/invest-section";
import { PilaresSection } from "./components/landing/pilares-section";
import { SobreSection } from "./components/landing/sobre-section";

/**
 * Título e descrição já vêm do layout; aqui só entra o canonical.
 *
 * Ele é a declaração de qual endereço é o oficial desta página. Enquanto não
 * existia, cada variação (com e sem www, domínio antigo, preview da Vercel)
 * competia como se fosse uma página diferente, e o Google elegeu a que tinha
 * mais histórico — a do nome antigo.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * O mesmo que o rodapé já diz, em Schema.org: é a forma que o Google entende
 * como identidade declarada da empresa, e a via mais direta para ele trocar o
 * nome que exibe. Os dois registros vivem em `dados-estruturados.ts`, porque
 * as landing pages precisam declarar a mesma entidade, com o mesmo `@id`.
 */
const dadosEstruturados = jsonLd(organizacao, site);

export default function Home() {
  return (
    <main className="relative w-full bg-fundo font-[family-name:var(--font-inter)]">
      {/* JSON-LD: dado para o buscador, invisível na página */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: dadosEstruturados }}
      />

      <Header />

      <Hero />
      <InvestSection />
      <SobreSection />
      <PilaresSection />
      <EmpreendimentosSection />
      <Footer />
    </main>
  );
}
