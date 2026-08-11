import type { Metadata } from "next";

import { EmpreendimentosSection } from "./components/landing/empreendimentos-section";
import { Footer } from "./components/landing/footer";
import { Header } from "./components/landing/header";
import { Hero } from "./components/landing/hero";
import { PilaresSection } from "./components/landing/pilares-section";
import { SobreSection } from "./components/landing/sobre-section";

export const metadata: Metadata = {
  title: "Harpaluus Incorporadora",
  description:
    "Incorporadora de empreendimentos de alta performance no litoral catarinense. Arquitetura, tecnologia e eficiência operacional em Porto Belo/SC.",
};

export default function Home() {
  return (
    <main className="relative w-full bg-fundo font-[family-name:var(--font-inter)]">
      <Header />

      <Hero />
      <SobreSection />
      <PilaresSection />
      <EmpreendimentosSection />
      <Footer />
    </main>
  );
}
