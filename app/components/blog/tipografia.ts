/**
 * Escala tipográfica do blog, num lugar só: a lista e o artigo usam os mesmos
 * níveis, e cada família tem um trabalho fixo.
 *
 * - Playfair: tudo que é título (h1, h2 de seção, títulos dos artigos na
 *   lista, a chamada da lateral). Sempre no peso 400, com o entreletras
 *   fechado: é o tamanho que dá a hierarquia, não o negrito.
 * - Inter: tudo que se lê ou se opera (corpo, abertura, datas, índice,
 *   botões). Texto corrido no peso 400; nada de corte light abaixo de 20px.
 *
 * Cada nível fica pelo menos 1,3× acima do seguinte no desktop, e os títulos
 * quebram balanceados para não deixar uma palavra sozinha na última linha.
 */

const PLAYFAIR = "font-[family-name:var(--font-playfair)] font-normal text-balance";

/** h1 da lista do blog: a frase de abertura, a maior da página. */
export const TITULO_PAGINA = `${PLAYFAIR} text-[length:clamp(2.5rem,1.2rem+4.2vw,4.25rem)] leading-[1.06] tracking-[-0.02em]`;

/** h1 do artigo: títulos mais longos, por isso um degrau abaixo. */
export const TITULO_ARTIGO = `${PLAYFAIR} text-[length:clamp(2.25rem,1.25rem+3.3vw,3.75rem)] leading-[1.1] tracking-[-0.02em]`;

/** h2 de seção ("Continue lendo", a chamada final). */
export const TITULO_SECAO = `${PLAYFAIR} text-[length:clamp(2rem,1.25rem+2.4vw,3rem)] leading-[1.1] tracking-[-0.02em]`;

/** Título do artigo mais recente, em destaque no topo da lista. */
export const TITULO_DESTAQUE = `${PLAYFAIR} text-[length:clamp(1.875rem,1.3rem+1.9vw,2.75rem)] leading-[1.15] tracking-[-0.018em]`;

/** Título de cada artigo na lista. */
export const TITULO_CARTAO = `${PLAYFAIR} text-[length:clamp(1.5rem,1.25rem+0.85vw,2rem)] leading-[1.2] tracking-[-0.015em]`;

/** Título de artigo no "Continue lendo", um degrau abaixo do da lista. */
export const TITULO_CARTAO_COMPACTO = `${PLAYFAIR} text-[length:clamp(1.375rem,1.2rem+0.5vw,1.625rem)] leading-[1.25] tracking-[-0.012em]`;

/** Abertura: o resumo sob o h1 e o texto das chamadas. */
export const ABERTURA =
  "text-[length:clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-[1.6] font-normal text-pretty";

/** Resumo de cada artigo na lista. */
export const RESUMO = "text-base leading-[1.65] font-normal text-pretty";
