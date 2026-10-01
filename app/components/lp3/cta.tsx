"use client";

import type { ReactNode } from "react";

import { rastrearAbertura } from "../lp/meta-pixel";

/**
 * `AbriuFormulario_lp3`, uma vez por visita à página.
 *
 * Aqui o formulário não abre numa janela: ele está no fim da página, e muita
 * gente chega até ele rolando, sem clicar em CTA nenhum. Por isso conta o que
 * vier primeiro — o clique num CTA ou o primeiro foco num campo (ver
 * `FormularioLp3`) —, e só uma vez: seis CTAs levando ao mesmo formulário não
 * são seis aberturas.
 *
 * A marca fica na própria seção do formulário, e não numa variável do
 * módulo: voltar à LP03 por navegação interna monta uma seção nova, e a
 * visita nova volta a contar.
 */
export function abrirFormularioLp3() {
  const secao = document.getElementById("formulario");
  if (secao?.dataset.abriu) return;
  if (secao) secao.dataset.abriu = "true";
  rastrearAbertura("lp3-scp");
}

/** Botão de CTA da LP03. Todos levam ao formulário no fim da página. */
export function CtaLp3({ children }: { children: ReactNode }) {
  return (
    <a href="#formulario" className="btn" onClick={abrirFormularioLp3}>
      {children}
    </a>
  );
}
