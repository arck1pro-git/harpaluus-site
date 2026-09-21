import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ComDestaque, ComDestaqueClaro } from "../landing/com-destaque";
import { Dots, type Canto } from "../landing/dots";
import { TRACO } from "../landing/icones";
import { Reveal } from "../landing/reveal";
import { hero } from "../landing/site-config";

/**
 * Peças de composição das duas LPs do Funil 1.
 *
 * O sistema é o mesmo da home (mesma faixa, mesmo ritmo, mesma escala
 * tipográfica de `globals.css`), mas o repertório aqui é menor de propósito:
 * os briefs pedem "clareza, espaço, leitura rápida" e proíbem excesso de
 * efeitos, contadores e selos. Cada bloco abre direto no título, sem etiqueta
 * de seção por cima, e se compõe com três elementos: título, texto e tese.
 */

type Tom = "claro" | "escuro";

/* --------------------------------------------------------- FUNDO DO HERO */

/**
 * A foto do hero da home, atrás do hero das duas LPs.
 *
 * Mesma imagem e mesma pilha de véus de `landing/hero.tsx`, lendo o mesmo
 * `hero.image` do `site-config`: quem chega pelo anúncio vê a abertura do
 * site, não uma página que só diz ser da mesma incorporadora. Trocar a foto
 * da home troca a das LPs junto, que é o ponto.
 *
 * Os dois véus fazem trabalhos diferentes e por isso são dois: o preto baixa
 * o brilho do pôr do sol na foto inteira, e o degradê do azul da marca fecha
 * embaixo, onde o texto se apoia. Um só, em qualquer das duas formas, ou
 * deixaria o texto sem base ou apagaria a foto até virar fundo chapado.
 *
 * Sem o parallax da home: lá a foto ocupa a tela inteira e o deslocamento tem
 * curso para acontecer. Aqui o bloco tem a altura do conteúdo, e o mesmo
 * efeito só faria a imagem tremer no começo da rolagem.
 *
 * Vai como primeiro filho de um `<section>` com `relative`; o conteúdo vem
 * depois, com `relative z-10`, para passar por cima dos véus.
 */
export function FundoHero() {
  return (
    <>
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        /* LCP das duas páginas: é a primeira coisa pintada e está no topo do
           body. `preload` é o nome do `priority` a partir do Next 16. */
        preload
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: hero.image.position }}
      />

      {/* sombra sobre a foto inteira, antes de qualquer texto entrar */}
      <div className="absolute inset-0 bg-black/55" />

      {/* véu do azul da marca, mais fechado embaixo: é onde o texto se apoia */}
      <div className="absolute inset-0 bg-linear-to-t from-azul-escuro/80 via-azul-escuro/20 to-azul-escuro/35" />
    </>
  );
}

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
  fundo,
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
  /**
   * Peça que ocupa o bloco inteiro atrás do conteúdo — uma foto, um vídeo.
   * Ela já entra com os próprios véus (ver `FundoVideo`), porque a dosagem
   * depende do material: filmagem de dia pede mais véu que foto de pôr do
   * sol.
   *
   * Desliga a textura de bolinhas: as duas disputariam a mesma superfície, e
   * a textura existe justamente para dar superfície ao azul chapado quando
   * não há imagem nenhuma.
   *
   * Vai com `tom="escuro"`. Sem ele o texto continua azul-escuro e some
   * contra o fundo — o `tom` é o que troca a cor do conteúdo, e `fundo` não
   * tem como adivinhar a cor média do que foi passado.
   */
  fundo?: React.ReactNode;
  className?: string;
}) {
  const escuro = tom === "escuro";
  const cor = escuro ? "bg-azul-escuro text-white" : "bg-fundo text-azul-escuro";

  return (
    <section
      id={id}
      /* `overflow-clip` para o que estiver no fundo: o campo de bolinhas é
         maior que a maioria das seções e, ancorado num canto, transbordaria
         pelo lado oposto sem esse corte. Um `fundo` em `object-cover` não
         transborda, mas o corte é o que garante isso valendo para qualquer
         peça que venha a ser passada ali. */
      className={`ritmo-secao relative ${escuro || fundo ? "overflow-clip " : ""}${cor} ${className}`}
    >
      {/* Mesma textura das seções escuras da home, nas mesmas proporções —
          menor no celular, porque o campo é ancorado no canto e o raio da
          máscara acompanha o tamanho: 1040px numa tela de 390px cobriria
          tudo em vez de sugerir um canto. */}
      {escuro && !fundo && (
        <Dots
          canto={cantoDots}
          tone="claro"
          tamanho="h-[520px] w-[520px] md:h-[1040px] md:w-[1040px]"
        />
      )}

      {fundo}

      {/* `relative` para o conteúdo passar por cima da textura e do fundo. */}
      <div className="faixa relative">{children}</div>
    </section>
  );
}

/* ---------------------------------------------------------------- TÍTULO */

/**
 * Título de seção. `nivel` existe porque nem toda seção é um h2.
 *
 * Teve uma `escala` que trocava `tipo-secao` por `tipo-headline`, para a
 * seção cujo título era uma frase inteira. Essa frase deixou de ser título
 * (ver a 07 da LP02) e a opção saiu junto: enquanto existisse, convidaria a
 * repetir o mesmo — resolver texto comprido demais para um título mexendo no
 * corpo dele.
 */
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
      className={`tipo-secao ${
        tom === "escuro" ? "text-white" : "text-azul-escuro"
      } ${className}`}
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
