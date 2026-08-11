"use client";

import { useEffect, useRef } from "react";

const formatador = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * Horário local do escritório. O valor é escrito direto no DOM em vez de virar
 * estado: no servidor não há hora do cliente, e renderizar uma no HTML causaria
 * divergência de hidratação a cada minuto virado.
 */
export function LocalTime() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function atualizar() {
      if (ref.current) ref.current.textContent = formatador.format(new Date());
    }

    atualizar();
    const id = setInterval(atualizar, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="font-mono text-[10px] tracking-[0.16em] text-white/45 uppercase">
      Porto Belo <span className="text-dourado">•</span>{" "}
      <span ref={ref}>--:--</span> BRT
    </p>
  );
}
