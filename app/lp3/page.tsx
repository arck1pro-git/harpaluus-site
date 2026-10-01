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
import { FormularioLp3 } from "../components/lp3/formulario";
import { RodapeLp3 } from "../components/lp3/rodape";

/**
 * LP 03 — Captação de investidores, marca Amaan.
 *
 * Textos do roteiro `AMAAN_LP_Captacao_2_Secoes_Roteiro_Orientacoes_Designer`,
 * sobre o layout que a página já tinha: hero, benefícios (bloco claro),
 * seletividade (bloco com a foto de Porto Belo) e formulário. O fluxo é o
 * que o roteiro recomenda — hero → potencial → benefícios → seletividade →
 * formulário.
 *
 * Três regras do roteiro moldam o texto:
 * - a AMAAN aparece como incorporadora, não como plataforma financeira — e a
 *   sigla SCP não aparece na página, nem no título, nem no card do link;
 * - a promessa é sempre potencial, nunca garantia: toda alegação de
 *   resultado leva asterisco, e a nota fica perto dela, legível;
 * - só imagens oficiais de empreendimentos da AMAAN.
 *
 * O formulário sai pela mesma Server Action das outras LPs (CRM Chroma + API
 * de Conversões do Meta), com os eventos do Pixel com sufixo `_lp3`.
 */

/* Sem números no título, na descrição e no card do link: fora da página,
   a taxa apareceria sem o asterisco e a nota que a qualificam. */
const TITULO = "Investimento em incorporação imobiliária no litoral catarinense";
const DESCRICAO =
  "Invista no desenvolvimento de empreendimentos imobiliários da Amaan no litoral catarinense. O acesso às operações é seletivo: deixe seus dados para avaliarmos o seu perfil.";

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
  trilha({ caminho: ROTA_LP3, titulo: "Investimento em incorporação imobiliária" })
);

/** O render oficial do Tourmaline Tower: vertical, para a coluna alta do hero. */
const IMAGEM_HERO = {
  src: "/fotos/tourmaline3.jpg",
  alt: "Tourmaline Tower, empreendimento da Amaan em Porto Belo, iluminado ao anoitecer",
};

/** A faixa de prova rápida do hero: leitura secundária, mas evidente. */
const PARAMETROS = [
  { rotulo: "A partir de", valor: "R$ 50 mil" },
  { rotulo: "Prazos de", valor: "18, 24 ou 36 meses" },
  { rotulo: "Condições de", valor: "1,5% a 3% ao mês*" },
];

export default function Lp3() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: dadosEstruturados }}
      />

      <main id="conteudo">
        {/* ═══════ SEÇÃO 1 · HERO ═══════ */}
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
              Invista diretamente no <span className="accent">desenvolvimento</span> de
              empreendimentos imobiliários.
            </h1>

            <div className="hero-divider" aria-hidden />

            {/* Imagem inline apenas em telas de uma coluna com altura sobrando.
                O CTA tem prioridade nas telas menores. */}
            <div className="hero-midia-inline">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                loading="eager"
                sizes="(max-width: 960px) and (min-height: 1001px) min(440px, calc(100vw - 3.5rem)), 1px"
                style={{ objectPosition: hero.image.position }}
              />
            </div>

            <p className="hero-sub">
              Invista em incorporações da AMAAN no litoral catarinense, com{" "}
              <strong>potencial de dobrar o capital investido em até 3 anos.</strong>
            </p>

            <dl className="hero-params">
              {PARAMETROS.map((item) => (
                <div key={item.rotulo} className="hero-param">
                  <dt>{item.rotulo}</dt>
                  <dd>{item.valor}</dd>
                </div>
              ))}
            </dl>

            <CtaLp3>Quero conhecer uma oportunidade</CtaLp3>

           
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

        {/* ═══════ SEÇÃO 2 · VALOR PARA O INVESTIDOR ═══════ */}
        <section className="scp-section" id="oportunidade" aria-labelledby="valor-titulo">
          <div className="section-inner">
            <h2 className="section-h2" id="valor-titulo">
              Coloque seu capital para trabalhar em um dos{" "}
              <span className="accent">mercados imobiliários mais valorizados do Brasil.</span>
            </h2>
            <p className="section-lead">
              A AMAAN desenvolve empreendimentos no litoral de Santa Catarina e abre oportunidades
              para investidores participarem economicamente dessas incorporações.
            </p>

            <div className="scp-body-grid">
              <div className="scp-body rounded-lg">
                <h3 className="scp-body-title">Busque resultados maiores.</h3>
                <p>
                  Condições que podem variar de{" "}
                  <strong>1,5% a 3% ao mês</strong>, conforme valor, prazo e operação.
                </p>
              </div>

              <div className="scp-body rounded-lg">
                <h3 className="scp-body-title">Invista na economia real.</h3>
                <p>
                  Seu capital participa do
                  desenvolvimento de um <strong>empreendimento imobiliário real</strong>, com ativos
                  e garantias aplicáveis a cada operação.
                </p>
              </div>

              <div className="scp-body rounded-lg">
                <h3 className="scp-body-title">Participe onde o valor é criado.</h3>
                <p>
                  Participe economicamente da
                  operação que <strong>desenvolve e comercializa o empreendimento.</strong>
                </p>
              </div>

              <div className="scp-body rounded-lg">
                <h3 className="scp-body-title">Invista em uma região de destaque nacional.</h3>
                <p>
                  O litoral de Santa
                  Catarina concentra alguns dos{" "}
                  <strong>mercados imobiliários mais valorizados do Brasil</strong> e segue atraindo
                  moradores, investidores e novos empreendimentos.
                </p>
              </div>
            </div>

            <div className="scp-cta">
              <CtaLp3>Quero conhecer uma oportunidade</CtaLp3>
            </div>
          </div>
        </section>

        <div className="gold-rule" aria-hidden />

        {/* ═══════ SELETIVIDADE ═══════ */}
        <section className="litoral-section" id="seletivo" aria-labelledby="seletivo-titulo">
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
              <h2 className="section-h2" id="seletivo-titulo">
                O acesso às operações
                <br />
                <span className="accent">é seletivo</span>
              </h2>

              <p className="litoral-text">
                A AMAAN não abre suas oportunidades indiscriminadamente ao mercado. Antes de
                apresentar uma operação, buscamos entender{" "}
                <strong>quem é o investidor e se existe compatibilidade dos dois lados.</strong>
              </p>

              <p className="litoral-text">
                <strong>
                  Não buscamos apenas capital. Buscamos investidores que façam sentido para construir
                  uma relação com a AMAAN.
                </strong>
              </p>
            </div>
          </div>
        </section>

        <div className="gold-rule" aria-hidden />

        {/* ═══════ FORMULÁRIO ═══════ */}
        <section className="cta-section" id="formulario" aria-labelledby="form-titulo">
          <div className="section-inner">
            <h2 className="section-h2" id="form-titulo">
              Solicite acesso a <span className="accent">uma oportunidade</span>
            </h2>

            <p className="cta-sub">
              Preencha seus dados para entendermos seu perfil e avaliarmos se existe compatibilidade
              com uma das operações disponíveis.
            </p>

            {/* ViewContent: a pessoa leu o texto de conversão. Fica aqui, e
                não no fim da página como na LP01 e na LP02: o formulário vem
                antes do rodapé, e quem preenche não precisa rolar até lá —
                o ViewContent sairia depois do Lead, ou nem sairia. */}
            <MetaViuConteudo origem="lp3-scp" />

            <FormularioLp3 />

           
          </div>
        </section>
      </main>

      <RodapeLp3 />
    </>
  );
}
