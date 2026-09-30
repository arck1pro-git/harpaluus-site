"use client";

import type { ReactNode } from "react";

import { rastrearAbertura } from "../lp/meta-pixel";

/**
 * Botão de CTA da LP03. Todos levam ao formulário no fim da página, e todos
 * contam como `AbriuFormulario_lp3` no Pixel — o mesmo
 * evento que o clique num CTA dispara na LP01 e na LP02.
 */
export function CtaLp3({ children }: { children: ReactNode }) {
  return (
    <a href="#formulario" className="btn" onClick={() => rastrearAbertura("lp3-scp")}>
      {children}
    </a>
  );
}
