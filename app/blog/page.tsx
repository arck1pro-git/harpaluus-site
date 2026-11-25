import type { Metadata } from "next";

import { listarArtigos } from "../components/blog/api";
import { CartaoArtigo } from "../components/blog/cartao-artigo";
import { TituloComDestaque } from "../components/landing/com-destaque";
import { MarcaDagua } from "../components/landing/marca-dagua";
import { ABERTURA, RESUMO, TITULO_PAGINA } from "../components/blog/tipografia";
import {
  jsonLd,
  organizacao,
  paginaWeb,
  site,
  trilha,
} from "../components/landing/dados-estruturados";
import { Dots } from "../components/landing/dots";
import { Footer } from "../components/landing/footer";
import { Header } from "../components/landing/header";
import { marca, ROTA_BLOG } from "../components/landing/site-config";

/**
 * Lista de artigos do blog, que vêm do CRM (ver `components/blog/api.ts`).
 *
 * Estática com revalidação a cada 5 minutos, o cache que a API declara:
 * artigo aprovado no CRM aparece aqui em até 5 minutos, e o despublicado
 * some no mesmo prazo. O número precisa ser literal — ver `REVALIDAR`.
 *
 * O texto de apresentação é do site, não do CRM: o `blog.descricao` que a
 * API devolve é o briefing de redação dos artigos, com regras internas, e
 * não pode aparecer na página.
 */
export const revalidate = 300;

const TITULO = "Blog";
const CHAMADA = "Mercado imobiliário, explicado para quem investe.";
/** trecho da chamada em dourado itálico (`TituloComDestaque`) */
const CHAMADA_DESTAQUE = "para quem investe.";
const DESCRICAO =
  "A notícia de mercado e de economia, e o que ela muda para quem investe em imóveis e incorporação: juros, crédito, inflação, lançamentos e o litoral de Santa Catarina.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: ROTA_BLOG },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: ROTA_BLOG,
    /* declarar `openGraph` aqui substitui o objeto inteiro do layout: sem
       esta linha o card sai sem o nome do site */
    siteName: marca,
    title: `${TITULO} · ${marca}`,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITULO} · ${marca}`,
    description: DESCRICAO,
  },
};

const dadosEstruturados = jsonLd(
  organizacao,
  site,
  paginaWeb({ caminho: ROTA_BLOG, titulo: `${TITULO} · ${marca}`, descricao: DESCRICAO }),
  trilha({ caminho: ROTA_BLOG, titulo: TITULO })
);

export default async function Blog() {
  const artigos = await listarArtigos();

  return (
    <main className="relative w-full bg-fundo font-[family-name:var(--font-inter)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: dadosEstruturados }}
      />

      <Header />

      {/* Abre em fundo escuro porque o header é transparente no topo, com
          marca e links em branco — o mesmo contrato do hero da home. */}
      <section className="relative overflow-clip bg-azul-escuro text-white">
        <Dots
          canto="superior-direito"
          tone="claro"
          tamanho="h-[420px] w-[420px] md:h-[760px] md:w-[760px]"
        />

        {/* Grid de 12 colunas: o h1 corre pelas colunas 1 a 9, e a
            descrição desce para a coluna 5, a linha em que começam os
            títulos dos artigos logo abaixo. */}
        <div className="faixa relative pt-[calc(var(--header-altura)+clamp(4rem,9vw,7rem))] pb-[clamp(3.5rem,7vw,5.5rem)] lg:grid lg:grid-cols-12 lg:gap-x-6">
          <p className="tipo-label text-dourado-claro lg:col-span-12">{TITULO}</p>
          <h1 className={`${TITULO_PAGINA} mt-6 max-w-[15em] lg:col-span-9`}>
            <TituloComDestaque texto={CHAMADA} destaque={CHAMADA_DESTAQUE} fundo="escuro" />
          </h1>
          <p
            className={`${ABERTURA} mt-8 max-w-[52ch] text-pedra-claro lg:col-span-7 lg:col-start-5 lg:mt-12`}
          >
            {DESCRICAO}
          </p>
        </div>
      </section>

      {/* fundo liso: o símbolo da Amaan entra apagado pelo canto de baixo */}
      <section aria-label="Artigos" className="relative overflow-hidden">
        <MarcaDagua canto="inferior-direito" />

        <div className="faixa relative pt-[clamp(2.5rem,5vw,4rem)] pb-[clamp(4.5rem,9vw,7.5rem)]">
        {artigos.length > 0 ? (
          <ol className="border-b border-linha">
            {/* a ordem é a da API, do mais novo para o mais antigo: o
                primeiro só ganha mais tamanho, não muda de lugar */}
            {artigos.map((artigo, i) => (
              <li key={artigo.slug}>
                <CartaoArtigo artigo={artigo} variante={i === 0 ? "destaque" : "lista"} />
              </li>
            ))}
          </ol>
        ) : (
          <p className={`${RESUMO} border-t border-linha pt-10 text-grafite/80`}>
            Os primeiros artigos estão a caminho. Volte em breve.
          </p>
        )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
