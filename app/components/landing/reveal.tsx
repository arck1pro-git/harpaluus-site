"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Sem IntersectionObserver o conteúdo já nasce visível. Escrevemos direto no
    // DOM porque não há re-render depois deste caminho.
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-visible={visible}
      className={`${variant} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
