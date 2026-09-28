"use client";

import { useId, useRef } from "react";

import { Formulario, type TextosSucesso } from "./formulario";
import type { OrigemLead } from "./lead";
import { rastrearAbertura } from "./meta-pixel";

/**
 * O formulário direto na página, fora da janela — o do hero da LP02.
 *
 * Import estático, ao contrário do `form-modal.tsx`: aqui o formulário faz
 * parte da primeira tela, e carregá-lo só depois do JS deixaria a coluna vazia
 * até a hidratação e empurraria o layout quando ele chegasse.
 *
 * O `AbriuFormulario` que a janela manda no clique do CTA sai aqui no
 * primeiro foco em qualquer campo: sem ele o funil no Meta teria cadastro sem
 * abertura. Uma vez por visita à página, como o `ViewContent`.
 */
export function FormularioNaPagina({
  origem,
  titulo,
  rotuloEnvio,
  sucesso,
  aviso,
  className = "",
}: {
  origem: OrigemLead;
  titulo: string;
  rotuloEnvio: string;
  sucesso: TextosSucesso;
  aviso?: string;
  className?: string;
}) {
  const idTitulo = useId();
  const abriu = useRef(false);

  return (
    <section
      aria-labelledby={idTitulo}
      onFocus={() => {
        if (abriu.current) return;
        abriu.current = true;
        rastrearAbertura(origem);
      }}
      className={className}
    >
      {/* O nome acessível do bloco. O título que se vê fica no formulário,
          que o esconde na tela de sucesso — o mesmo arranjo da janela. */}
      <h2 id={idTitulo} className="sr-only">
        {titulo}
      </h2>

      <Formulario
        origem={origem}
        tom="escuro"
        titulo={titulo}
        rotuloEnvio={rotuloEnvio}
        sucesso={sucesso}
        aviso={aviso}
      />
    </section>
  );
}
