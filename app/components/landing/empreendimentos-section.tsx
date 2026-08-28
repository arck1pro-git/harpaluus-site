import Image from "next/image";
import { MapPin } from "lucide-react";

import { TRACO } from "./icones";
import { Listras } from "./listras";
import { Reveal } from "./reveal";
import { empreendimentos, type SiteImage } from "./site-config";

const { destaque, imagens, titulo } = empreendimentos;
const [principal, lado] = imagens;

/** Tile da galeria: recorte fixo e zoom discreto no hover. */
function Tile({
  imagem,
  className,
  sizes,
}: {
  imagem: SiteImage;
  className: string;
  sizes: string;
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-[3px] bg-grafite ${className}`}
    >
      <Image
        src={imagem.src}
        alt={imagem.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        style={{ objectPosition: imagem.position }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-grafite/55 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    </figure>
  );
}

/** Empreendimento em destaque da incorporadora, em duas imagens. */
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
            o título ocupa a linha inteira e o destaque vem abaixo, em duas colunas.
            No mobile a mesma palavra estoura a largura da tela a 36px — daí o
            passo menor até sm */}
        <Reveal className="mt-9">
          <h2 className="font-[family-name:var(--font-playfair)] text-[27px] leading-[1.08] font-normal tracking-[0.04em] text-grafite sm:text-4xl md:text-6xl">
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
            {/* no mobile o tile fica no nome e na localização */}
            <p className="hidden max-w-[500px] text-base leading-[1.85] font-light text-pedra md:block">
              {destaque.texto}
            </p>
          </Reveal>
        </div>

        {/* duas imagens: a principal manda na largura, a torre acompanha ao
            lado na mesma altura */}
        <Reveal
          delay={80}
          className="mt-[72px] grid gap-4 md:h-[680px] md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
        >
          <Tile
            imagem={principal}
            className="h-[420px] md:h-full"
            sizes="(max-width: 768px) 100vw, 660px"
          />
          <Tile
            imagem={lado}
            className="h-[280px] md:h-full"
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </Reveal>
      </div>
    </section>
  );
}
