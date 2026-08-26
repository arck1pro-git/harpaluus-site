import type { Metadata } from "next";

import { Capa } from "../components/empreendimento/capa";
import { Dimensoes } from "../components/empreendimento/dimensoes";
import { Ficha } from "../components/empreendimento/ficha";
import { Galeria } from "../components/empreendimento/galeria";
import { Footer } from "../components/landing/footer";
import { Header } from "../components/landing/header";
import { tourmaline } from "../components/landing/site-config";

export const metadata: Metadata = {
  title: `${tourmaline.nome} · Amaan Incorporadora`,
  description:
    "Trinta e um pavimentos na Vila Nova, em Porto Belo/SC, com rooftop no ponto mais alto da região. Um Empreendimento Vivo: um prédio em que a operação foi desenhada junto com a planta.",
};

export default function Empreendimentos() {
  return (
    <main className="relative w-full bg-fundo font-[family-name:var(--font-inter)]">
      <Header />

      <Capa />
      <Ficha />
      <Dimensoes />
      <Galeria />
      <Footer />
    </main>
  );
}
