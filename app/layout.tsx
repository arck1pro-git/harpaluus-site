import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ScrollSuave } from "./components/landing/scroll-suave";
import { descricao, marca, SITE_URL } from "./components/landing/site-config";

/**
 * Só o corte normal.
 *
 * O itálico estava declarado aqui e não era usado por nenhuma rota pública —
 * o único lugar que combinava Playfair com itálico era `hero-headline.tsx`,
 * que não é importado por página nenhuma. Enquanto esteve declarado, o
 * `next/font` fazia o preload dos arquivos dos dois cortes em toda navegação.
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

// Fonte única da landing institucional (títulos e informações).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/* A Raleway saiu daqui e passou a ser carregada em `home/layout.tsx`: ela só
   é usada pelo rascunho antigo em /home, e no layout raiz os quatro pesos
   dela entravam no preload da home pública e das duas LPs também. */

/**
 * Metadados herdados por todas as rotas.
 *
 * `metadataBase` é o que permite escrever caminhos relativos aqui embaixo: sem
 * ele, og:image e canonical sairiam sem domínio e o Google escolheria sozinho
 * qual endereço indexar — que foi como o nome antigo se fixou na busca.
 *
 * `title.template` faz cada rota futura fechar em "· Amaan Incorporadora"
 * sem repetir a marca à mão; a home usa `default`, sem o sufixo.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${marca} · Empreendimentos Vivos`,
    template: `%s · ${marca}`,
  },
  description: descricao,
  // o nome que buscadores e navegadores usam para se referir ao site
  applicationName: marca,
  creator: marca,
  publisher: marca,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    // og:site_name é o campo que o Google lê como "nome do site" no resultado
    siteName: marca,
    title: `${marca} · Empreendimentos Vivos`,
    description: descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: `${marca} · Empreendimentos Vivos`,
    description: descricao,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // libera miniatura grande e trecho inteiro no resultado da busca
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      /* O site declara `scroll-behavior: smooth` no CSS, e a partir do Next 16
         o roteador deixou de neutralizá-lo durante a navegação — sem este
         atributo, ir da home para uma LP passa a rolar a página inteira até o
         topo em vez de trocar de rota instantaneamente. */
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth antialiased`}
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
