import { Dots } from "./dots";
import { Limiar } from "./limiar";
import { Reveal } from "./reveal";
import { pilares } from "./site-config";

/**
 * O método da incorporadora, em seção escura.
 *
 * A lista não é um cardápio de benefícios: é um sistema de decisão. Por isso
 * o comportamento do bloco importa mais que o de cada item — ao apontar um
 * pilar, os outros recuam (regra em `.lista-pilares`), a guia lateral se
 * desenha e a trama técnica aparece no fundo da linha. Tudo no limite do
 * perceptível.
 */
export function PilaresSection() {
  return (
    <section
      id="pilares"
      // overflow-clip e não hidden: hidden cria contexto de rolagem e
      // quebraria o sticky da coluna do título
      className="ritmo-secao relative overflow-clip bg-linear-to-b from-verde-escuro to-zinc-950 text-white"
    >
      <Limiar tone="claro" />
      <Dots
        canto="inferior-esquerdo"
        tone="claro"
        tamanho="h-[1040px] w-[1040px]"
      />

      <div className="faixa relative grid gap-x-20 gap-y-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
        {/* a coluna do título acompanha a leitura da lista */}
        <div className="md:sticky md:top-[calc(var(--header-baixo)+3.5rem)] md:self-start">
          <Reveal variant="linha-desenha" className="h-px w-[52px] bg-dourado" />

          <Reveal className="mt-10">
            <h2 className="tipo-secao">{pilares.titulo}</h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="tipo-corpo mt-9 max-w-[420px] text-pedra-claro/90">
              {pilares.texto}
            </p>
          </Reveal>
        </div>

        <ol className="lista-pilares">
          {pilares.itens.map((item, i) => (
            <li key={item.titulo} className="group relative">
              <Reveal delay={i * 120}>
                <div className="relative py-7 pr-6 pl-8 transition-[padding] duration-700 ease-out md:group-hover:pl-10">
                  {/* guia de estado: 1px sempre presente, que ganha o dourado
                      e a altura inteira quando o pilar está sob o cursor */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-px bg-white/12"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-px origin-center scale-y-0 bg-linear-to-b from-dourado/0 via-dourado to-dourado/0 transition-transform duration-[900ms] ease-out group-hover:scale-y-100"
                  />

                  {/* trama de planta no fundo da linha apontada */}
                  <span
                    aria-hidden
                    className="trama-tecnica pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-[0.045]"
                  />

                  <div className="relative flex items-baseline gap-5">
                    <span className="tipo-numero text-dourado/55 transition-colors duration-500 ease-out group-hover:text-dourado">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p className="text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.25] font-normal tracking-[-0.015em] text-white/85 transition-colors duration-500 ease-out group-hover:text-white">
                        {item.titulo}
                      </p>
                      <p className="tipo-corpo-curto mt-3 max-w-[380px] text-pedra-claro/80 transition-colors duration-500 ease-out group-hover:text-pedra-claro">
                        {item.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* divisor entre pilares: some no último */}
              {i < pilares.itens.length - 1 ? (
                <Reveal
                  variant="linha-desenha"
                  delay={i * 120 + 200}
                  className="ml-8 h-px bg-white/10"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
