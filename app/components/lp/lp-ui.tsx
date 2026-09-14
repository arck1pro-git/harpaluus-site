import { ArrowRight } from "lucide-react";

import { ComDestaque, ComDestaqueClaro } from "../landing/com-destaque";
import { Dots, type Canto } from "../landing/dots";
import { TRACO } from "../landing/icones";
import { Reveal } from "../landing/reveal";

/**
 * Peças de composição das duas LPs do Funil 1.
 *
 * O sistema é o mesmo da home — mesma faixa, mesmo ritmo, mesma escala
 * tipográfica de `globals.css` —, mas o repertório aqui é menor de propósito:
 * os briefs pedem "clareza, espaço, leitura rápida" e proíbem excesso de
 * efeitos, contadores e selos. Cada bloco abre direto no título, sem etiqueta
 * de seção por cima, e se compõe com três elementos: título, texto e tese.
 */

type Tom = "claro" | "escuro";

/* ---------------------------------------------------------------- SEÇÃO */

/**
 * Bloco da página, com o ritmo vertical do site.
 *
 * `tom` é a cor do fundo, não do texto: "claro" é o branco padrão e "escuro"
 * é o azul-escuro da marca, reservado aos dois ou três momentos de virada de
 * cada página. Alternar demais transformaria a virada em listra.
 */
export function Secao({
  children,
  id,
  tom = "claro",
  cantoDots = "inferior-esquerdo",
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  tom?: Tom;
  /**
   * De qual canto parte a textura de bolinhas, nas seções escuras. Páginas
   * com mais de um bloco escuro alternam o canto: repetir o mesmo faz a
   * textura virar padrão de página em vez de acabamento do bloco.
   */
  cantoDots?: Canto;
  className?: string;
}) {
  const escuro = tom === "escuro";
  const fundo = escuro ? "bg-azul-escuro text-white" : "bg-fundo text-azul-escuro";

  return (
    <section
      id={id}
      /* `overflow-clip` só no escuro: o campo de bolinhas é maior que a
         maioria das seções e, ancorado num canto, transbordaria pelo lado
         oposto sem esse corte. */
      className={`ritmo-secao relative ${escuro ? "overflow-clip " : ""}${fundo} ${className}`}
    >
      {/* Mesma textura das seções escuras da home, nas mesmas proporções —
          menor no celular, porque o campo é ancorado no canto e o raio da
          máscara acompanha o tamanho: 1040px numa tela de 390px cobriria
          tudo em vez de sugerir um canto. */}
      {escuro && (
        <Dots
          canto={cantoDots}
          tone="claro"
          tamanho="h-[520px] w-[520px] md:h-[1040px] md:w-[1040px]"
        />
      )}

      {/* `relative` para o conteúdo passar por cima da textura. */}
      <div className="faixa relative">{children}</div>
    </section>
  );
}

/* ---------------------------------------------------------------- TÍTULO */

/** Título de seção. `nivel` existe porque nem toda seção é um h2. */
export function Titulo({
  children,
  tom = "claro",
  nivel: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  tom?: Tom;
  nivel?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Reveal
      as={Tag}
      className={`tipo-secao ${tom === "escuro" ? "text-white" : "text-azul-escuro"} ${className}`}
    >
      {children}
    </Reveal>
  );
}

/** Parágrafo de corpo, com o destaque « » já aplicado. */
export function Paragrafo({
  texto,
  tom = "claro",
  delay = 0,
  className = "",
}: {
  texto: string;
  tom?: Tom;
  delay?: number;
  className?: string;
}) {
  const cor = tom === "escuro" ? "text-pedra-claro" : "text-pedra";

  return (
    <Reveal as="p" delay={delay} className={`tipo-corpo ${cor} ${className}`}>
      {tom === "escuro" ? <ComDestaqueClaro texto={texto} /> : <ComDestaque texto={texto} />}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ TESE */

/**
 * A frase que cada bloco existe para deixar na cabeça de quem lê.
 *
 * Os briefs pedem destaque visual para essas frases; o destaque é escala e
 * espaço, com um filete dourado à esquerda — não caixa colorida nem selo.
 * Vai em `<p>` e não em heading: é conclusão do bloco, não título dele, e
 * promovê-la a heading bagunçaria a hierarquia que o leitor de tela anuncia.
 */
export function Tese({
  children,
  tom = "claro",
  className = "",
}: {
  children: React.ReactNode;
  tom?: Tom;
  className?: string;
}) {
  return (
    <Reveal className={`border-l border-dourado/45 pl-6 md:pl-8 ${className}`}>
      <p
        className={`tipo-lead font-[family-name:var(--font-playfair)] ${
          tom === "escuro" ? "text-white" : "text-azul-escuro"
        }`}
      >
        {children}
      </p>
    </Reveal>
  );
}

/* ------------------------------------------------------------------- CTA */

/**
 * Botão principal das LPs.
 *
 * Sólido, ao contrário do `CtaLink` editorial da home: aqui ele é a conversão
 * da página e precisa ser inequívoco. A seta aponta para baixo-direita porque
 * todo CTA destas páginas leva a uma âncora mais abaixo, nunca para fora.
 *
 * Área de toque de 52px, acima do mínimo de 44px — os briefs pedem que a
 * página funcione primeiro no celular.
 */
export function BotaoLP({
  href,
  children,
  tom = "claro",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  /** o tom do *fundo* onde o botão está apoiado */
  tom?: Tom;
  className?: string;
}) {
  const cores =
    tom === "escuro"
      ? "bg-white text-azul-escuro hover:bg-dourado-claro"
      : "bg-azul-escuro text-white hover:bg-azul-profundo";

  return (
    <a
      href={href}
      className={`group tipo-label inline-flex min-h-[52px] items-center justify-center gap-4 px-9 py-[18px] text-center no-underline transition-colors duration-300 ease-out ${cores} ${className}`}
    >
      {children}
      <ArrowRight
        size={16}
        strokeWidth={TRACO}
        aria-hidden
        className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-[3px]"
      />
    </a>
  );
}

/* --------------------------------------------------------------- APOIOS */

/**
 * Etiquetas curtas do hero ("Material gratuito · Leitura rápida"),
 * separadas por um ponto médio em vez de barra: menos ruído.
 */
export function Apoios({ itens, tom = "claro" }: { itens: string[]; tom?: Tom }) {
  const cor = tom === "escuro" ? "text-pedra-claro" : "text-pedra";

  return (
    <ul className={`tipo-label flex flex-wrap items-center gap-x-3 gap-y-2 ${cor}`}>
      {itens.map((item, i) => (
        <li key={item} className="flex items-center gap-3">
          {i > 0 && (
            <span aria-hidden className="h-[3px] w-[3px] rounded-full bg-dourado" />
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}
