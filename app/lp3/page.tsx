import type { Metadata } from "next";
import Image from "next/image";

import {
  jsonLd,
  organizacao,
  paginaWeb,
  site,
  trilha,
} from "../components/landing/dados-estruturados";
import { hero, logoClaro, marca } from "../components/landing/site-config";
import { ROTA_LP3 } from "../components/lp/lp-config";
import { MetaViuConteudo } from "../components/lp/meta-pixel";
import { CtaLp3 } from "../components/lp3/cta";
import { FaqLp3 } from "../components/lp3/faq";
import { FormularioLp3 } from "../components/lp3/formulario";
import { RodapeLp3 } from "../components/lp3/rodape";
import { SimuladorScp } from "../components/lp3/simulador";

/**
 * LP 03 — Investimento em SCP, marca Amaan.
 *
 * Página longa de conversão, feita para tráfego pago: apresenta a SCP como a
 * forma de o investidor virar sócio das incorporações da Amaan, com o retorno
 * da operação, a garantia real, o mercado de Porto Belo, um simulador e as
 * perguntas frequentes, e fecha num formulário de qualificação.
 *
 * A copy está aqui na página, e não em `lp-config.ts` como a das LP01/LP02,
 * porque não veio de um brief: o markup (quebras, destaques em dourado,
 * negritos) faz parte do texto, e a página ainda não tem versão aprovada.
 * Só as opções do formulário moram em `lp-config.ts`, porque o servidor as
 * confere.
 *
 * O formulário sai pela mesma Server Action das outras LPs (CRM Chroma + API
 * de Conversões do Meta), com os eventos do Pixel com sufixo `_lp3`.
 */

const TITULO = "Investimento em SCP no litoral catarinense";
const DESCRICAO =
  "Seja sócio de incorporações da Amaan no litoral catarinense por meio de uma SCP, com retorno prefixado em contrato, rendimento isento de IR e garantia real em imóveis registrados em cartório.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: ROTA_LP3 },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: ROTA_LP3,
    /* declarar `openGraph` na página substitui o objeto inteiro do layout —
       sem esta linha o card sai sem o nome do site (ver a LP02) */
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
  paginaWeb({ caminho: ROTA_LP3, titulo: TITULO, descricao: DESCRICAO }),
  trilha({ caminho: ROTA_LP3, titulo: "Investimento em SCP" })
);

/** O render oficial do Tourmaline Tower: vertical, para a coluna alta do hero. */
const IMAGEM_HERO = {
  src: "/fotos/tourmaline3.jpg",
  alt: "Tourmaline Tower, empreendimento da Amaan em Porto Belo, iluminado ao anoitecer",
};

const DESTAQUES = [
  { numero: "200%", texto: "do capital aportado em garantia, com imóveis registrados em cartório" },
  { numero: "0% IR", texto: "sobre o rendimento: o valor do contrato é o valor que você recebe" },
  { numero: "R$50k", texto: "de aporte mínimo para participar" },
];

/* ⚠️ Dados de mercado com fonte: conferir de novo na data de publicação. */
const INDICADORES = [
  {
    numero: "+132%",
    texto: "foi a valorização do metro quadrado em Porto Belo nos últimos dois anos.",
    fonte: "Fonte: DWV Inteligência de Mercado",
  },
  {
    numero: "#1",
    texto: "Porto Belo teve o maior VGV lançado do Brasil em 2024: R$ 11,45 bilhões.",
    fonte: "Fonte: ABRAINC/GeoBrain",
  },
  {
    numero: "R$ 13,47 bi",
    texto: "em VGV estão sendo desenvolvidos hoje no litoral catarinense.",
    fonte: "Fonte: DWV Inteligência de Mercado",
  },
  {
    numero: "100x",
    texto: "foi quanto o mercado imobiliário de Porto Belo cresceu em quatro anos.",
    fonte: "Fonte: ABRAINC/GeoBrain",
  },
];

