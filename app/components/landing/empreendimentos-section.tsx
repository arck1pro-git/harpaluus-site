import Image from "next/image";
import { MapPin } from "lucide-react";

import { CtaLink } from "./cta-link";
import { TRACO } from "./icones";
import { Listras } from "./listras";
import { Reveal } from "./reveal";
import { empreendimentos } from "./site-config";

const { destaque, galeria, titulo } = empreendimentos;
const total = String(galeria.length).padStart(2, "0");

/** Tile da galeria: recorte fixo, zoom discreto no hover e numeração. */
function Tile({
  indice,
  className,
  sizes,
  tag,
}: {
  indice: number;
  className: string;
  sizes: string;
  /** etiqueta técnica no topo, só no tile principal */
  tag?: string;
}) {
  const imagem = galeria[indice];

  return (
    <figure className={`group relative overflow-hidden rounded-[3px] bg-grafite ${className}`}>
      <Image
        src={imagem.src}
        alt={imagem.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        style={{ objectPosition: imagem.position }}
      />

      {tag ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-grafite/45 to-transparent" />
          <span className="pointer-events-none absolute top-4 left-4 font-mono text-[10px] tracking-[0.14em] text-white/70 uppercase">
            {tag}
          </span>
        </>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-grafite/55 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <figcaption className="pointer-events-none absolute bottom-4 left-4 flex items-baseline gap-2 font-mono text-[10px] tracking-[0.16em] text-white/0 transition-colors duration-700 group-hover:text-white/75">
        <span className="text-dourado/0 transition-colors duration-700 group-hover:text-dourado">
          {String(indice + 1).padStart(2, "0")}
        </span>
        <span>/ {total}</span>
      </figcaption>
    </figure>
  );
}

/** Empreendimento em destaque da incorporadora, com a galeria. */
export function EmpreendimentosSection() {
  return (
    <section
      id="empreendimentos"
      className="relative overflow-hidden bg-fundo px-6 py-[120px] md:px-10 md:py-[160px]"
    >
      <Listras lado="esquerda" />
      <Listras lado="direita" />

      <div className="relative mx-auto max-w-[1080px]">
        <Reveal variant="linha-desenha" className="h-px w-[52px] bg-dourado" />

        {/* "EMPREENDIMENTOS" é uma palavra só e não cabe em meia coluna a 60px:
            o título ocupa a linha inteira e o destaque vem abaixo, em duas colunas */}
        <Reveal className="mt-9">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl leading-[1.08] font-normal tracking-[0.04em] text-grafite md:text-6xl">
            {titulo}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-16 gap-y-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          <Reveal>
            <p className="text-[21px] leading-[1.35] font-normal tracking-[-0.01em] text-grafite md:text-[24px]">
              {destaque.nome}
            </p>
            <p className="mt-3 flex items-center gap-2.5 text-[10px] font-medium tracking-[0.18em] text-dourado uppercase">
              <MapPin size={14} strokeWidth={TRACO} aria-hidden />
              {destaque.meta}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <p className="max-w-[500px] text-[13.5px] leading-[1.85] font-light text-pedra">
              {destaque.texto}
            </p>

            <CtaLink href={destaque.cta.href} tone="escuro" external className="mt-9">
              {destaque.cta.label}
            </CtaLink>
          </Reveal>
        </div>

        <Reveal
          delay={80}
          className="mt-[72px] grid gap-4 md:h-[640px] md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
        >
          <Tile
            indice={0}
            className="h-[420px] md:h-full"
            sizes="(max-width: 768px) 100vw, 640px"
            tag={destaque.coordenadas}
          />

          <div className="grid grid-cols-3 gap-4 md:grid-cols-1 md:grid-rows-3">
            <Tile indice={1} className="h-[150px] md:h-full" sizes="(max-width: 768px) 33vw, 420px" />
            <Tile indice={2} className="h-[150px] md:h-full" sizes="(max-width: 768px) 33vw, 420px" />
            <Tile indice={3} className="h-[150px] md:h-full" sizes="(max-width: 768px) 33vw, 420px" />
          </div>
        </Reveal>

      </div>
    </section>
  );
}
