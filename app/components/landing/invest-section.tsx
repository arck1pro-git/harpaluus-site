import Image from "next/image";

import { CtaLink } from "./cta-link";
import { Dots } from "./dots";
import { Reveal } from "./reveal";
import { invest } from "./site-config";

/**
 * O Amaan Invest: quem entra na SCP acompanha o próprio capital pelo app.
 *
 * Ao contrário das outras seções, o escuro aqui não é a seção inteira: é um
 * cartão de cantos arredondados sobre o claro do site, com 40px de folga em
 * volta. O
 * bloco se lê como a própria tela do produto embutida na página.
 *
 * É a primeira seção depois do hero: o produto entra antes do discurso
 * institucional.
 */
export function InvestSection() {
  return (
    <section id="invest" className="bg-fundo">
      <div
        // No mobile o bloco é full-bleed: encosta nas laterais e na seção de
        // baixo, e a única margem que sobra é a de topo, que separa do hero. A
        // partir de md ele volta a ser um cartão solto sobre o branco.
        // Não usa ritmo-secao: o --ritmo (até 168px) é o respiro das seções
        // full-bleed. Num cartão de altura própria ele empilha com a margem e
        // o bloco fica alto demais — aqui o teto é 48px.
        // overflow-clip segura as bolinhas e o aparelho dentro do cartão
        className="relative mt-24 overflow-clip bg-linear-to-b from-azul-escuro to-zinc-950 py-[var(--respiro)] text-white md:mx-10 md:mb-10 md:rounded"
        style={{ "--respiro": "clamp(2rem, 3vw, 3rem)" } as React.CSSProperties}
      >
        {/* clarão no miolo: sobe a luz no centro do cartão nos dois eixos,
            sem clarear as bordas — o degradê vertical continua fazendo o
            resto */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 70% at 50% 50%, color-mix(in oklab, var(--color-azul-profundo) 70%, transparent) 0%, transparent 100%)",
          }}
        />

        {/* dois cantos na diagonal: a textura atravessa o cartão sem fechar
            o miolo, que é por onde o texto corre */}
        <Dots
          canto="inferior-esquerdo"
          tone="claro"
          tamanho="h-[520px] w-[520px] md:h-[1040px] md:w-[1040px]"
        />
        <Dots
          canto="superior-direito"
          tone="claro"
          tamanho="h-[520px] w-[520px] md:h-[1040px] md:w-[1040px]"
        />

        <div className="faixa relative grid items-center gap-x-16 gap-y-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)]">
          {/* empilhado no mobile, a coluna se lê melhor centrada; a partir de
              md ela volta a alinhar pela esquerda, ao lado do aparelho */}
          <div className="text-center md:text-left">
            <Reveal
              variant="linha-desenha"
              className="mx-auto h-px w-[52px] bg-dourado md:mx-0"
            />

            <Reveal delay={80}>
              {/* não usa tipo-secao: aquela escala existe para títulos de uma
                  ou duas palavras (EMPREENDIMENTOS, QUATRO PILARES). Uma frase
                  inteira a 56px viraria seis linhas ao lado do aparelho — aqui
                  o teto é 40px. */}
              <h2 className="mt-8 font-[family-name:var(--font-playfair)] text-[clamp(1.625rem,1.1rem+1.9vw,2.25rem)] leading-[1.18] font-normal tracking-[0.02em]">
                {invest.titulo}{" "}
                <span className="tracking-[0.06em] whitespace-nowrap text-dourado">
                  {invest.produto}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <p className="tipo-corpo mx-auto mt-6 max-w-[440px] text-pedra-claro/90 md:mx-0">
                {invest.texto}
              </p>

              <CtaLink
                href={invest.cta.href}
                tone="claro"
                external
                className="mt-8"
              >
                {invest.cta.label}
              </CtaLink>
            </Reveal>
          </div>

          {/* o aparelho não flutua no meio do cartão: desce até encostar na
              base e é cortado pela borda — o mb negativo cancela o respiro de
              baixo, e por isso o cartão ainda perde altura */}
          <Reveal
            delay={200}
            className="relative mx-auto w-full max-w-[210px] self-end mb-[calc(var(--respiro)*-1)] md:max-w-[260px]"
          >
            {/* o recorte é transparente: sem um halo frio por trás, a mão fica
                flutuando no vazio do degradê */}
            <div
              aria-hidden
              className="absolute inset-x-[-22%] top-[-6%] bottom-0"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--color-azul) 60%, transparent) 0%, transparent 100%)",
              }}
            />

            <Image
              src={invest.mockup.src}
              alt={invest.mockup.alt}
              width={1200}
              height={1650}
              sizes="(min-width: 768px) 260px, 210px"
              className="relative h-auto w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
