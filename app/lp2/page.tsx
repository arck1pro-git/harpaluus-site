import type { Metadata } from "next";
import Image from "next/image";

import { ComDestaqueClaro } from "../components/landing/com-destaque";
import {
  jsonLd,
  organizacao,
  paginaWeb,
  site,
  trilha,
} from "../components/landing/dados-estruturados";
import { Dots } from "../components/landing/dots";
import { Reveal } from "../components/landing/reveal";
import { BotaoFormulario, FormularioProvider } from "../components/lp/form-modal";
import type { TextosSucesso } from "../components/lp/formulario";
import { lp2, marca, ROTA_LP2 } from "../components/lp/lp-config";
import { LpFooter } from "../components/lp/lp-footer";
import { LpHeader } from "../components/lp/lp-header";
import { Paragrafo, Secao, Tese, Titulo } from "../components/lp/lp-ui";

/**
 * LP 02 — Participação em incorporação via SCP (Funil 1).
 *
 * Escrita sobre o modelo completo `AMAAN_LP2_Modelo_Completo_6_Perguntas`,
 * que substituiu o brief educacional anterior e mudou a função da página: ela
 * não ensina mais o que é SCP para depois pedir um contato morno. Apresenta
 * uma operação real e pede para o visitante analisá-la.
 *
 * A ordem dos blocos é a hierarquia que o modelo determina: oportunidade,
 * mercado, mecanismo, pessoas, AMAAN, timing, perfil, prova e conversão.
 * Cada seção responde a uma das seis perguntas do modelo (O quê, Onde, Por
 * quê, Como, Quem, Quando), mas isso fica no título de cada uma, não numa
 * etiqueta por cima: o título já é a resposta.
 *
 * O bloco de risco do modelo ("O que precisa estar claro antes da decisão")
 * saiu da página a pedido do cliente, junto com a nota do potencial projetado
 * no hero. Um bloco do modelo continua sem subir na tela: ver o comentário em
 * "08 QUANDO" — ele é bloqueado por exigência do próprio modelo, não por
 * estar inacabado.
 *
 * A copy inteira vem de `lp-config.ts`; o que está aqui é a composição.
 */

const TITULO =
  "Participação em incorporação via SCP no litoral catarinense | Amaan";

/* O número não entra em metadata nem no card do link: fora da página ele
   apareceria sozinho, sem nada que impeça a leitura de "taxa contratada" —
   que é exatamente o que a regra do modelo existe para evitar. */
const DESCRICAO =
  "Conheça uma operação de incorporação da Amaan estruturada para investidores: o que é a participação via SCP, onde a operação acontece, como o resultado é produzido, quem executa e o que analisar antes da decisão.";

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
  titulo: "Solicitação registrada.",
  texto:
    "Nosso time entrará em contato pelo WhatsApp informado para apresentar a operação, suas premissas, prazo, riscos e regras de participação. Nenhuma decisão é esperada nessa conversa.",
};

/* O bloco dinâmico do "QUANDO" só existe se os três campos estiverem
   preenchidos com informação documentada — ver `lp2.quando.janela`. Meio
   preenchido não sobe: um "Prazo da operação: —" ao lado de dois números
   reais lê como dado, e o modelo proíbe exibir qualquer coisa que a operação
   não sustente documentalmente. */
