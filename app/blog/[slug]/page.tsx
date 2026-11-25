import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";

import {
  buscarArtigo,
  listarArtigos,
  type Artigo,
  type ArtigoResumo,
  type ItemSumario,
} from "../../components/blog/api";
import { CartaoArtigo } from "../../components/blog/cartao-artigo";
import { ABERTURA, TITULO_ARTIGO, TITULO_SECAO } from "../../components/blog/tipografia";
import {
  dataPorExtenso,
  linkConversa,
  slugDaRota,
} from "../../components/blog/formato";
import { TituloComDestaque } from "../../components/landing/com-destaque";
import { CtaLink } from "../../components/landing/cta-link";
import { MarcaDagua } from "../../components/landing/marca-dagua";
import { Dots } from "../../components/landing/dots";
import { Footer } from "../../components/landing/footer";
import { Header } from "../../components/landing/header";
import { TRACO } from "../../components/landing/icones";
import { marca, ROTA_BLOG } from "../../components/landing/site-config";
import "../artigo.css";

/**
 * Um artigo do blog, no endereço `/blog/{slug}`.
 *
 * Tudo vem do CRM (ver `components/blog/api.ts`), e cada peça entra do jeito
 * que a API combina:
 *
 * - `html` é injetado como está. Ele já vem escapado e com os links
 *   filtrados; nenhum renderizador de markdown passa por cima.
 * - O `<head>` é montado em `generateMetadata` a partir de `meta_title`,
 *   `meta_description` e `url`, que são a fonte do bloco `meta_tags`. O
 *   canonical é o `url` do CRM, sem reescrita: se estiver errado, o que se
 *   corrige é o endereço do blog no CRM.
 * - Cada item de `json_ld` vira o seu próprio `<script type="application/ld+json">`.
 * - `fonte`, quando existe, é citada com link no fim do texto.
 *
 * Revalida a cada 5 minutos. Artigo despublicado no CRM passa a responder
 * 404 na primeira revalidação depois disso; falha temporária do CRM mantém a
 * última versão boa no ar (o erro lançado em `buscarArtigo` é o que segura o
 * cache). Artigo novo, que não existia no build, é gerado na primeira visita.
 */
export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

/** Os artigos que já existem no build saem prontos; os novos, na primeira visita. */
export async function generateStaticParams() {
  const artigos = await listarArtigos();
  return artigos.map((artigo) => ({ slug: artigo.slug }));
}

/** O artigo da rota, ou a página 404 do site. */
async function artigoDa(params: Props["params"]) {
  const { slug } = await params;
  const artigo = await buscarArtigo(slugDaRota(slug));
  if (!artigo) notFound();
  return artigo;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artigo = await artigoDa(params);

  const titulo = artigo.meta_title || artigo.titulo;
  const descricao = artigo.meta_description || artigo.resumo;

  return {
    /* `absolute`: o título já vem medido para a busca. O sufixo
       " · Amaan Incorporadora" do layout o empurraria além do corte. */
    title: { absolute: titulo },
    description: descricao,
    keywords: artigo.keywords,
    authors: artigo.autor ? [{ name: artigo.autor }] : undefined,
    alternates: { canonical: artigo.url },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url: artigo.url,
      siteName: marca,
      title: titulo,
      description: descricao,
      publishedTime: artigo.criado_em,
      modifiedTime: artigo.atualizado_em,
      authors: artigo.autor ? [artigo.autor] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descricao,
    },
  };
}

/**
 * Os outros artigos para o "Continue lendo", na ordem da API.
 *
 * Se a lista falhar, a seção só não aparece: perder o rodapé de leitura não
 * é motivo para derrubar o artigo que já está em mãos.
 */
async function outrosArtigos(slug: string): Promise<ArtigoResumo[]> {
  try {
    const artigos = await listarArtigos();
    return artigos.filter((artigo) => artigo.slug !== slug).slice(0, 3);
  } catch {
    return [];
  }
}

/** Dado estruturado para dentro da tag `<script>`, com o `<` escapado. */
function serializar(registro: Record<string, unknown>) {
  return JSON.stringify(registro).replace(/</g, "\\u003c");
}

/**
 * O índice do artigo, só com as seções (h2).
 *
 * O sumário do CRM traz também os h3, e num artigo com perguntas frequentes
 * cada pergunta vira uma linha — o índice ficava mais longo que a tela. Se um
 * artigo vier sem nenhum h2, o índice usa o que houver.
 */