const PERGUNTAS = [
  {
    pergunta: "O que é uma SCP?",
    resposta:
      "É a Sociedade em Conta de Participação, prevista nos artigos 991 a 996 do Código Civil. Nela, a AMAAN é a sócia ostensiva, que conduz o negócio em nome próprio, e o investidor é o sócio participante, que entra com o capital e participa do resultado da operação.",
  },
  {
    pergunta: "Como o meu capital fica protegido?",
    resposta:
      "A participação tem três camadas de garantia: o contrato de SCP, regido pelo Código Civil; unidades futuras do próprio empreendimento, que somam 200% do valor aportado; e um imóvel físico da incorporadora, reservado como garantia em seu nome.",
  },
  {
    pergunta: "O rendimento é mesmo isento de Imposto de Renda?",
    resposta:
      "Sim. O resultado da SCP chega ao sócio participante dentro das regras legais que isentam esse tipo de rendimento — não é uma brecha, é a forma correta de estruturar a operação. O valor previsto em contrato é o valor que você recebe.",
  },
  {
    pergunta: "Qual a diferença entre receber todo mês e no final?",
    resposta: (
      <>
        No modelo <strong>Mensal</strong>, o rendimento é pago mês a mês ao longo do prazo
        contratado. No modelo <strong>Final</strong>, capital e rendimento são pagos juntos no
        vencimento — e, como o dinheiro fica mais tempo na operação, a taxa aplicada é maior.
      </>
    ),
  },
  {
    pergunta: "Qual é o aporte mínimo?",
    resposta:
      "R$ 50 mil. Para aportes maiores, as condições podem ser negociadas diretamente com a equipe da AMAAN.",
  },
  {
    pergunta: "Preciso entender de mercado imobiliário?",
    resposta:
      "Não. A AMAAN conduz a incorporação inteira — terreno, projeto, aprovações, obra, gestão e venda das unidades. Você participa do resultado sem precisar operar no mercado.",
  },
  {
    pergunta: "Quem é a AMAAN?",
    resposta:
      "Uma incorporadora de Porto Belo, SC. Identificamos oportunidades, desenvolvemos produtos imobiliários, estruturamos e executamos incorporações e criamos Empreendimentos Vivos: prédios pensados para continuar servindo as pessoas e produzindo valor depois da entrega.",
  },
];

