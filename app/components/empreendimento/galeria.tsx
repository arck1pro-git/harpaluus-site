import Image from "next/image";

import { CtaLink } from "../landing/cta-link";
import { Listras } from "../landing/listras";
import { Reveal } from "../landing/reveal";
import { tourmaline } from "../landing/site-config";

const { galeria, cta } = tourmaline;
const total = String(galeria.length).padStart(2, "0");

/** Galeria do empreendimento e a chamada para a conversa comercial. */
export function Galeria() {
  return (
    <section className="ritmo-secao relative overflow-hidden bg-fundo">
      <Listras lado="esquerda" />
      <Listras lado="direita" />

      <div className="faixa relative">
        <Reveal variant="linha-desenha" className="h-px w-[52px] bg-dourado" />

        <Reveal className="mt-9">
          <h2 className="tipo-secao text-grafite">O PROJETO</h2>
        </Reveal>

        {/* duas colunas de fotos altas: a torre é vertical, a galeria também */}
        <div className="mt-[clamp(3rem,5vw,4.5rem)] grid gap-3 sm:grid-cols-2">
          {galeria.map((imagem, i) => (
            <Reveal key={imagem.src} delay={(i % 2) * 120}>
              <figure className="group relative h-[clamp(280px,52vw,420px)] overflow-hidden rounded-[3px] bg-grafite">
                <Image
                  src={imagem.src}
                  alt={imagem.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 570px"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: imagem.position }}
                />

                <div className="pointer-events-none absolute inset-0 bg-grafite/0 transition-colors duration-700 ease-out group-hover:bg-grafite/12" />

                <figcaption className="tipo-numero pointer-events-none absolute bottom-5 left-5 flex items-baseline gap-2 text-white/0 transition-colors duration-700 group-hover:text-white/70">
                  <span className="text-dourado/0 transition-colors duration-700 group-hover:text-dourado">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>/ {total}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* chamada final */}
        <Reveal className="mt-[clamp(5rem,9vw,8rem)] border-t border-grafite/10 pt-[clamp(3rem,5vw,4.5rem)]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="tipo-lead max-w-[420px] text-grafite">
                {cta.titulo}
              </p>
              <p className="tipo-corpo mt-4 max-w-[440px] text-pedra">
                {cta.texto}
              </p>
            </div>

            <CtaLink href={cta.href} tone="escuro" external className="shrink-0">
              {cta.label}
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
