import Image from "next/image";

import { Reveal } from "../landing/reveal";
import { tourmaline } from "../landing/site-config";

/**
 * Capa do empreendimento.
 *
 * Mais baixa que o hero da home e sem parallax: o momento cinematográfico da
 * marca é a abertura da home, e repeti-lo aqui esvaziaria os dois. Esta capa
 * apresenta o ativo — nome, lugar, coordenada — e sai da frente.
 */
export function Capa() {
  const { capa, nome, local, status, coordenadas, chamada } = tourmaline;

  return (
    <section className="relative flex h-[78svh] max-h-[760px] min-h-[520px] w-full items-end overflow-hidden bg-verde-escuro">
      <Image
        src={capa.src}
        alt={capa.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: capa.position }}
      />

      <div className="absolute inset-0 bg-linear-to-t from-verde-escuro/85 via-verde-escuro/25 to-verde-escuro/40" />

      <div className="faixa relative z-10 pb-[clamp(56px,9vh,88px)]">
        <Reveal>
          <p className="tipo-label text-dourado">Empreendimento em destaque</p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="tipo-display mt-6 text-white">{nome}</h1>
        </Reveal>

        {/* linha de identificação do ativo: lugar, estágio e coordenada */}
        <Reveal delay={260}>
          <div className="tipo-numero mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-white/60 uppercase">
            <span>{local}</span>
            <span aria-hidden className="h-3 w-px bg-white/25" />
            <span>{status}</span>
            <span aria-hidden className="h-3 w-px bg-white/25" />
            <span>{coordenadas}</span>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="tipo-corpo mt-7 max-w-[520px] text-white/70">
            {chamada}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
