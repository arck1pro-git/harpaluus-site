import { Dots } from "../landing/dots";
import { Reveal } from "../landing/reveal";
import { tourmaline } from "../landing/site-config";

/**
 * As seis camadas do Empreendimento Vivo, traduzidas em decisão de projeto.
 *
 * Na home as camadas são a tese, em uma linha cada. Aqui elas abrem: cada
 * camada mostra seus grupos de decisão e o que existe de concreto dentro do
 * edifício. É a seção que prova a promessa da home.
 */
export function Dimensoes() {
  const { dimensoes } = tourmaline;

  return (
    <section
      id="dimensoes"
      // overflow-clip e não hidden: hidden cria contexto de rolagem e
      // quebraria o sticky da identificação de cada pilar
      className="ritmo-secao relative overflow-clip bg-linear-to-b from-azul-escuro to-zinc-950 text-white"
    >
      <Dots
        canto="inferior-esquerdo"
        tone="claro"
        tamanho="h-[520px] w-[520px] md:h-[900px] md:w-[900px]"
      />

      <div className="faixa relative">
        <Reveal variant="linha-desenha" className="h-px w-[52px] bg-dourado" />

        <div className="mt-10 grid gap-x-20 gap-y-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <h2 className="tipo-secao">{dimensoes.titulo}</h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="tipo-corpo max-w-[460px] text-pedra-claro/85 md:mt-2">
              {dimensoes.texto}
            </p>
          </Reveal>
        </div>

        <ol className="mt-[clamp(4rem,7vw,6rem)]">
          {dimensoes.itens.map((item, i) => (
            <li
              key={item.titulo}
              className="border-t border-white/10 py-[clamp(2.5rem,4vw,3.5rem)]"
            >
              <Reveal>
                <div className="grid gap-x-16 gap-y-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
                  {/* identificação do pilar */}
                  <div className="flex items-baseline gap-5 md:sticky md:top-[calc(var(--header-altura)+3rem)] md:self-start">
                    <span className="tipo-numero text-dourado">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-[1.2] font-normal tracking-[-0.015em]">
                      {item.titulo}
                    </h3>
                  </div>

                  {/* o que isso significa no edifício */}
                  <div className="flex flex-col gap-9">
                    {item.grupos.map((grupo) => (
                      <div key={grupo.titulo}>
                        <p className="tipo-label text-dourado/75">
                          {grupo.titulo}
                        </p>

                        <ul className="mt-4 flex flex-col gap-2.5">
                          {grupo.itens.map((texto) => (
                            <li
                              key={texto}
                              className="tipo-corpo-curto flex gap-3.5 text-pedra-claro/85"
                            >
                              <span
                                aria-hidden
                                className="mt-[0.65em] h-px w-3 shrink-0 bg-white/25"
                              />
                              {texto}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
