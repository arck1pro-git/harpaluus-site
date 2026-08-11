import { Listras } from "./listras";
import { Reveal } from "./reveal";
import { sobre } from "./site-config";

/** Quem é a Harpaluus: bloco editorial no tom claro da marca. */
export function SobreSection() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-fundo px-6 py-[120px] md:px-10 md:py-[160px]"
    >
      <Listras lado="esquerda" />
      <Listras lado="direita" />

      <div className="relative mx-auto max-w-[1080px]">
        <Reveal variant="linha-desenha" className="h-px w-[52px] bg-dourado" />

        <div className="mt-9 grid gap-x-16 gap-y-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-x-28">
          <Reveal>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl leading-[1.08] font-normal tracking-[0.04em] text-grafite md:text-6xl">
              {sobre.titulo}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-[21px] leading-[1.4] font-normal tracking-[-0.01em] text-grafite md:text-[24px]">
              {sobre.lead}
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {sobre.paragrafos.map((texto) => (
                <p
                  key={texto.slice(0, 24)}
                  className="max-w-[520px] text-[13.5px] leading-[1.85] font-light text-pedra"
                >
                  {texto}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
