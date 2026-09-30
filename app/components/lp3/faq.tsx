"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Acordeão das perguntas frequentes: um item aberto por vez, e clicar no que
 * já está aberto fecha.
 */
export function FaqLp3({
  itens,
}: {
  itens: readonly { pergunta: string; resposta: ReactNode }[];
}) {
  const [aberto, setAberto] = useState<number | null>(null);
  const base = useId();

  return (
    <ul className="faq-list" role="list">
      {itens.map((item, i) => {
        const estaAberto = aberto === i;
        const idResposta = `${base}-r${i + 1}`;

        return (
          <li key={item.pergunta} className={`faq-item${estaAberto ? " open" : ""}`}>
            <button
              className="faq-btn"
              type="button"
              aria-expanded={estaAberto}
              aria-controls={idResposta}
              onClick={() => setAberto(estaAberto ? null : i)}
            >
              {item.pergunta}
              <span className="faq-icon" aria-hidden>
                +
              </span>
            </button>
            <div className="faq-answer" id={idResposta} role="region">
              {item.resposta}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
