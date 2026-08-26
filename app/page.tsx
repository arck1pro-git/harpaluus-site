import type { Metadata } from "next";

import { EmpreendimentosSection } from "./components/landing/empreendimentos-section";
import { Footer } from "./components/landing/footer";
import { Header } from "./components/landing/header";
import { Hero } from "./components/landing/hero";
import { InvestSection } from "./components/landing/invest-section";
import { PilaresSection } from "./components/landing/pilares-section";
import { SobreSection } from "./components/landing/sobre-section";

export const metadata: Metadata = {
  title: "Amaan Incorporadora · Empreendimentos Vivos",
  description:
    "A Amaan concebe, desenvolve e opera Empreendimentos Vivos em Santa Catarina: prédios que continuam evoluindo e produzindo valor depois de prontos.",
};

export default function Home() {
  return (
    <main className="relative w-full bg-fundo font-[family-name:var(--font-inter)]">
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
