/**
 * Escala tipográfica da home, num lugar só.
 *
 * Cada família tem um trabalho fixo: Playfair, no corte normal, em todo
 * título (o h1 do hero, os h2 de seção, o nome do empreendimento, o nome de
 * cada camada em Pilares), Inter em tudo que se lê. O itálico só aparece no
 * trecho em dourado dos títulos (`TituloComDestaque`). Títulos no
 * peso 400 — é o tamanho que dá a hierarquia, não o negrito — e o texto
 * corrido também no 400: o corte light fica para trás porque, abaixo de 20px,
 * ele cansa a leitura.
 *
 * Cada nível fica pelo menos 1,3× acima do seguinte no desktop: h1 72px, h2
 * 52px, nome do empreendimento 34px, abertura 24px, corpo 16px. Antes o h1
 * (64px) e os h2 (60px) quase se igualavam, e o título da página não se
 * distinguia do título de uma seção.
 *
 * Os h2 da home vêm em caixa alta no texto (`site-config.ts`), por isso o
 * entreletras deles abre um pouco em vez de fechar: maiúscula apertada perde
 * o desenho. O piso de 26px no celular é o que faz "EMPREENDIMENTOS" caber
 * numa tela de 320px.
 */

const PLAYFAIR = "font-[family-name:var(--font-playfair)] font-normal text-balance";

/** h1 do hero, em caixa mista. */
export const TITULO_HERO = `${PLAYFAIR} text-[length:clamp(2.5rem,1.25rem+4.6vw,4.5rem)] leading-[1.05] tracking-[-0.02em]`;

/** h2 de seção, em caixa alta. */
export const TITULO_SECAO = `${PLAYFAIR} text-[length:clamp(1.625rem,0.95rem+2.8vw,3.25rem)] leading-[1.08] tracking-[0.02em]`;

/**
 * h2 de seção escrito como frase, em caixa mista (o do cartão AMAAN Invest).
 * No mesmo teto dos h2 em caixa alta (52px), com o entreletras fechado, como
 * o h1. No celular parte de 32px, um pouco acima dos outros h2: a caixa mista
 * é visualmente menor que a alta no mesmo corpo.
 */
export const TITULO_SECAO_FRASE = `${PLAYFAIR} text-[length:clamp(2rem,1.2rem+2.6vw,3.25rem)] leading-[1.1] tracking-[-0.02em]`;

/** Nome de um empreendimento. */
export const TITULO_ITEM = `${PLAYFAIR} text-[length:clamp(1.625rem,1.3rem+1vw,2.125rem)] leading-[1.15] tracking-[-0.015em]`;

/** Frase de abertura: o texto do hero e o lead de cada seção. */
export const ABERTURA =
  "text-[length:clamp(1.25rem,1.05rem+0.6vw,1.5rem)] leading-[1.45] font-normal tracking-[-0.01em] text-pretty";

/** Corpo de texto. No celular, justificado como no resto do site. */
export const CORPO = "text-base leading-[1.75] font-normal text-pretty max-md:justificado";