const janelaValidada = lp2.quando.janela.itens.every((item) => item.valor);

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
            "O primeiro scroll precisa mostrar três coisas sem ambiguidade:
            incorporação + litoral catarinense + potencial projetado."

            A foto entra por causa disso: é render oficial de empreendimento,
            que é o que prova incorporação e litoral de uma vez — e é o
            oposto do repertório de banco, bolsa ou fintech que o modelo
            proíbe. O qualificador e o disclaimer que ficavam encostados no
            título saíram a pedido do cliente, e o asterisco do h1 saiu com
            eles: sem a nota, ele não teria onde aterrissar. */}
        <section className="relative overflow-hidden bg-azul-escuro text-white">
          <Dots
            canto="superior-direito"
            tone="claro"
            tamanho="h-[520px] w-[520px] md:h-[860px] md:w-[860px]"
          />

          <div className="faixa relative grid items-center gap-x-16 gap-y-14 py-[clamp(4rem,8vw,6.5rem)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-[640px]">
              <h1 className="tipo-headline text-white">{lp2.hero.titulo}</h1>

              <Reveal as="p" delay={160} className="tipo-corpo mt-8 max-w-[580px] text-pedra-claro">
                {lp2.hero.texto}
              </Reveal>

              <Reveal delay={280} className="mt-10">
                <BotaoFormulario tom="escuro">{lp2.cta}</BotaoFormulario>
              </Reveal>
            </div>

            {/* some no celular: entre a promessa e o botão, ocuparia uma tela
                inteira e empurraria a conversão para baixo da dobra */}
            <Reveal
              delay={200}
              className="relative hidden aspect-[4/5] w-full overflow-hidden lg:block"
            >
              <Image
                src={lp2.hero.imagem.src}
                alt={lp2.hero.imagem.alt}
                fill
                /* `priority` foi depreciado no Next 16; `preload` é o nome
                   novo do mesmo comportamento — `<link rel="preload">` no
                   head, que é o que esta imagem precisa por ser a LCP do
                   desktop e só ser descoberta no meio do body. */
                preload
                /* O `100vw` do fallback fazia o celular baixar a versão de
                   tela cheia de uma imagem que está em `hidden lg:block` —
                   invisível, e mesmo assim paga. Com `1px` o navegador elege
                   o menor candidato do srcset abaixo de 1024px, e a foto
                   volta ao tamanho real a partir daí. */
                sizes="(min-width: 1024px) 46vw, 1px"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------------- 02 O QUE
            A oportunidade, antes de qualquer explicação de estrutura: o
            modelo não quer uma aula sobre SCP, quer que a pessoa entenda que
            existe um outro lado da mesa. O fecho fala de contrato e das
            condições que ele fixa, não da sigla. */}
        <Secao id="a-oportunidade">
          <div className="max-w-[760px]">
            <Titulo>{lp2.oQue.titulo}</Titulo>

            <Paragrafo texto={lp2.oQue.abertura} className="mt-9" />

            <div className="mt-6 flex flex-col gap-6">
              {lp2.oQue.paragrafos.map((texto, i) => (
                <Paragrafo key={texto.slice(0, 24)} texto={texto} delay={i * 80} />
              ))}
            </div>

            <Tese className="mt-12">{lp2.oQue.tese}</Tese>

            <Paragrafo texto={lp2.oQue.fecho} className="mt-12" />
          </div>
        </Secao>

        {/* ------------------------------------------------------------ 03 ONDE
            O mercado como contexto, nunca como promessa: cada indicador sobe
            com a própria fonte e data colada, e a ressalva do modelo fecha o
            bloco antes que alguém leia os números como valorização futura.

            A foto do lugar entra como painel da coluna direita, de fundo, com
            o texto na esquerda. `items-stretch` é o que faz o painel ter a
            altura da coluna de texto em vez de uma proporção fixa: a foto
            acompanha o bloco, e não o contrário. No celular a grade desmonta
            e ela vira uma faixa 4/3 abaixo do texto — em coluna única, ao
            lado de nada, um painel de altura livre viraria uma tela inteira
            de foto entre o parágrafo e os indicadores. */}
        <Secao className="border-t border-linha">
          <div className="grid items-stretch gap-x-14 gap-y-12 lg:grid-cols-[1fr_0.78fr]">
            <div className="max-w-[640px]">
              <Titulo>{lp2.onde.titulo}</Titulo>

              <Tese className="mt-9">{lp2.onde.tese}</Tese>

              <Paragrafo texto={lp2.onde.abertura} className="mt-11" />
            </div>

            <Reveal
              delay={160}
              className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[440px]"
            >
              <Image
                src={lp2.onde.imagem.src}
                alt={lp2.onde.imagem.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-px bg-linha md:grid-cols-3">
            {lp2.onde.indicadores.map((indicador, i) => (
              <Reveal
                as="li"
                key={indicador.fonte}
                delay={i * 110}
                className="flex flex-col bg-fundo px-7 py-9 sm:px-8"
              >
                <p className="font-[family-name:var(--font-playfair)] text-[34px] leading-[1.05] text-azul-escuro">
                  {indicador.dado}
                </p>

                <p className="tipo-corpo-curto mt-5 flex-1 text-pedra">{indicador.texto}</p>

                {/* a fonte é parte do dado, não nota de rodapé: o modelo pede
                    fonte e data visíveis junto do número */}
                <p className="mt-6 border-t border-linha pt-4 text-[12px] leading-[1.6] font-light text-cinza-texto">
                  {indicador.fonte}
                </p>
              </Reveal>
            ))}
          </ul>

          <Paragrafo texto={lp2.onde.fecho} className="mt-12 max-w-[760px]" />
        </Secao>

        {/* -------------------------------------------------------- 04 POR QUE
            O motivo econômico da participação, e a contrapartida dele — os
            dois parágrafos andam juntos de propósito: o primeiro dá o
            potencial, o segundo diz que ele não serve a todo perfil, e
            separar os dois viraria promessa. */}
        <Secao className="border-t border-linha">
          <div className="max-w-[760px]">
            <Titulo>{lp2.porQue.titulo}</Titulo>

            <div className="mt-9 flex flex-col gap-6">
              {lp2.porQue.paragrafos.map((texto, i) => (
                <Paragrafo key={texto.slice(0, 24)} texto={texto} delay={i * 80} />
              ))}
            </div>
          </div>

          <Reveal className="mt-12">
            <BotaoFormulario>{lp2.cta}</BotaoFormulario>
          </Reveal>
        </Secao>

        {/* ------------------------------------------------------------ 05 COMO
            O mecanismo econômico, e o bloco escuro do miolo: é aqui que a
            projeção deixa de ser número e vira uma cadeia de coisas que
            precisam acontecer. A tabela ETAPA × LÓGICA do modelo vira uma
            lista de linhas: no celular a lógica desce para baixo da etapa,
            alinhada com ela e não com o número. */}
        <Secao tom="escuro">
          <div className="max-w-[820px]">
            <Titulo tom="escuro">{lp2.como.titulo}</Titulo>

            <Tese tom="escuro" className="mt-9">
              {lp2.como.tese}
            </Tese>
          </div>

          <ol className="mt-14 flex flex-col">
            {lp2.como.etapas.map((item, i) => (
              <Reveal
                key={item.etapa}
                as="li"
                delay={i * 70}
                className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-white/12 py-7 last:border-b sm:grid-cols-[auto_minmax(0,16rem)_1fr] sm:gap-x-10"
              >
                <span className="tipo-numero pt-[6px] text-dourado-claro">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="text-[17px] leading-[1.35] font-normal tracking-[-0.01em] text-white sm:text-[19px]">
                  {item.etapa}
                </h3>

                <p className="tipo-corpo-curto col-start-2 text-pedra-claro sm:col-start-3 sm:pt-[3px]">
                  {item.logica}
                </p>
              </Reveal>
            ))}
          </ol>
        </Secao>

        {/* ------------------------------------------------------------ 06 QUEM
            Quem toma as decisões que transformam a tese em empreendimento.
            Sem foto por enquanto: o modelo pede imagem real de cada um em
            contexto de trabalho, e retrato genérico no lugar da pessoa é o
            tipo de enquadramento que ele proíbe. Quando as fotos existirem,
            basta preencher `foto` em `lp-config.ts`. */}
        <Secao className="border-t border-linha">
          <div className="max-w-[820px]">
            <Titulo>{lp2.quem.titulo}</Titulo>
          </div>

          <Reveal className="mt-12 border-t border-linha pt-10">
            <h3 className="tipo-label text-dourado-escuro">{lp2.quem.incorporadora.nome}</h3>

            <div className="mt-6 max-w-[760px]">
              <Paragrafo texto={lp2.quem.incorporadora.texto} />
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-px bg-linha md:grid-cols-2">
            {lp2.quem.pessoas.map((pessoa, i) => (
              <Reveal
                as="li"
                key={pessoa.nome}
                delay={i * 120}
                className="bg-fundo px-7 py-9 sm:px-9 sm:py-10"
              >
                {pessoa.foto && (
                  <div className="relative mb-7 aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={pessoa.foto.src}
                      alt={pessoa.foto.alt}
                      fill
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <h3 className="font-[family-name:var(--font-playfair)] text-[22px] leading-[1.2] text-azul-escuro">
                  {pessoa.nome}
                </h3>

                <p className="tipo-label mt-4 text-dourado-escuro">{pessoa.papel}</p>

                <p className="tipo-corpo mt-6 text-pedra">{pessoa.texto}</p>
              </Reveal>
            ))}
          </ul>

          <Tese className="mt-14">{lp2.quem.fecho}</Tese>
        </Secao>

        {/* ------------------------------------------------------ 07 POR QUE AMAAN
            A diferenciação, e o segundo bloco escuro: a autoridade nasce da
            incorporação, não de gestão financeira. É uma declaração só,
            centralizada e ocupando a seção inteira — sem parágrafos de apoio,
            sem tese e sem CTA, porque um bloco com um elemento só é o que dá
            a essa frase o peso de assinatura.

            `escala="headline"` porque a frase é longa: no corpo de
            `tipo-secao` ela passaria de uma tela no desktop. */}
        <Secao tom="escuro" cantoDots="superior-direito">
          <Titulo
            tom="escuro"
            escala="headline"
            className="mx-auto max-w-[900px] text-center text-balance"
          >
            <ComDestaqueClaro texto={lp2.porQueAmaan.titulo} />
          </Titulo>
        </Secao>

        {/* ---------------------------------------------------------- 08 QUANDO
            Timing real, sem urgência artificial — e o bloco dinâmico do
            modelo só sobe quando os três campos estiverem preenchidos com
            informação documentada (`lp2.quando.janela`). Enquanto não
            estiverem, a seção continua inteira e verdadeira: a janela existe
            porque a operação tem cronograma próprio, não porque um contador
            está correndo na tela. Nada de "últimas vagas" aqui. */}
        <Secao>
          <div className="max-w-[760px]">
            <Titulo>{lp2.quando.titulo}</Titulo>

            <Tese className="mt-9">{lp2.quando.tese}</Tese>

            <div className="mt-11 flex flex-col gap-6">
              {lp2.quando.paragrafos.map((texto, i) => (
                <Paragrafo key={texto.slice(0, 24)} texto={texto} delay={i * 80} />
              ))}
            </div>
          </div>

          {janelaValidada && (
            <div className="mt-14">
              <h3 className="tipo-label text-dourado-escuro">{lp2.quando.janela.titulo}</h3>

              <dl className="mt-7 grid gap-px bg-linha md:grid-cols-3">
                {lp2.quando.janela.itens.map((item, i) => (
                  <Reveal key={item.rotulo} delay={i * 100} className="bg-fundo px-7 py-8">
                    <dt className="tipo-corpo-curto text-pedra">{item.rotulo}</dt>
                    <dd className="mt-4 font-[family-name:var(--font-playfair)] text-[22px] leading-[1.25] text-azul-escuro">
                      {item.valor}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          )}

          <Paragrafo texto={lp2.quando.fecho} className="mt-12 max-w-[760px]" />
        </Secao>

        {/* ---------------------------------------------------------- 10 PERFIL
            Qualificação honesta: os dois cartões têm o mesmo peso gráfico
            porque o modelo quer que a pessoa se reconheça — inclusive do lado
            de fora. Uma LP que só sabe dizer para quem serve não qualifica
            ninguém. */}
        <Secao className="border-t border-linha">
          <div className="max-w-[760px]">
            <Titulo>{lp2.perfil.titulo}</Titulo>

            <Paragrafo texto={lp2.perfil.abertura} className="mt-9" />
          </div>

          <div className="mt-14 grid gap-px bg-linha md:grid-cols-2">
            {lp2.perfil.lados.map((lado, i) => (
              <Reveal
                key={lado.titulo}
                delay={i * 120}
                className="bg-fundo px-7 py-9 sm:px-9 sm:py-10"
              >
                <div className="flex items-start gap-4">
                  <span aria-hidden className="mt-[9px] h-px w-6 shrink-0 bg-dourado" />
                  <h3 className="tipo-label text-dourado-escuro">{lado.titulo}</h3>
                </div>

                <p className="tipo-corpo mt-6 text-pedra">{lado.texto}</p>
              </Reveal>
            ))}
          </div>

          <Tese className="mt-14">{lp2.perfil.tese}</Tese>
        </Secao>

        {/* ---------------------------------------------------- 11 PROVA SOCIAL
            ⚠️ Os três depoimentos em `lp-config.ts` são FICTÍCIOS, provisórios
            para fechar o layout. O modelo pede depoimento real, com nome,
            foto ou vídeo verdadeiro e o contexto real da relação com a AMAAN,
            e proíbe transformar experiência individual em promessa de
            rentabilidade — os textos provisórios já respeitam a segunda
            parte, mas não a primeira. Substituir antes de publicar; esvaziar
            `depoimentos` volta a esconder a seção. */}
        {lp2.prova.depoimentos.length > 0 && (
          <Secao className="border-t border-linha">
            <div className="max-w-[760px]">
              <Titulo>{lp2.prova.titulo}</Titulo>
            </div>

            <ul className="mt-14 grid gap-px bg-linha md:grid-cols-3">
              {lp2.prova.depoimentos.map((depoimento, i) => (
                <Reveal
                  as="li"
                  key={depoimento.nome}
                  delay={i * 110}
                  className="flex flex-col bg-fundo px-7 py-9 sm:px-8"
                >
                  {depoimento.foto && (
                    <div className="relative mb-7 aspect-square w-[72px] shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={depoimento.foto.src}
                        alt={depoimento.foto.alt}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <blockquote className="tipo-corpo flex-1 text-pedra">
                    {depoimento.texto}
                  </blockquote>

                  <p className="mt-7 border-t border-linha pt-5 text-[15px] font-normal text-azul-escuro">
                    {depoimento.nome}
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.6] font-light text-cinza-texto">
                    {depoimento.contexto}
                  </p>
                </Reveal>
              ))}
            </ul>
          </Secao>
        )}

        {/* ------------------------------------------------------- 12 CONVERSÃO
            O convite final recapitula as seis respostas antes de pedir os
            dados. É o fecho do modelo, e o último lugar da página em que o
            número aparece, já com a página inteira por trás dele. */}
        <Secao id="interesse" tom="escuro">
          <div className="max-w-[760px]">
            <Titulo tom="escuro">{lp2.formulario.titulo}</Titulo>

            <Paragrafo
              tom="escuro"
              texto={lp2.formulario.recap}
              className="mt-9 max-w-[700px]"
            />

            <Paragrafo
              tom="escuro"
              texto={lp2.formulario.texto}
              delay={80}
              className="mt-6 max-w-[700px]"
            />

            <Reveal className="mt-11">
              <BotaoFormulario tom="escuro">{lp2.cta}</BotaoFormulario>
            </Reveal>
          </div>
        </Secao>

        {/* -------------------------------------------------------- 13 FECHAMENTO
            Sem `aviso` e sem `tese`: o rodapé desta página fecha só com a
            assinatura e a identificação da pessoa jurídica. */}
        <LpFooter titulo={lp2.fechamento.marca} />
      </main>
    </FormularioProvider>
  );
}

