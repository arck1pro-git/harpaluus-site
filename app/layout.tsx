import type { Metadata } from "next";
import { Inter, Playfair_Display, Raleway } from "next/font/google";
import "./globals.css";
import { ScrollSuave } from "./components/landing/scroll-suave";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Fonte única da landing institucional (títulos e informações).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Amaan Incorporadora · Empreendimentos Vivos",
  description:
    "A Amaan concebe, desenvolve e opera Empreendimentos Vivos em Santa Catarina: prédios que continuam evoluindo e produzindo valor depois de prontos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} ${raleway.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* sem JS as microanimações não disparam: o conteúdo já nasce visível */}
        <noscript>
          <style>{`.reveal,.linha-desenha,.linha-desenha-y,.cena,.cena-filete,.cena-imagem{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ScrollSuave />
        {children}
      </body>
    </html>
  );
}