function secoesDo(artigo: Artigo): ItemSumario[] {
  const sumario = Array.isArray(artigo.sumario) ? artigo.sumario : [];
  const secoes = sumario.filter((item) => item.nivel <= 2);
  return secoes.length > 0 ? secoes : sumario;
}

/* Cada linha do índice tem pelo menos 44px de altura: no celular ele é a
   navegação do texto, e o alvo de toque não pode ser a linha de 13px. */
function Sumario({ itens }: { itens: ItemSumario[] }) {
  return (
    <ol className="flex flex-col">
      {itens.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="block border-l border-linha py-3 pl-4 text-sm leading-[1.45] text-pretty text-grafite/75 no-underline transition-[color,border-color] duration-300 hover:border-dourado hover:text-azul-escuro"
          >
            {item.texto}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default async function PaginaArtigo({ params }: Props) {
  const artigo = await artigoDa(params);
  const outros = await outrosArtigos(artigo.slug);

  const data = dataPorExtenso(artigo.criado_em);
  const secoes = secoesDo(artigo);
  const dadosEstruturados = Array.isArray(artigo.json_ld) ? artigo.json_ld : [];

  return (
    <main className="relative w-full bg-fundo font-[family-name:var(--font-inter)]">
      {dadosEstruturados.map((registro, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializar(registro) }}
        />
      ))}

      <Header />

      <article>
        {/* Abre em fundo escuro porque o header é transparente no topo, com
            marca e links em branco — o mesmo contrato do hero da home. */}
        <header className="relative overflow-clip bg-azul-escuro text-white">
          <Dots
            canto="superior-direito"
            tone="claro"
            tamanho="h-[420px] w-[420px] md:h-[760px] md:w-[760px]"
          />

          <div className="faixa relative pt-[calc(var(--header-altura)+clamp(3.5rem,8vw,6rem))] pb-[clamp(3rem,6vw,5rem)]">
            <Link
              href={ROTA_BLOG}
              className="tipo-label -my-2 inline-flex items-center gap-3 py-2 text-dourado-claro no-underline transition-colors duration-300 hover:text-white"
            >
              <ArrowLeft size={15} strokeWidth={TRACO} aria-hidden />
              Blog
            </Link>

            <h1 className={`${TITULO_ARTIGO} mt-8 max-w-[16em]`}>{artigo.titulo}</h1>

            {artigo.resumo ? (
              <p className={`${ABERTURA} mt-8 max-w-[52ch] text-pedra-claro`}>{artigo.resumo}</p>
            ) : null}

            {/* um filete separa os dados do texto, como o filete dourado
                separa as seções do resto do site */}
            <p className="tipo-label mt-10 flex max-w-[52ch] flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/15 pt-6 leading-[1.5] text-white/65">
              {data ? <time dateTime={artigo.criado_em}>{data}</time> : null}
              {data ? <span aria-hidden>·</span> : null}
              <span>{artigo.minutos}&nbsp;min de leitura</span>
              {artigo.autor ? (
                <>
                  <span aria-hidden>·</span>
                  <span>Por {artigo.autor}</span>
                </>
              ) : null}
            </p>
          </div>
        </header>

        {/* Grid de 12 colunas no desktop: o índice e a chamada ficam na
            lateral, colunas 1 a 3, na linha da margem; o texto corre das
            colunas 5 a 11, na mesma linha em que começam os títulos da lista
            do blog. A medida do texto (62 caracteres) é a do próprio corpo,
            em `artigo.css`. */}
        <div className="faixa pt-[clamp(2.5rem,6vw,5rem)] pb-[clamp(4rem,8vw,6.5rem)] lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div className="min-w-0 lg:col-span-7 lg:col-start-5 lg:row-start-1">
            {/* No celular o índice fica recolhido no topo do texto; no
                desktop ele vai para a lateral, nas colunas 1 a 3. */}
            {secoes.length > 0 ? (
              <details className="group mb-10 border-y border-linha lg:hidden">
                <summary className="tipo-label flex cursor-pointer list-none items-center justify-between py-5 text-azul-escuro [&::-webkit-details-marker]:hidden">
                  Neste artigo
                  <ChevronDown
                    size={16}
                    strokeWidth={TRACO}
                    aria-hidden
                    className="transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <div className="pb-6">
                  <Sumario itens={secoes} />
                </div>
              </details>
            ) : null}

            <div
              className="artigo-corpo"
              dangerouslySetInnerHTML={{ __html: artigo.html }}
            />

            {artigo.fonte?.url ? (
              <p className="mt-14 max-w-[62ch] border-t border-linha pt-6 text-sm leading-[1.6] text-pretty text-cinza-texto">
                <span className="tipo-label mr-3 text-dourado-escuro">Fonte</span>
                <a
                  href={artigo.fonte.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-normal text-azul-escuro underline decoration-dourado/60 underline-offset-4 transition-colors duration-300 hover:decoration-dourado"
                >
                  {artigo.fonte.titulo || artigo.fonte.url}
                </a>
              </p>
            ) : null}
          </div>

          <aside className="hidden lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:block">
            <div className="sticky top-[calc(var(--header-altura)+2.5rem)] flex flex-col gap-12">
              {secoes.length > 0 ? (
                <nav aria-label="Neste artigo">
                  <p className="tipo-label mb-3 text-azul-escuro">Neste artigo</p>
                  <Sumario itens={secoes} />
                </nav>
              ) : null}

              <div className="border-t border-linha pt-6">
                <p className="font-[family-name:var(--font-playfair)] text-[1.375rem] leading-[1.3] font-normal tracking-[-0.012em] text-balance text-azul-escuro">
                  Quer ver como isso funciona na prática?
                </p>
                <p className="mt-3 text-base leading-[1.6] text-pretty text-grafite/80">
                  Um especialista da <span translate="no">AMAAN</span> apresenta a operação do{" "}
                  <span translate="no">Tourmaline Tower</span> numa reunião de 1&nbsp;hora.
                </p>
                <a
                  href={linkConversa(artigo.slug, "lateral")}
                  className="tipo-label group/cta mt-5 inline-flex items-center gap-3 py-2 text-azul-escuro no-underline"
                >
                  Falar com especialista
                  <ArrowUpRight
                    size={15}
                    strokeWidth={TRACO}
                    aria-hidden
                    className="shrink-0 transition-transform duration-300 ease-out group-hover/cta:translate-x-[3px] group-hover/cta:-translate-y-[3px]"
                  />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* A conclusão de todo artigo convida para a conversa; a chamada vem
          logo em seguida, enquanto o convite ainda está na tela. */}
      <section className="relative overflow-clip bg-azul-escuro text-white">
        <Dots
          canto="inferior-esquerdo"
          tone="claro"
          tamanho="h-[380px] w-[380px] md:h-[640px] md:w-[640px]"
        />

        <div className="faixa relative py-[clamp(4.5rem,9vw,7rem)]">
          <h2 className={`${TITULO_SECAO} max-w-[16em]`}>
            <TituloComDestaque
              texto="Converse com um especialista da AMAAN."
              destaque="um especialista"
              fundo="escuro"
            />
          </h2>
          <p className={`${ABERTURA} mt-7 max-w-[52ch] text-pedra-claro`}>
            Numa reunião de 1&nbsp;hora, o especialista apresenta a operação do{" "}
            <span translate="no">Tourmaline Tower</span>, em Porto Belo (SC), e uma oferta
            concreta para o seu valor e o seu prazo.
          </p>
          <CtaLink href={linkConversa(artigo.slug, "final")} tone="claro" className="mt-9">
            Agendar uma conversa
          </CtaLink>
        </div>
      </section>

      {outros.length > 0 ? (
        <section aria-labelledby="continue-lendo" className="relative overflow-hidden">
          {/* fundo liso: o símbolo da Amaan entra apagado pelo canto de cima */}
          <MarcaDagua canto="superior-direito" />

          <div className="faixa relative pt-[clamp(4rem,8vw,6rem)] pb-[clamp(4.5rem,9vw,7.5rem)]">
            <h2 id="continue-lendo" className={`${TITULO_SECAO} mb-10 text-azul-escuro md:mb-12`}>
              <TituloComDestaque texto="Continue lendo" destaque="lendo" />
            </h2>
            <ol className="border-b border-linha">
              {outros.map((outro) => (
                <li key={outro.slug}>
                  <CartaoArtigo artigo={outro} nivel="h3" variante="compacto" />
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}
