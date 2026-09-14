import type { Metadata } from "next";

import {
  jsonLd,
  organizacao,
  paginaWeb,
  site,
  trilha,
} from "../components/landing/dados-estruturados";
import { Reveal } from "../components/landing/reveal";
import { ChecklistMockup } from "../components/lp/checklist-mockup";
import { BotaoFormulario, FormularioProvider } from "../components/lp/form-modal";
import type { TextosSucesso } from "../components/lp/formulario";
import { lp1, marca, ROTA_LP1 } from "../components/lp/lp-config";
import { LpFooter } from "../components/lp/lp-footer";
import { LpHeader } from "../components/lp/lp-header";
import { Apoios, Paragrafo, Secao, Tese, Titulo } from "../components/lp/lp-ui";

/**
 * LP 01 — Checklist (Funil 1 · SCP).
 *
 * Captura de menor compromisso: entrega uma ferramenta de análise para quem
 * está pesquisando SCP imobiliária. A oportunidade da AMAAN não aparece, e o
 * único pedido da página é o cadastro para receber o material.
 *
 * O formulário não fica na página: todo CTA abre a mesma janela sobre o
 * conteúdo (ver `form-modal.tsx`). A página, então, só precisa repetir o
 * convite — e o convite é sempre o mesmo botão.
 *
 * A copy vem de `lp-config.ts`; o que está aqui é a composição.
 */

const TITULO = "Checklist: 7 perguntas antes de participar de uma SCP imobiliária";

const DESCRICAO =
  "Material gratuito da Amaan Incorporadora para analisar uma SCP imobiliária além da projeção: o negócio, quem executa, o destino do capital, os riscos e as regras da participação.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: ROTA_LP1 },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: ROTA_LP1,
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
  paginaWeb({ caminho: ROTA_LP1, titulo: TITULO, descricao: DESCRICAO }),
  trilha({ caminho: ROTA_LP1, titulo: "Checklist SCP" })
);

const SUCESSO: TextosSucesso = {
  titulo: "Pronto. Seu Checklist está a caminho.",
  texto:
    "Enviamos as 7 perguntas para o e-mail informado. Se não chegar nos próximos minutos, vale conferir a caixa de promoções ou de spam.",
};

