"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Rolagem com inércia na página inteira.
 *
 * O Lenis não substitui a barra de rolagem: ele continua chamando o scroll
 * nativo a cada quadro, só interpolado. É o que mantém funcionando o parallax
 * do hero, a troca de superfície do header e os `IntersectionObserver` das
 * entradas — todos leem `window.scrollY`.
 *
 * Não monta para quem pede menos movimento: aí a rolagem é a do sistema.
 */
export function ScrollSuave() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const raiz = document.documentElement;

    // o `scroll-behavior: smooth` do CSS brigaria com a interpolação: cada
    // scrollTo do Lenis seria animado duas vezes. Ele fica só para o caminho
    // sem JS, e volta na limpeza.
    raiz.classList.remove("scroll-smooth");

    // mesma parada das âncoras em CSS (scroll-padding-top), lida da fonte para
    // as duas nunca divergirem
    const altura =
      parseFloat(getComputedStyle(raiz).getPropertyValue("--header-altura")) ||
      52;

    const lenis = new Lenis({
      autoRaf: true,
      // quanto menor, mais longo o deslize; 0.1 é o ponto em que o movimento
      // ainda responde ao gesto
      lerp: 0.1,
      anchors: { offset: -(altura + 40) },
    });

    return () => {
      lenis.destroy();
      raiz.classList.add("scroll-smooth");
    };
  }, []);

  return null;
}
