import Image from "next/image";
import { MapPin } from "lucide-react";

import { TRACO } from "./icones";
import { MarcaDagua } from "./marca-dagua";
import { Reveal } from "./reveal";
import { empreendimentos as empreendimentosPt, type SiteImage } from "./site-config";
import { CORPO, TITULO_ITEM, TITULO_SECAO } from "./tipografia";

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

/**
 * Empreendimento em destaque da incorporadora, em duas imagens.
 *
 * Na mesma margem (`faixa`) e no mesmo grid de 12 colunas das outras seções:
 * título na largura inteira; nome e localização nas colunas 1 a 5, o texto
 * a partir da coluna 7; e as duas imagens dividindo as colunas em 7 + 5, de
 * margem a margem.
 */
export function EmpreendimentosSection({
  conteudo = empreendimentosPt,
}: {
  /** o texto da seção; o padrão é o português, e `/alemao` passa o seu */
  conteudo?: typeof empreendimentosPt;
} = {}) {
  const { destaque, imagens, titulo } = conteudo;
  const [principal, lado] = imagens;

  return (
    <section id="empreendimentos" className="ritmo-secao relative overflow-hidden bg-fundo">
      {/* no canto de cima, à esquerda: embaixo as fotos vão de margem a
          margem e o cobririam */}
      <MarcaDagua canto="superior-esquerdo" />

      <div className="faixa relative">
        {/* "EMPREENDIMENTOS" é uma palavra só: o título ocupa a linha inteira
            e o destaque vem abaixo, em duas colunas. O piso da escala (26px)
            é o que a faz caber numa tela de 320px. */}
        <Reveal>
          <h2 className={`${TITULO_SECAO} text-grafite`}>{titulo}</h2>
        </Reveal>

        <div className="mt-10 grid gap-y-8 md:mt-14 lg:grid-cols-12 lg:gap-x-6">
          <Reveal className="lg:col-span-5">
            {/* o nome é o título do empreendimento: h3 na Playfair, abaixo do
                h2 da seção */}
            <h3 translate="no" className={`${TITULO_ITEM} text-grafite`}>
              {destaque.nome}
            </h3>
            <p className="tipo-label mt-4 flex items-center gap-2.5 leading-[1.5] text-dourado-escuro">
              <MapPin size={14} strokeWidth={TRACO} aria-hidden className="shrink-0" />
              {destaque.meta}
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            {/* no mobile o tile fica no nome e na localização */}
            <p className={`${CORPO} hidden max-w-[52ch] text-pedra md:block lg:pt-[0.35rem]`}>
              {destaque.texto}
            </p>
          </Reveal>
        </div>

        {/* duas imagens na mesma altura: a principal nas colunas 1 a 7, a
            torre nas colunas 8 a 12 */}
        <Reveal
          delay={80}
          className="mt-14 grid gap-4 md:mt-[72px] md:h-[30rem] md:grid-cols-12 md:gap-6 lg:h-[42.5rem]"
        >
          <Tile
            imagem={principal}
            className="h-[420px] md:col-span-7 md:h-full"
            sizes="(max-width: 768px) 100vw, 680px"
          />
          <Tile
            imagem={lado}
            className="h-[280px] md:col-span-5 md:h-full"
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </Reveal>
      </div>
    </section>
  );
}
