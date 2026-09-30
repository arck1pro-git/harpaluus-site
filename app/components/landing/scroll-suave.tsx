"use client";

import { useEffect } from "react";

/**
 * Rolagem com inércia na página inteira.
 *
 * O Lenis não substitui a barra de rolagem: ele continua chamando o scroll
 * nativo a cada quadro, só interpolado. É o que mantém funcionando o parallax
 * do hero, a troca de superfície do header e os `IntersectionObserver` das
 * entradas — todos leem `window.scrollY`.
 *
 * Só monta com mouse (`pointer: fine`) e para quem não pediu menos movimento.
 * No toque o Lenis não suaviza nada — a rolagem do celular já é a nativa, com
 * a inércia do sistema —, mas o loop dele rodava a cada quadro do mesmo
 * jeito: ~400 ms de CPU no celular do Lighthouse, sem efeito nenhum na tela.
 * Por isso também o `import()` dinâmico: no celular o código do Lenis nem
 * chega a baixar. Sem ele, as âncoras continuam suaves pelo
 * `scroll-behavior: smooth` e param no lugar certo pelo `scroll-padding-top`
 * do CSS.
 */
export function ScrollSuave() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const raiz = document.documentElement;
    let lenis: { destroy(): void } | undefined;
    let desmontado = false;

    import("lenis").then(({ default: Lenis }) => {
      if (desmontado) return;

      // o `scroll-behavior: smooth` do CSS brigaria com a interpolação: cada
      // scrollTo do Lenis seria animado duas vezes. Ele fica só para o caminho
      // sem Lenis, e volta na limpeza.
      raiz.classList.remove("scroll-smooth");

      // mesma parada das âncoras em CSS (scroll-padding-top), lida da fonte
      // para as duas nunca divergirem
      const altura =
        parseFloat(getComputedStyle(raiz).getPropertyValue("--header-altura")) || 52;

      lenis = new Lenis({
        autoRaf: true,
        // quanto menor, mais longo o deslize; 0.1 é o ponto em que o movimento
        // ainda responde ao gesto
        lerp: 0.1,
        anchors: { offset: -(altura + 40) },
      });
    });

    return () => {
      desmontado = true;
      lenis?.destroy();
      raiz.classList.add("scroll-smooth");
    };
  }, []);

  return null;
}
