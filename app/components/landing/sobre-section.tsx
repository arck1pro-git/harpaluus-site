import { ComDestaque } from "./com-destaque";
import { Listras } from "./listras";
import { Reveal } from "./reveal";
import { sobre } from "./site-config";

/**
 * Quem é a Amaan: bloco editorial no tom claro da marca.
 *
 * Composição centrada e empilhada — filete, título, lead e parágrafos na
 * mesma coluna do meio. As medidas caem conforme o peso do texto (título
 * largo, lead médio, corpo estreito) para nenhuma linha ficar longa demais
 * de ler quando o texto é centralizado.
 */
export function SobreSection() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-fundo px-6 py-[120px] md:px-10 md:py-[160px]"
    >
      <Listras lado="esquerda" />
      <Listras lado="direita" />

      <div className="relative mx-auto max-w-[1080px] text-center">
        <Reveal
          variant="linha-desenha"
          className="mx-auto h-px w-[52px] bg-dourado"
        />

        <Reveal className="mt-9">
          <h2 className="mx-auto max-w-[860px] font-[family-name:var(--font-playfair)] text-4xl leading-[1.08] font-normal tracking-[0.04em] text-grafite md:text-6xl">
            {sobre.titulo}
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-9">
          <p className="mx-auto max-w-[700px] text-[21px] leading-[1.4] font-normal tracking-[-0.01em] text-grafite md:text-[24px]">
            <ComDestaque texto={sobre.lead} />
          </p>

          {/* no mobile a seção fica no título e no lead: os dois parágrafos
              de desenvolvimento só aparecem a partir de md */}
          <div className="mt-9 hidden flex-col gap-6 md:flex">
            {sobre.paragrafos.map((texto) => (
              <p
                key={texto.slice(0, 24)}
                className="mx-auto max-w-[620px] text-base leading-[1.85] font-light text-pedra"
              >
                <ComDestaque texto={texto} />
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
