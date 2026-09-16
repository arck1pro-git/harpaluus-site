"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  /** Opcional: filetes decorativos são revelados sem conteúdo interno. */
  children?: ReactNode;
  /** Elemento renderizado (padrão: div). */
  as?: ElementType;
  className?: string;
  /** Atraso em ms para escalonar a entrada de itens vizinhos. */
  delay?: number;
  /** Classe base da animação: entrada de conteúdo ou desenho de filete. */
  variant?: "reveal" | "linha-desenha" | "linha-desenha-y";
  id?: string;
};

/**
 * Um observador para a página inteira, não um por elemento.
 *
 * A LP02 sozinha renderiza 54 `Reveal`. Enquanto cada instância criava o
 * próprio `IntersectionObserver`, montar a página significava instanciar 54
 * observadores e registrar 54 alvos — trabalho de thread principal concentrado
 * exatamente na hidratação, que é quando o celular ainda está tentando pintar
 * o topo da página.
 *
 * Todas as instâncias sempre usaram o mesmo `threshold` e o mesmo
 * `rootMargin`, então um observador compartilhado dá o mesmo comportamento
 * visual: o callback recebe as entradas de todos os alvos e só precisa saber
 * qual elemento entrou em tela.
 */
let observador: IntersectionObserver | null = null;

function observadorCompartilhado() {
  if (observador) return observador;
  if (typeof IntersectionObserver === "undefined") return null;

  observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        // escrevemos direto no DOM: nenhum estado de React participa disso, e
        // é o que evita 54 re-renders durante a hidratação
        (entrada.target as HTMLElement).dataset.visible = "true";
        observador?.unobserve(entrada.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  return observador;
}

/**
 * Revela o conteúdo quando ele entra na viewport (fade + 16px de deslocamento).
 * O efeito é puramente CSS — aqui só alternamos o data-attribute.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  variant = "reveal",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = observadorCompartilhado();

    // Sem IntersectionObserver o conteúdo já nasce visível.
    if (!obs) {
      node.dataset.visible = "true";
      return;
    }

    obs.observe(node);
    return () => obs.unobserve(node);
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      /* Estático: quem troca para "true" é o observador, direto no DOM. Como
         o React nunca re-renderiza este nó, não há divergência de hidratação
         — e o CSS só revela em `[data-visible="true"]`. */
      data-visible="false"
      className={`${variant} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
