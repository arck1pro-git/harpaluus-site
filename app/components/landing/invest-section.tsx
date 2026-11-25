import Image from "next/image";

import { TituloComDestaque } from "./com-destaque";
import { CtaLink } from "./cta-link";
import { Dots } from "./dots";
import { Reveal } from "./reveal";
import { invest as investPt, textos, type Textos } from "./site-config";
import { CORPO, TITULO_SECAO_FRASE } from "./tipografia";

/**
 * O Amaan Invest: quem entra na SCP acompanha o próprio capital pelo app.
 *
 * Última seção antes do rodapé: o portal do investidor fecha a página, depois
 * do discurso institucional e dos empreendimentos.
 *
 * Um cartão, não uma faixa de ponta a ponta: o degradê azul-escuro → preto e a
 * textura de pontos das seções escuras, cantos arredondados (`rounded-lg`), mais
 * largo que a faixa de conteúdo, a uma margem estreita das bordas da tela. O
 * respiro branco embaixo separa o cartão do rodapé, que também é escuro.
 *
 * Dentro dele, o desenho de antes: texto à esquerda e o aparelho à direita,
 * descendo até a base do cartão, que não tem respiro embaixo justamente para
 * a mão encostar ali. A mão balança devagar com o celular (`balanco-mao`, em
 * globals.css), parada para quem pede menos movimento. Mais baixo que a faixa
 * antiga: o aparelho tem no máximo 340px de largura.
 *
 * Nas fontes e cores do resto do site: título na Playfair, texto na Inter,
 * nome do produto no dourado itálico dos destaques de título e o botão no
 * estilo único do site (`CtaLink`).
 */
export function InvestSection({
  conteudo: invest = investPt,
  textos: t = textos,
}: {
  /** o texto da seção; o padrão é o português, e `/alemao` passa o seu */
  conteudo?: typeof investPt;
  textos?: Textos;
} = {}) {
  return (
    <section
      id="invest"
      aria-labelledby="invest-titulo"
      className="bg-fundo px-[clamp(0.75rem,2vw,1.5rem)] pb-[clamp(4rem,8vw,6.5rem)]"
    >
      {/* O cartão vai além da faixa de conteúdo, até perto das bordas da
          tela (até 1520px); o que vai dentro dele volta para a `faixa`, então
          texto e aparelho continuam nas mesmas linhas do resto da página. */}
      {/* o fundo é o degradê das outras seções escuras (Pilares, rodapé):
          do azul-escuro em cima ao quase preto embaixo */}
      <div className="relative mx-auto max-w-[1520px] overflow-hidden rounded-lg bg-linear-to-b from-azul-escuro to-zinc-950 text-white">
        <Dots
          canto="superior-direito"
          tone="claro"
          tamanho="h-[360px] w-[360px] md:h-[620px] md:w-[620px]"
        />

        <div className="faixa relative grid gap-10 pt-[clamp(3rem,6vw,4.5rem)] lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7 lg:self-center lg:pb-[clamp(3rem,6vw,4.5rem)]">
            <Reveal>
              <h2 id="invest-titulo" className={`${TITULO_SECAO_FRASE} max-w-[22ch]`}>
                <TituloComDestaque
                  texto={`${invest.titulo} AMAAN Invest`}
                  destaque="AMAAN Invest"
                  fundo="escuro"
                  marca
                />
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className={`${CORPO} mt-6 max-w-[48ch] text-pedra-claro`}>{invest.texto}</p>

              <CtaLink href={invest.cta.href} tone="claro" external className="mt-8">
                {invest.cta.label}
                <span className="sr-only"> {t.novaAba}</span>
              </CtaLink>
            </Reveal>
          </div>

          {/* o aparelho não flutua: desce até a base do cartão */}
          <Reveal
            delay={200}
            className="w-[min(68vw,280px)] justify-self-center lg:col-span-4 lg:col-start-9 lg:w-[min(100%,340px)] lg:self-end"
          >
            {/* O balanço (`balanco-mao`, em globals.css) gira em torno do
                pulso, na base. A mão passa 32px da borda de baixo (o cartão
                corta o excesso): assim, quando ela inclina 2,5 graus e sobe
                14px, nenhuma fresta abre entre o pulso e a base do cartão. */}
            <div className="balanco-mao -mb-8">
              <Image
                src={invest.mockup.src}
                alt={invest.mockup.alt}
                width={1200}
                height={1650}
                sizes="(min-width: 1024px) 340px, 68vw"
                className="block h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
