import type { Metadata } from "next";

import {
  jsonLd,
  organizacao,
  paginaWeb,
  site,
  trilha,
} from "../components/landing/dados-estruturados";
import { Dots } from "../components/landing/dots";
import { Reveal } from "../components/landing/reveal";
import { Fluxo } from "../components/lp/fluxo";
import { BotaoFormulario, FormularioProvider } from "../components/lp/form-modal";
import type { TextosSucesso } from "../components/lp/formulario";
import { lp2, marca, ROTA_LP2 } from "../components/lp/lp-config";
import { LpFooter } from "../components/lp/lp-footer";
import { LpHeader } from "../components/lp/lp-header";
import { Paragrafo, Secao, Tese, Titulo } from "../components/lp/lp-ui";

/**
 * LP 02 — Educação SCP + Interesse (Funil 1 · SCP).
 *
 * A página ensina a lógica econômica da participação em uma incorporação e só
 * então pede o contato. A oferta não aparece em lugar nenhum: o que se pede é
 * manifestação de interesse em conhecer uma oportunidade, não decisão.
 *
 * A copy inteira vem de `lp-config.ts`; o que está aqui é a composição.
 */

const TITULO =
  "Participar de uma incorporação: como funciona a SCP no mercado imobiliário";

const DESCRICAO =
  "Entenda como investidores participam economicamente de uma operação de incorporação: de onde vem o resultado, quem precisa produzi-lo, o que analisar e quais riscos existem no caminho.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: ROTA_LP2 },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: ROTA_LP2,
    /* Sem esta linha o card sai sem o nome do site: declarar `openGraph` na
       página substitui o objeto inteiro do layout, não faz mesclagem campo a
       campo — e `og:site_name` é um dos sinais que o Google lê para decidir
       que nome exibir em negrito no resultado. */
    siteName: marca,
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
  },
};

const dadosEstruturados = jsonLd(
  organizacao,
  site,
  paginaWeb({ caminho: ROTA_LP2, titulo: TITULO, descricao: DESCRICAO }),
  trilha({ caminho: ROTA_LP2, titulo: "Participação em incorporação via SCP" })
);

const SUCESSO: TextosSucesso = {
  titulo: "Interesse registrado.",
  texto:
    "Nosso time entrará em contato pelo WhatsApp informado para entender seu momento. Nenhuma decisão é esperada nessa conversa.",
};

