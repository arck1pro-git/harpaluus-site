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
import { MetaViuConteudo } from "../components/lp/meta-pixel";
import { FundoHero, Paragrafo, Secao, Tese, Titulo } from "../components/lp/lp-ui";

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
  titulo: "Obrigado!",
  texto: "Recebemos seus dados. Nossa equipe vai entrar em contato com você em breve.",
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
            promessa e o botão, empurrando a conversão para baixo da dobra.

            O fundo é a foto que abre a home (ver `FundoHero`): a página de
            anúncio abre com a mesma imagem do site, e quem clica reconhece
            de quem é a página antes de ler a promessa. O bloco era claro e
            ficou escuro por causa disso — título e texto em branco, botão no
            sólido branco (`tom="escuro"`). O mockup é o único que ganha com a
            troca sem mudar: papel claro que antes era card branco sobre fundo
            branco, e agora recorta contra a foto.

            No celular o hero ocupa a primeira tela inteira, como o da home.
            É `min-h`, não `h`: com altura fixa, o título longo somado ao
            texto e ao botão passaria de 100svh nos aparelhos mais baixos e
            seria cortado. E é `100svh` menos a altura do header — o header
            fica acima, em fluxo, então o `100svh` cheio jogaria o fim do hero
            para fora da dobra, que é o contrário do que a medida quer. `svh`
            e não `dvh`: a barra do navegador que aparece e some redimensiona
            o `dvh` no meio da rolagem, e o bloco inteiro pularia junto.

            A partir de `lg` a altura volta a ser a do conteúdo: na horizontal
            e no desktop, 100svh é uma faixa baixa e larga, e forçar o bloco a
            ela só afastaria o texto do botão. */}
        <section className="relative flex min-h-[calc(100svh-var(--header-altura))] flex-col justify-center overflow-hidden bg-azul-escuro text-white lg:block lg:min-h-0">
          <FundoHero />

          <div className="faixa relative z-10 grid items-center gap-x-16 gap-y-12 pt-[clamp(3rem,6vw,5rem)] pb-[clamp(4rem,8vw,6.5rem)] lg:grid-cols-[1.04fr_0.96fr]">
            <div className="max-w-[620px]">
              <h1 className="tipo-headline text-white">{lp1.hero.titulo}</h1>

              <p className="tipo-corpo mt-7 max-w-[560px] text-pedra-claro">{lp1.hero.texto}</p>

              <BotaoFormulario tom="escuro" className="mt-10">
                {lp1.cta}
              </BotaoFormulario>
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

        {/* ------------------------------------------------------- 03 PARA QUEM
            O miolo da página, e por isso o fundo escuro: sem a lista das 7
            perguntas, é aqui que quem lê se reconhece e decide continuar. É
            também onde fica o CTA do meio, que antes vivia naquela lista.

            Três colunas em vez de três linhas soltas: separadas, cada frase
            vira uma pessoa diferente. No celular voltam a ser uma coluna. */}
        <Secao tom="escuro">
          <div className="max-w-[760px]">
            <Titulo tom="escuro">{lp1.paraQuem.titulo}</Titulo>
          </div>

          {/* o filete entre as colunas é o próprio `gap` deixando o fundo
              aparecer: mesma peça da LP02, sem borda em cada card */}
          <ul className="mt-12 grid gap-px bg-white/12 md:grid-cols-3">
            {lp1.paraQuem.itens.map((item, i) => (
              <Reveal
                as="li"
                key={item.slice(0, 24)}
                delay={i * 90}
                className="bg-azul-escuro px-7 py-9 sm:px-9"
              >
                <span className="tipo-numero text-dourado-claro">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="mt-5 text-[17px] leading-[1.45] font-light text-white sm:text-[18px]">
                  {item}
                </p>
              </Reveal>
            ))}
          </ul>

          <Tese tom="escuro" className="mt-14">
            {lp1.paraQuem.fecho}
          </Tese>

          <Reveal className="mt-12">
            <BotaoFormulario tom="escuro">{lp1.cta}</BotaoFormulario>
          </Reveal>
        </Secao>

        {/* ------------------------------------------- 04 POR QUE ESTE CHECKLIST
            A pergunta que o bloco anterior deixa no ar: quem entregou a lista é
            a mesma parte interessada que um dia vai apresentar uma oportunidade.
            Responder isso antes do formulário é o que sustenta o cadastro.

            Volta ao claro entre os dois blocos escuros — a virada só funciona
            se o escuro não for o fundo padrão da página. */}
        <Secao>
          <div className="max-w-[760px]">
            <Titulo>{lp1.porQueChecklist.titulo}</Titulo>

            <div className="mt-9 flex flex-col gap-6">
              {lp1.porQueChecklist.paragrafos.map((texto, i) => (
                <Paragrafo key={texto.slice(0, 24)} texto={texto} delay={i * 80} />
              ))}
            </div>

            <Tese className="mt-12">{lp1.porQueChecklist.tese}</Tese>
          </div>
        </Secao>

        {/* ------------------------------------------------------ 05 CONVERSÃO
            O último convite, para quem leu a página inteira. O bloco continua
            existindo mesmo com o formulário em janela: é ele que dá o motivo
            de clicar, e o botão sozinho não daria. */}
        <Secao id="receber" tom="escuro" cantoDots="superior-direito">
          <div className="max-w-[720px]">
            <Titulo tom="escuro">{lp1.formulario.titulo}</Titulo>

            <p className="tipo-lead mt-7 text-pedra-claro">{lp1.formulario.texto}</p>

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

        {/* ViewContent: a pessoa chegou ao fim da página */}
        <MetaViuConteudo origem="lp1-checklist" />
      </main>
    </FormularioProvider>
  );
}
