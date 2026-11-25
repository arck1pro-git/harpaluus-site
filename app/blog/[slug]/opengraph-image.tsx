import { ImageResponse } from "next/og";

import { buscarArtigo, listarArtigos } from "../../components/blog/api";
import { slugDaRota } from "../../components/blog/formato";
import { marca } from "../../components/landing/site-config";
import { CartaoOg, TAMANHO_OG } from "../../components/lp/og-card";

/**
 * Card do link de cada artigo, com o título dele.
 *
 * A API não manda imagem de capa, então o card é desenhado, no mesmo layout
 * das LPs e de /blog. A busca é a mesma da página, com o mesmo cache de 5
 * minutos. Se o artigo não existir mais, ou o CRM falhar, sai o card genérico
 * do blog em vez de um erro: quem compartilha o link não pode ficar sem
 * imagem.
 */
export const alt = `Artigo do blog da ${marca}`;
export const size = TAMANHO_OG;
export const contentType = "image/png";

/* Gerado uma vez e guardado, como a página. Sem isto o card era desenhado de
   novo a cada acesso de cada robô de compartilhamento. */
export const revalidate = 300;

export async function generateStaticParams() {
  const artigos = await listarArtigos();
  return artigos.map((artigo) => ({ slug: artigo.slug }));
}

/** Acima disso o título passa de três linhas e empurra o rodapé do card. */
const LIMITE_TITULO = 96;

function caber(titulo: string) {
  if (titulo.length <= LIMITE_TITULO) return titulo;
  const corte = titulo.slice(0, LIMITE_TITULO);
  return `${corte.slice(0, corte.lastIndexOf(" "))}…`;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artigo = await buscarArtigo(slugDaRota(slug)).catch(() => null);

  return new ImageResponse(
    (
      <CartaoOg
        etiqueta="Blog"
        titulo={caber(artigo?.titulo ?? "Mercado imobiliário, explicado para quem investe.")}
        apoio={artigo ? `${artigo.minutos} min de leitura` : "amaan.com.br/blog"}
      />
    ),
    size
  );
}