export default function Lp1() {
  return (
    <FormularioProvider
      origem="lp1-checklist"
      titulo={lp1.formulario.titulo}
      rotuloEnvio={lp1.cta}
      sucesso={SUCESSO}
    >
      <main className="relative w-full bg-fundo font-[family-name:var(--font-inter)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: dadosEstruturados }}
        />

        <LpHeader />

        {/* ---------------------------------------------------------- 01 HERO
            Curto, como o brief pede: promessa, prova do material e convite.
            O mockup do Checklist é a prova visual do que está sendo oferecido
            — e some no celular, onde ocuparia uma tela inteira entre a
            promessa e o botão, empurrando a conversão para baixo da dobra. */}
        <section className="relative overflow-hidden bg-fundo">
          <div className="faixa grid items-center gap-x-16 gap-y-12 pt-[clamp(3rem,6vw,5rem)] pb-[clamp(4rem,8vw,6.5rem)] lg:grid-cols-[1.04fr_0.96fr]">
            <div className="max-w-[620px]">
              <Apoios itens={lp1.hero.apoio} />

              <h1 className="tipo-headline mt-7 text-azul-escuro">{lp1.hero.titulo}</h1>

              <p className="tipo-corpo mt-7 max-w-[560px] text-pedra">{lp1.hero.texto}</p>

              <BotaoFormulario className="mt-10">{lp1.cta}</BotaoFormulario>
            </div>

            <ChecklistMockup className="hidden max-w-[400px] lg:ml-auto lg:block" />
          </div>
        </section>

        {/* ----------------------------------- 02 NÃO COMECE PELA RENTABILIDADE */}
        <Secao className="border-t border-linha">
          <div className="max-w-[760px]">
            <Titulo>{lp1.rentabilidade.titulo}</Titulo>

            <div className="mt-9 flex flex-col gap-6">
              {lp1.rentabilidade.paragrafos.map((texto, i) => (
                <Paragrafo key={texto.slice(0, 24)} texto={texto} delay={i * 80} />
              ))}
            </div>

            <Tese className="mt-12">{lp1.rentabilidade.tese}</Tese>
          </div>
        </Secao>

        {/* -------------------------------------------------- 03 AS 7 PERGUNTAS
            Lista numerada, sem ícone nenhum — o brief pede exatamente isso. O
            fundo escuro marca que este é o miolo da página. */}
        <Secao tom="escuro">
          <div className="max-w-[760px]">
            <Titulo tom="escuro">{lp1.perguntas.titulo}</Titulo>
            <Paragrafo
              tom="escuro"
              texto={lp1.perguntas.texto}
              className="mt-6 max-w-[560px]"
            />
          </div>

          <ol className="mt-14 flex flex-col">
            {lp1.perguntas.itens.map((item, i) => (
              <Reveal
                key={item.pergunta}
                as="li"
                delay={i * 70}
                className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-white/12 py-7 last:border-b sm:grid-cols-[auto_minmax(0,26rem)_1fr] sm:gap-x-10"
              >
                <span className="tipo-numero pt-[6px] text-dourado-claro">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="text-[17px] leading-[1.35] font-normal tracking-[-0.01em] text-white sm:text-[19px]">
                  {item.pergunta}
                </h3>

                {/* no celular a explicação desce para a segunda linha da grade,
                    alinhada com a pergunta e não com o número */}
                <p className="col-start-2 tipo-corpo-curto text-pedra-claro sm:col-start-3 sm:pt-[3px]">
                  {item.texto}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-14">
            <BotaoFormulario tom="escuro">{lp1.cta}</BotaoFormulario>
          </Reveal>
        </Secao>

        {/* ------------------------------------------------------- 04 PARA QUEM
            Bloco curto e com respiro, como pedido: três linhas soltas, sem
            card nem ícone, e o fecho em destaque. */}
        <Secao>
          <div className="max-w-[820px]">
            <Titulo>{lp1.paraQuem.titulo}</Titulo>

            <ul className="mt-11 flex flex-col gap-7">
              {lp1.paraQuem.itens.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.slice(0, 24)}
                  delay={i * 90}
                  className="flex gap-5 tipo-corpo text-pedra"
                >
                  <span
                    aria-hidden
                    className="mt-[13px] h-[7px] w-[7px] shrink-0 rotate-45 border border-dourado"
                  />
                  {item}
                </Reveal>
              ))}
            </ul>

            <Tese className="mt-14">{lp1.paraQuem.fecho}</Tese>
          </div>
        </Secao>

        {/* ------------------------------------------------------ 05 CONVERSÃO
            O último convite, para quem leu a página inteira. O bloco continua
            existindo mesmo com o formulário em janela: é ele que dá o motivo
            de clicar, e o botão sozinho não daria. */}
        <Secao id="receber" tom="escuro" cantoDots="superior-direito">
          <div className="max-w-[720px]">
            <Titulo tom="escuro">{lp1.formulario.titulo}</Titulo>

            <p className="tipo-lead mt-7 text-pedra-claro">{lp1.formulario.subtitulo}</p>

            <p className="tipo-corpo mt-6 text-pedra-claro">{lp1.formulario.texto}</p>

            <Reveal className="mt-11">
              <BotaoFormulario tom="escuro">{lp1.cta}</BotaoFormulario>
            </Reveal>
          </div>
        </Secao>

        {/* ------------------------------------------------------ 06 FECHAMENTO */}
        <LpFooter
          titulo={lp1.fechamento.marca}
          tese={lp1.fechamento.tese}
          aviso={lp1.fechamento.aviso}
        />
      </main>
    </FormularioProvider>
  );
}