export default function Lp3() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: dadosEstruturados }}
      />

      <main id="conteudo">
        {/* ═══════ HERO ═══════ */}
        <section className="hero" id="inicio" aria-labelledby="hero-titulo">
          {/* Coluna esquerda — Texto */}
          <div className="hero-copy">
            <div className="hero-logo">
              <Image
                src={logoClaro.src}
                alt={marca}
                width={logoClaro.width}
                height={logoClaro.height}
                loading="eager"
                /* a largura exibida (ver `.hero-logo img` em lp3.css): sem
                   isto o Next servia o arquivo de 1920/3840 px */
                sizes="(max-width: 480px) 240px, 288px"
              />
            </div>

            <h1 className="hero-h1" id="hero-titulo">
              <span className="accent">
                Seja sócio de
                <br /> incorporações
              </span>
              <br />
              no litoral catarinense,
              <br />
              com <span className="accent">até 3% ao mês</span>
              <br />
              <span className="accent">isento de IR.</span>
            </h1>

            <div className="hero-divider" aria-hidden />

            {/* Só no celular: a imagem entre o título e o texto, na largura
                da coluna (a tela menos o respiro lateral de 1,75rem). `eager`
                porque no celular ela está na primeira tela; no desktop a caixa
                some, e o `sizes` de 1px faz o navegador buscar a menor versão
                do arquivo, de poucos bytes. */}
            <div className="hero-midia-inline">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                loading="eager"
                sizes="(max-width: 960px) calc(100vw - 3.5rem), 1px"
                style={{ objectPosition: hero.image.position }}
              />
            </div>

            <p className="hero-sub">
              Por meio de uma SCP, você participa do resultado dos empreendimentos da AMAAN em Porto
              Belo, com garantia real de 200% do valor investido em imóveis registrados em cartório.
            </p>

            <CtaLp3>Quero conhecer a SCP</CtaLp3>
          </div>

          {/* Coluna direita — o empreendimento, e a LCP do desktop: por isso
              `eager` e prioridade alta. Some no celular (ver acima), onde o
              `sizes` de 1px reduz o pedido à menor versão do arquivo. */}
          <div className="hero-img-box">
            <Image
              src={IMAGEM_HERO.src}
              alt={IMAGEM_HERO.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 960px) 1px, 50vw"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
        </section>

        <div className="gold-rule" aria-hidden />

        {/* ═══════ O QUE É A SCP ═══════ */}
        <section className="scp-section" id="scp" aria-labelledby="scp-titulo">
          <div className="section-inner">
            <div className="section-eyebrow" aria-hidden>
              <span className="eyebrow-line" />
              Como funciona
            </div>

            <h2 className="section-h2" id="scp-titulo">
              Investir em <span className="accent">SCP</span>
            </h2>
            <p className="section-lead">
              O caminho para entrar no mercado imobiliário pelo lado de quem constrói.
            </p>

            <div className="scp-body-grid">
              <div className="scp-body">
                <p>
                  A <strong>Sociedade em Conta de Participação (SCP)</strong> é um formato previsto no
                  Código Civil em que dois lados se unem em torno de um negócio: a AMAAN, como sócia
                  ostensiva, conduz a incorporação; você, como sócio participante, entra com o capital
                  e recebe a sua parte do resultado.
                </p>
                <p>
                  Na prática, o seu dinheiro trabalha na etapa em que o valor imobiliário é criado —
                  terreno, projeto, aprovação, obra e venda —, e não na compra de uma unidade pronta. O
                  retorno é prefixado em contrato e acompanha a performance do empreendimento.
                </p>
              </div>

              <div className="scp-body">
                <p>
                  Cada participação tem <strong>lastro em imóveis</strong>: a garantia equivale a 200%
                  do capital aportado, em unidades do próprio empreendimento, com registro em
                  cartório. É uma camada de proteção que aplicações como CRI, FII ou debêntures não
                  oferecem da mesma maneira.
                </p>
                <p>
                  O rendimento, entre <strong>1,5% e 3% ao mês</strong>, é isento de Imposto de Renda:
                  a isenção decorre da forma como a SCP é estruturada, dentro da lei.
                </p>
              </div>
            </div>

            <div className="scp-highlights" aria-label="Destaques da SCP">
              {DESTAQUES.map((item) => (
                <div key={item.numero} className="scp-hl">
                  <div className="scp-hl-number">{item.numero}</div>
                  <div className="scp-hl-label">{item.texto}</div>
                </div>
              ))}
            </div>

            <div className="scp-cta">
              <CtaLp3>Quero entender a SCP</CtaLp3>
            </div>
          </div>
        </section>

        <div className="gold-rule" aria-hidden />

        {/* ═══════ O MERCADO ═══════ */}
        <section className="litoral-section" id="mercado" aria-labelledby="mercado-titulo">
          <div className="litoral-grid">
            {/* A foto ocupa a altura toda da coluna esquerda e sangra pela borda */}
            <div className="litoral-img-box">
              <Image
                src="/fotos/porto-belo.jpg"
                alt="Vista aérea da orla de Porto Belo, Santa Catarina"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
              />
              <div className="litoral-img-label" aria-hidden>
                Porto Belo · SC
              </div>
            </div>

            <div className="litoral-content">
              <div className="section-eyebrow" aria-hidden>
                <span className="eyebrow-line" />
                Onde a AMAAN atua
              </div>

              <h2 className="section-h2" id="mercado-titulo">
                Um mercado em
                <br />
                <span className="accent">plena expansão</span>
              </h2>

              <div className="litoral-stats" aria-label="Dados do mercado imobiliário de Porto Belo">
                {INDICADORES.map((item) => (
                  <div key={item.numero} className="stat-box">
                    <div className="stat-number">{item.numero}</div>
                    <div className="stat-label">{item.texto}</div>
                    <div className="stat-source">{item.fonte}</div>
                  </div>
                ))}
              </div>

              <p className="litoral-text">
                É nesse cenário que a AMAAN desenvolve os seus empreendimentos. Com a SCP, você acessa o
                crescimento do litoral catarinense por dentro das incorporações, com retorno definido
                em contrato e garantia real sobre o capital.
              </p>

              <CtaLp3>Quero investir no litoral</CtaLp3>
            </div>
          </div>
        </section>

        <div className="gold-rule" aria-hidden />

        {/* ═══════ SIMULADOR ═══════ */}
        <section className="simulator-section" id="simulador" aria-labelledby="sim-titulo">
          <div className="section-inner">
            <div className="simulator-header">
              <div className="section-eyebrow" aria-hidden>
                <span className="eyebrow-line" />
                Simulador SCP
                <span className="eyebrow-line" />
              </div>
              <h2 className="section-h2" id="sim-titulo">
                Simule o seu
                <br />
                <span className="accent">retorno</span>
              </h2>
              <p className="section-lead">
                Veja quanto o seu capital pode render antes de falar com a nossa equipe.
              </p>
            </div>

            <SimuladorScp />

            <p className="sim-disclaimer">
              Simulação ilustrativa, com base nas taxas praticadas nas operações de SCP da AMAAN.
              <br />
              Rentabilidade passada não garante resultado futuro. Valores arredondados.
            </p>

            <div className="simulator-cta">
              <CtaLp3>Quero investir</CtaLp3>
            </div>
          </div>
        </section>

        <div className="gold-rule" aria-hidden />

        {/* ═══════ FAQ ═══════ */}
        <section className="faq-section" id="faq" aria-labelledby="faq-titulo">
          <div className="section-inner">
            <div className="faq-grid">
              <div className="faq-sidebar">
                <div className="section-eyebrow" aria-hidden>
                  <span className="eyebrow-line" />
                  Perguntas frequentes
                </div>
                <h2 className="section-h2" id="faq-titulo">
                  O que você
                  <br />
                  <span className="accent">precisa saber</span>
                </h2>
                <p>
                  Não encontrou o que procurava? Deixe seus dados no formulário e a equipe da AMAAN
                  fala com você.
                </p>
                <CtaLp3>Falar com a equipe comercial</CtaLp3>
              </div>

              <FaqLp3 itens={PERGUNTAS} />
            </div>

            <div className="faq-bottom">
              <CtaLp3>Quero falar com a equipe</CtaLp3>
            </div>
          </div>
        </section>

        <div className="gold-rule" aria-hidden />

        {/* ═══════ FORMULÁRIO ═══════ */}
        <section className="cta-section" id="formulario" aria-labelledby="form-titulo">
          <div className="section-inner">
            <div className="section-eyebrow eyebrow-center" aria-hidden>
              <span className="eyebrow-line" />
              Próximo passo
              <span className="eyebrow-line" />
            </div>

            <h2 className="section-h2" id="form-titulo">
              Garanta a sua participação
              <br />
              no <span className="accent">litoral de SC</span>
            </h2>

            <p className="cta-sub">
              Deixe seus dados e um especialista da AMAAN entra em contato para apresentar as
              operações disponíveis.
            </p>

            <FormularioLp3 />
          </div>
        </section>
      </main>

      <RodapeLp3 />

      {/* ViewContent: a pessoa chegou ao fim da página */}
      <MetaViuConteudo origem="lp3-scp" />
    </>
  );
}
