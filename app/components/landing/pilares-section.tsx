import { Dots } from "./dots";
import { Reveal } from "./reveal";
import { pilares } from "./site-config";

/**
 * O método da incorporadora, em seção escura: os quatro pilares numerados,
 * ligados por conectores finos que se desenham na entrada.
 */
export function PilaresSection() {
  return (
    <section
      id="pilares"
      className="relative overflow-hidden bg-linear-to-b from-verde-escuro to-zinc-950 px-6 py-[120px] text-white md:px-10 md:py-[170px]"
    >
      <Dots
        canto="inferior-esquerdo"
        tone="claro"
        tamanho="h-[1040px] w-[1040px]"
      />

      <div className="relative mx-auto grid max-w-[1080px] gap-x-20 gap-y-16 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        <div>
          <Reveal variant="linha-desenha" className="h-px w-[52px] bg-dourado" />

          <Reveal className="mt-9">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl leading-[1.08] font-normal tracking-[0.04em] md:text-6xl">
              {pilares.titulo}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-9 max-w-[420px] text-[13.5px] leading-[1.9] font-light text-pedra-claro/90">
              {pilares.texto}
            </p>
          </Reveal>
        </div>

        <ol>
          {pilares.itens.map((item, i) => (
            <li key={item.titulo} className="group relative pl-8">
              {/* guia metálica: surge à esquerda do pilar sob o cursor */}
              <span
                aria-hidden
                className="absolute top-0 bottom-0 left-0 w-px origin-top scale-y-0 bg-linear-to-b from-dourado/0 via-dourado to-dourado/0 transition-transform duration-700 ease-out group-hover:scale-y-100"
              />

              <Reveal delay={i * 130}>
                <div className="flex items-baseline gap-4">
                  <span
                    className="numero-pulso origin-left text-[11px] font-medium tracking-[0.16em] text-dourado transition-transform duration-500 ease-out group-hover:scale-[1.35]"
                    style={
                      {
                        // 1/4 do ciclo por item: a luz nunca acende em dois ao mesmo tempo
                        "--pulso-delay": `${i * 1800}ms`,
                      } as React.CSSProperties
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[18px] leading-[1.25] font-normal tracking-[-0.01em] transition-colors duration-500 md:text-[20px]">
                      {item.titulo}
                    </p>
                    <p className="mt-2.5 max-w-[360px] text-[12.5px] leading-[1.75] font-light text-pedra-claro">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* conector vertical entre os pilares */}
              {i < pilares.itens.length - 1 ? (
                <Reveal
                  variant="linha-desenha-y"
                  delay={i * 130 + 180}
                  className="my-8 ml-[7px] h-14 w-px bg-white/15"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