export default function Lp2() {
  return (
    <FormularioProvider
      origem="lp2-interesse"
      titulo={lp2.formulario.titulo}
      rotuloEnvio={lp2.cta}
      sucesso={SUCESSO}
    >
      <main className="relative w-full bg-fundo font-[family-name:var(--font-inter)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: dadosEstruturados }}
        />

        <LpHeader />

        {/* ------------------------------------------------------------ 01 HERO
            Sem fotografia, e é uma decisão do brief, não falta de imagem: o
            primeiro viewport não pode apresentar oferta nem empreendimento, e
            todo material de imagem disponível identifica um empreendimento
            específico pela fachada. Então o hero se sustenta em tipografia e na
            textura da marca. Quando existir foto de terreno, obra ou reunião —
            prova real da atividade, que é o que o brief pede —, ela entra aqui. */}
        <section className="relative overflow-hidden bg-azul-escuro text-white">
          <Dots
            canto="superior-direito"
            tone="claro"
            tamanho="h-[520px] w-[520px] md:h-[860px] md:w-[860px]"
          />

          <div className="faixa relative py-[clamp(4.5rem,10vw,8rem)]">
            <div className="max-w-[780px]">
              <Reveal variant="linha-desenha" className="h-px w-[52px] bg-dourado" />

              <h1 className="tipo-headline mt-8 text-white">{lp2.hero.titulo}</h1>

              <Reveal as="p" delay={160} className="tipo-corpo mt-8 max-w-[620px] text-pedra-claro">
                {lp2.hero.texto}
              </Reveal>

              {/* a promessa do fim da página, dita já no começo: quem chega aqui
                  precisa saber que existe um pedido de contato adiante */}
              <Reveal
                as="p"
                delay={280}
                className="mt-8 max-w-[560px] border-l border-dourado/45 pl-6 text-[15px] leading-[1.7] font-light text-pedra-claro"
              >
                {lp2.hero.apoio}
              </Reveal>

              <Reveal delay={400} className="mt-11">
                <BotaoFormulario tom="escuro">{lp2.ctaHero}</BotaoFormulario>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------ 02 O MODELO QUE VOCÊ CONHECE
            Parte da crença atual sem desqualificá-la — daí a jornada de quem
            compra o imóvel aparecer inteira, e não como erro. */}
        <Secao id="como-funciona">
          <div className="max-w-[760px]">
            <Titulo>{lp2.modeloConhecido.titulo}</Titulo>

            <div className="mt-9 flex flex-col gap-6">
              {lp2.modeloConhecido.paragrafos.map((texto, i) => (
                <Paragrafo key={texto.slice(0, 24)} texto={texto} delay={i * 80} />
              ))}
            </div>
          </div>

          <Fluxo etapas={lp2.modeloConhecido.jornada} className="mt-14" />

          <Tese className="mt-14">{lp2.modeloConhecido.tese}</Tese>
        </Secao>

        {/* -------------------------------------------- 03 O OUTRO LADO DA MESA
            Peça central da página. O diagrama ganha a largura toda e fica entre
            filetes, separado do texto que o explica. */}
        <Secao className="border-t border-linha">
          <div className="max-w-[860px]">
            <Titulo>{lp2.outroLado.titulo}</Titulo>
          </div>

          <div className="mt-14 border-y border-linha py-12">
            <Fluxo etapas={lp2.outroLado.etapas} />
          </div>

          <div className="mt-12 flex max-w-[760px] flex-col gap-6">
            {lp2.outroLado.paragrafos.map((texto, i) => (
              <Paragrafo key={texto.slice(0, 24)} texto={texto} delay={i * 80} />
            ))}
          </div>

          <Reveal className="mt-12">
            <BotaoFormulario>{lp2.cta}</BotaoFormulario>
          </Reveal>
        </Secao>

        {/* -------------------------------------------------- 04 OS DOIS LADOS
            Bloco explicativo, não a tese da página — por isso dois cards de
            borda fina, sem hierarquia entre eles: nenhum dos lados é "o certo". */}
        <Secao className="border-t border-linha">
          <div className="max-w-[760px]">
            <Titulo>{lp2.doisLados.titulo}</Titulo>
          </div>

          <div className="mt-14 grid gap-px bg-linha md:grid-cols-2">
            {lp2.doisLados.lados.map((lado, i) => (
              <Reveal
                key={lado.titulo}
                delay={i * 120}
                className="bg-fundo px-7 py-9 sm:px-9 sm:py-10"
              >
                <div className="flex items-center gap-4">
                  <span aria-hidden className="h-px w-6 bg-dourado" />
                  <h3 className="tipo-label text-dourado-escuro">{lado.titulo}</h3>
                </div>

                <p className="tipo-corpo mt-6 text-pedra">{lado.texto}</p>
              </Reveal>
            ))}
          </div>

          <Tese className="mt-14">{lp2.doisLados.tese}</Tese>
        </Secao>

        {/* -------------------------------------------------- 05 ONDE ENTRA A SCP
            A sigla só aparece aqui, depois de a lógica econômica estar de pé —
            e aparece como estrutura de participação, nunca como produto. */}
        <Secao className="border-t border-linha">
          <div className="max-w-[760px]">
            <Titulo>{lp2.ondeEntraScp.titulo}</Titulo>

            <div className="mt-9 flex flex-col gap-6">
              {lp2.ondeEntraScp.paragrafos.map((texto, i) => (
                <Paragrafo key={texto.slice(0, 24)} texto={texto} delay={i * 80} />
              ))}
            </div>
          </div>

          <Reveal className="mt-12">
            <BotaoFormulario>{lp2.cta}</BotaoFormulario>
          </Reveal>
        </Secao>

        {/* ------------------------------------------------ 06 ORIGEM DO RESULTADO
            O maior destaque da LP, e a virada de crença do funil inteiro: o
            único bloco escuro do miolo, com a cadeia em corpo maior. */}
        <Secao tom="escuro">
          <div className="max-w-[820px]">
            <Titulo tom="escuro">
              {lp2.origemResultado.titulo}
            </Titulo>

            <Paragrafo
              tom="escuro"
              texto={lp2.origemResultado.abertura}
              className="mt-8 max-w-[620px]"
            />
          </div>

          <div className="mt-14 border-y border-white/12 py-12">
            <Fluxo etapas={lp2.origemResultado.cadeia} tom="escuro" variante="cadeia" />
          </div>

          <Paragrafo
            tom="escuro"
            texto={lp2.origemResultado.fecho}
            className="mt-12 max-w-[720px]"
          />

          <Tese tom="escuro" className="mt-10 max-w-[720px]">
            {lp2.origemResultado.tese}
          </Tese>
        </Secao>

        {/* ------------------------------------------------------ 07 O QUE ANALISAR
            Lê como framework: chave curta em cima, pergunta embaixo, todos com
            o mesmo peso. É a lista que o visitante deveria levar para qualquer
            oportunidade — inclusive as que não são nossas. */}
        <Secao>
          <div className="max-w-[760px]">
            <Titulo>{lp2.analisar.titulo}</Titulo>
            <Paragrafo texto={lp2.analisar.texto} className="mt-6 max-w-[560px]" />
          </div>

          <ol className="mt-14 grid gap-px bg-linha sm:grid-cols-2 lg:grid-cols-3">
            {lp2.analisar.itens.map((item, i) => (
              <Reveal
                key={item.chave}
                as="li"
                delay={i * 70}
                className="flex flex-col bg-fundo px-7 py-8"
              >
                <span className="tipo-numero text-dourado-escuro">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="tipo-label mt-5 text-azul-escuro">{item.chave}</h3>

                <p className="tipo-corpo-curto mt-3 text-pedra">{item.pergunta}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-14">
            <BotaoFormulario>{lp2.cta}</BotaoFormulario>
          </Reveal>
        </Secao>

        {/* -------------------------------------------------------------- 08 RISCO
            Não escondido no rodapé, e sem selo de segurança: o risco entra como
            parte do método, com a mesma tipografia das outras seções. */}
        <Secao className="border-t border-linha">
          <div className="max-w-[760px]">
            <Titulo>{lp2.risco.titulo}</Titulo>

            <p className="tipo-corpo mt-9 text-pedra">{lp2.risco.texto}</p>

            <p className="tipo-corpo mt-8 text-pedra">{lp2.risco.introLogica}</p>
          </div>

          <div className="mt-12 border-y border-linha py-12">
            <Fluxo etapas={lp2.risco.logica} />
          </div>

          <Tese className="mt-12 max-w-[720px]">
            {lp2.risco.tese}{" "}
            <span className="text-pedra">{lp2.risco.complemento}</span>
          </Tese>
        </Secao>

        {/* -------------------------------------------------------- 09 POR QUE AMAAN
            Ancora a autoridade na incorporação, não em gestão financeira. O
            contraste das duas perguntas é o resumo da página em duas linhas. */}
        <Secao tom="escuro" cantoDots="superior-direito">
          <div className="max-w-[820px]">
            <Titulo tom="escuro">
              {lp2.porQueAmaan.titulo}
            </Titulo>

            <Tese tom="escuro" className="mt-9">
              {lp2.porQueAmaan.tese}
            </Tese>

            <div className="mt-9 flex flex-col gap-6">
              {lp2.porQueAmaan.paragrafos.map((texto, i) => (
                <Paragrafo
                  key={texto.slice(0, 24)}
                  tom="escuro"
                  texto={texto}
                  delay={i * 80}
                  className="max-w-[680px]"
                />
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-px bg-white/12 md:grid-cols-2">
            <Reveal className="bg-azul-escuro px-7 py-9 sm:px-9">
              <span className="tipo-label text-pedra-claro">A pergunta de sempre</span>
              <p className="mt-5 text-[17px] leading-[1.45] font-light text-pedra-claro sm:text-[19px]">
                {lp2.porQueAmaan.contraste.antes}
              </p>
            </Reveal>

            <Reveal delay={120} className="bg-azul-escuro px-7 py-9 sm:px-9">
              <span className="tipo-label text-dourado-claro">A pergunta que falta</span>
              <p className="mt-5 font-[family-name:var(--font-playfair)] text-[19px] leading-[1.35] text-white sm:text-[21px]">
                {lp2.porQueAmaan.contraste.depois}
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-14">
            <BotaoFormulario tom="escuro">{lp2.cta}</BotaoFormulario>
          </Reveal>
        </Secao>

        {/* ------------------------------------------------------------ 10 TRANSIÇÃO
            Prepara a chegada do formulário: lista o que "conhecer uma
            oportunidade" deveria significar, sem revelar oportunidade nenhuma. */}
        <Secao>
          <div className="max-w-[760px]">
            <Titulo>{lp2.transicao.titulo}</Titulo>

            <p className="tipo-corpo mt-9 text-pedra">{lp2.transicao.abertura}</p>
          </div>

          <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {lp2.transicao.itens.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={i * 60}
                className="flex gap-4 border-t border-linha pt-5 text-[15px] leading-[1.55] font-light text-pedra"
              >
                <span className="tipo-numero shrink-0 pt-[5px] text-dourado-escuro">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </Reveal>
            ))}
          </ul>

          <Tese className="mt-14">{lp2.transicao.tese}</Tese>
        </Secao>

        {/* -------------------------------------------------- 11 FORMULÁRIO DE INTERESSE */}
        <Secao id="interesse" tom="escuro">
          <div className="max-w-[720px]">
            <Titulo tom="escuro">{lp2.formulario.titulo}</Titulo>

            <div className="mt-9 flex flex-col gap-6">
              {lp2.formulario.paragrafos.map((texto, i) => (
                <Paragrafo key={texto.slice(0, 24)} tom="escuro" texto={texto} delay={i * 80} />
              ))}
            </div>

            <Reveal className="mt-11">
              <BotaoFormulario tom="escuro">{lp2.cta}</BotaoFormulario>
            </Reveal>

            {/* O aviso fica na página, e não só dentro da janela: quem decide
                se clica precisa saber, antes de clicar, que isto não é
                compromisso de participação. */}
            <Reveal
              as="p"
              delay={120}
              className="mt-8 max-w-[560px] text-[13px] leading-[1.7] font-light text-pedra-claro"
            >
              {lp2.formulario.aviso}
            </Reveal>
          </div>
        </Secao>

        {/* -------------------------------------------------------- 12 FECHAMENTO */}
        <LpFooter
          titulo={lp2.fechamento.marca}
          tese={lp2.fechamento.tese}
          aviso={lp2.fechamento.aviso}
          />
      </main>
    </FormularioProvider>
  );
}
