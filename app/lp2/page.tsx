import type { Metadata } from "next";

import { ComDestaqueClaro } from "../components/landing/com-destaque";
import {
  jsonLd,
  organizacao,
  paginaWeb,
  site,
  trilha,
} from "../components/landing/dados-estruturados";
import { Reveal } from "../components/landing/reveal";
import { FundoVideo } from "../components/lp/fundo-video";
import { BotaoFormulario, FormularioProvider } from "../components/lp/form-modal";
import type { TextosSucesso } from "../components/lp/formulario";
import { lp2, marca, ROTA_LP2 } from "../components/lp/lp-config";
import { LpFooter } from "../components/lp/lp-footer";
import { LpHeader } from "../components/lp/lp-header";
import { MetaViuConteudo } from "../components/lp/meta-pixel";
import { FundoHero, Paragrafo, Secao, Tese, Titulo } from "../components/lp/lp-ui";

/**
 * LP 02 — Participação em incorporação via SCP (Funil 1).
 *
 * Escrita sobre o modelo completo `AMAAN_LP2_Modelo_Completo_6_Perguntas`,
 * que substituiu o brief educacional anterior e mudou a função da página: ela
 * não ensina mais o que é SCP para depois pedir um contato morno. Apresenta
 * uma operação real e pede para o visitante analisá-la.
 *
 * A ordem dos blocos é a hierarquia que o modelo determina: oportunidade,
 * mercado, mecanismo, AMAAN, timing, perfil e conversão. Cada seção responde
 * a uma das perguntas do modelo, mas isso fica no título de cada uma, não
 * numa etiqueta por cima: o título já é a resposta.
 *
 * Três blocos do modelo não estão aqui, os três a pedido do cliente: o de
 * risco ("O que precisa estar claro antes da decisão"), junto com a nota do
 * potencial projetado no hero; a "06 QUEM", que apresentava a incorporadora e
 * os sócios; e a "11 DEPOIMENTOS". A numeração das seções ficou como estava,
 * com os buracos à vista — ela é a do modelo, não a da página, e renumerar
 * perderia a correspondência. Um quarto bloco continua sem subir na tela por
 * exigência do próprio modelo, não por estar inacabado: ver "08 QUANDO".
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
  titulo: "Cadastro recebido!",
  paragrafos: [
    "Obrigado pelo interesse em conhecer a oportunidade da AMAAN Incorporadora.",
    "Nossa equipe vai falar com você pelo WhatsApp em breve para apresentar a operação e tirar suas dúvidas.",
  ],
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
            eles: sem a nota, ele não teria onde aterrissar.

            Ela era um card de 4/5 na coluna da direita e virou o fundo do
            bloco inteiro (`FundoHero`), a mesma abertura da home — é a mesma
            foto nos dois lugares, então mantê-la também à direita seria
            repeti-la contra si mesma. Com a coluna da direita vazia, o hero
            voltou a ser uma coluna só, e a textura de bolinhas saiu junto:
            ela existe para dar superfície ao azul chapado das outras seções
            escuras, e sobre a foto vira ruído.

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

          <div className="faixa relative z-10 py-[clamp(4rem,8vw,6.5rem)]">
            <div className="max-w-[640px]">
              <h1 className="tipo-headline text-white">{lp2.hero.titulo}</h1>

              <Reveal as="p" delay={160} className="tipo-corpo mt-8 max-w-[580px] text-pedra-claro">
                {lp2.hero.texto}
              </Reveal>

              <Reveal delay={280} className="mt-10">
                <BotaoFormulario tom="escuro">{lp2.cta}</BotaoFormulario>
              </Reveal>
            </div>
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

            O lugar era uma foto num painel na coluna direita e virou o vídeo
            de fundo do bloco inteiro (`FundoVideo`) — a mesma aérea da orla,
            com movimento. Duas consequências, as duas de propósito:

            O bloco ficou escuro. É o `tom` que troca a cor do texto, e sem
            ele o azul-escuro do corpo sumiria contra a filmagem. Isso faz da
            LP02 uma página com quatro blocos escuros (hero, aqui, 08 e o
            formulário) onde antes havia três — o limite antes de a virada
            escura virar listra, e o motivo de não haver um quinto.

            O texto voltou a ocupar a largura toda, sem a coluna que existia
            só para segurar o painel da foto. Os indicadores são os mesmos
            cards, na versão escura da mesma peça que a LP01 usa em "para
            quem": o vão de `bg-white/12` é o filete entre eles. */}
        <Secao
          tom="escuro"
          fundo={
            <FundoVideo src={lp2.onde.video.src} poster={lp2.onde.video.poster} />
          }
        >
          <div className="max-w-[700px]">
            <Titulo tom="escuro">{lp2.onde.titulo}</Titulo>

            <Tese tom="escuro" className="mt-9">
              {lp2.onde.tese}
            </Tese>

            <Paragrafo tom="escuro" texto={lp2.onde.abertura} className="mt-11" />
          </div>

          <ul className="mt-14 grid gap-px bg-white/12 md:grid-cols-3">
            {lp2.onde.indicadores.map((indicador, i) => (
              <Reveal
                as="li"
                key={indicador.fonte}
                delay={i * 110}
                className="flex flex-col bg-azul-escuro px-7 py-9 sm:px-8"
              >
                <p className="font-[family-name:var(--font-playfair)] text-[34px] leading-[1.05] text-white">
                  {indicador.dado}
                </p>

                <p className="tipo-corpo-curto mt-5 flex-1 text-pedra-claro">
                  {indicador.texto}
                </p>

                {/* a fonte é parte do dado, não nota de rodapé: o modelo pede
                    fonte e data visíveis junto do número */}
                <p className="mt-6 border-t border-white/12 pt-4 text-[12px] leading-[1.6] font-light text-pedra-claro/80">
                  {indicador.fonte}
                </p>
              </Reveal>
            ))}
          </ul>

          <Paragrafo
            tom="escuro"
            texto={lp2.onde.fecho}
            className="mt-12 max-w-[760px]"
          />
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

        {/* ------------------------------------------------------ 07 POR QUE AMAAN
            A diferenciação, e o segundo bloco escuro: a autoridade nasce da
            incorporação, não de gestão financeira. É uma declaração só,
            centralizada e ocupando a seção inteira — sem parágrafos de apoio,
            sem tese e sem CTA, porque um bloco com um elemento só é o que dá
            a essa frase o peso de assinatura.

            Ela saiu do `<h2>` e do corpo de headline em que estava — os
            dois eram o mesmo engano. Tratada como título, uma frase de 300
            caracteres ia para escala de manchete (31px no celular, 50px no
            desktop) com entrelinha de 1.14, que existe para três palavras; e
            o leitor de tela ainda a anunciava como o cabeçalho da seção.
            Agora é o que sempre foi: um parágrafo, em `tipo-declaracao`,
            com ar entre as linhas.

            `text-pretty` no lugar de `text-balance`: passando de poucas
            linhas o balanceamento desiste e não faz nada, enquanto o defeito
            que sobra num bloco centralizado é a última linha órfã — que é
            justamente o que `pretty` resolve. */}
        <Secao tom="escuro" cantoDots="superior-direito">
          <Reveal
            as="p"
            className="tipo-declaracao mx-auto max-w-[900px] text-center text-pretty text-white"
          >
            <ComDestaqueClaro texto={lp2.porQueAmaan.titulo} />
          </Reveal>
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

        {/* ViewContent: a pessoa chegou ao fim da página */}
        <MetaViuConteudo origem="lp2-interesse" />
      </main>
    </FormularioProvider>
  );
}

