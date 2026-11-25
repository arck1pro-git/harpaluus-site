import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TRACO } from "../landing/icones";
import type { ArtigoResumo } from "./api";
import { caminhoDoArtigo, dataPorExtenso } from "./formato";
import {
  ABERTURA,
  RESUMO,
  TITULO_CARTAO,
  TITULO_CARTAO_COMPACTO,
  TITULO_DESTAQUE,
} from "./tipografia";

type Variante = "destaque" | "lista" | "compacto";

/* Um degrau da escala por variante: o artigo mais recente abre a lista maior,
   os demais seguem no tamanho de lista, e o "Continue lendo" fica abaixo. */
const TITULO: Record<Variante, string> = {
  destaque: TITULO_DESTAQUE,
  lista: TITULO_CARTAO,
  compacto: TITULO_CARTAO_COMPACTO,
};

const TEXTO: Record<Variante, string> = {
  destaque: `${ABERTURA} max-w-[52ch]`,
  lista: `${RESUMO} max-w-[62ch]`,
  compacto: `${RESUMO} max-w-[62ch]`,
};

/**
 * Um artigo na lista: data e tempo de leitura, título, resumo.
 *
 * No desktop o cartão segue o grid de 12 colunas da página: data e tempo de
 * leitura nas colunas 1 a 3, na linha da margem; título e resumo a partir da
 * coluna 5, a mesma linha em que corre o texto do artigo. Abaixo de `lg` tudo
 * empilha, com a data em cima.
 *
 * O link fica só no título, e um `::after` estica a área de clique pelo
 * cartão inteiro. Envolver o cartão todo num `<a>` faria o leitor de tela
 * anunciar data, título e resumo como um único nome de link.
 *
 * `nivel` existe porque o mesmo cartão aparece em dois lugares: na lista do
 * blog ele é `h2`, debaixo do título da página; no fim de um artigo, abaixo
 * do "Continue lendo", ele desce para `h3`.
 */
export function CartaoArtigo({
  artigo,
  nivel = "h2",
  variante = "lista",
}: {
  artigo: ArtigoResumo;
  nivel?: "h2" | "h3";
  variante?: Variante;
}) {
  const Titulo = nivel;
  const data = dataPorExtenso(artigo.criado_em);
  const destaque = variante === "destaque";

  return (
    <article
      className={`group relative border-t border-linha lg:grid lg:grid-cols-12 lg:gap-x-6 ${
        destaque ? "py-12 md:py-16" : "py-10 md:py-12"
      }`}
    >
      <p className="tipo-label flex flex-wrap gap-x-3 gap-y-2 leading-[1.5] text-dourado-escuro lg:col-span-3 lg:flex-col lg:pt-[0.55rem]">
        {data ? <time dateTime={artigo.criado_em}>{data}</time> : null}
        {data ? (
          <span aria-hidden className="lg:hidden">
            ·
          </span>
        ) : null}
        <span>{artigo.minutos}&nbsp;min de leitura</span>
      </p>

      <div className="mt-5 lg:col-span-8 lg:col-start-5 lg:mt-0">
        <Titulo className={`${TITULO[variante]} text-azul-escuro`}>
          <Link
            href={caminhoDoArtigo(artigo.slug)}
            className="underline decoration-transparent decoration-1 underline-offset-[0.22em] transition-[color,text-decoration-color] duration-300 ease-out after:absolute after:inset-0 after:content-[''] group-hover:text-azul group-hover:decoration-dourado/70"
          >
            {artigo.titulo}
          </Link>
        </Titulo>

        <p className={`${TEXTO[variante]} mt-4 text-grafite/80 ${destaque ? "md:mt-5" : ""}`}>
          {artigo.resumo}
        </p>

        <span
          aria-hidden
          className="tipo-label mt-7 inline-flex items-center gap-3 text-azul-escuro"
        >
          Ler artigo
          <ArrowRight
            size={15}
            strokeWidth={TRACO}
            className="transition-transform duration-300 ease-out group-hover:translate-x-[4px]"
          />
        </span>
      </div>
    </article>
  );
}
