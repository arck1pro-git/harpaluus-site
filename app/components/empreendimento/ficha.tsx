import Image from "next/image";

import { Listras } from "../landing/listras";
import { Reveal } from "../landing/reveal";
import { tourmaline } from "../landing/site-config";

/**
 * Os números do ativo e a apresentação do projeto.
 *
 * A faixa de dados vem antes do texto de propósito: quem chega nesta página
 * quer saber o que é o edifício antes de ler por que ele é assim.
 */
export function Ficha() {
  const { ficha, apresentacao } = tourmaline;

  return (
    <section className="ritmo-secao relative overflow-hidden bg-fundo">
      <Listras lado="esquerda" />
      <Listras lado="direita" />

      <div className="faixa relative">
        {/* faixa de dados */}
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-y border-grafite/10 py-12 md:grid-cols-4">
          {ficha.map((dado, i) => (
            <Reveal key={dado.rotulo} delay={i * 100}>
              <dt className="sr-only">{dado.rotulo}</dt>
              <dd>
                <span className="block font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-none font-normal text-grafite">
                  {dado.valor}
                </span>
                <span className="mt-3 block text-base leading-[1.5] font-light tracking-[0.06em] text-pedra">
                  {dado.rotulo}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* apresentação */}
        <div className="mt-[clamp(4.5rem,8vw,7rem)] grid gap-x-16 gap-y-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          <Reveal>
            <span className="block h-px w-[52px] bg-dourado" />
            <h2 className="tipo-secao mt-9 text-grafite">
              {apresentacao.titulo}
            </h2>
          </Reveal>

          <div>
            <Reveal delay={140}>
              <p className="tipo-lead text-grafite">{apresentacao.lead}</p>
            </Reveal>

            <Reveal delay={280} className="mt-8 flex flex-col gap-6">
              {apresentacao.paragrafos.map((texto) => (
                <p
                  key={texto.slice(0, 24)}
                  className="tipo-corpo max-w-[540px] text-pedra"
                >
                  {texto}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        {/* a torre inteira, em pé: a única imagem da página que mostra a
            implantação — por isso ocupa a largura toda */}
        <Reveal delay={80} className="mt-[clamp(4rem,7vw,6rem)]">
          <figure className="relative h-[clamp(340px,55vw,620px)] overflow-hidden rounded-[3px] bg-grafite">
            <Image
              src={apresentacao.imagem.src}
              alt={apresentacao.imagem.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1160px"
              className="object-cover"
              style={{ objectPosition: apresentacao.imagem.position }}
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
