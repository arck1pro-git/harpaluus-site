"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { ROTA_PRIVACIDADE } from "./landing/site-config";

/**
 * Aviso de cookies, no layout raiz: aparece na primeira visita a qualquer
 * página do site — home, LPs e a própria Política de Privacidade.
 *
 * É um aviso, não um bloqueio: o Meta Pixel carrega do mesmo jeito, aceito ou
 * não (ver `meta-pixel-base.tsx`). Por isso tem um botão só. Um "Recusar"
 * que não desligasse nada seria pior do que nenhum.
 *
 * O "Entendi" fica gravado em `localStorage`, como a marca de lead enviado
 * (ver `lp/ja-enviou.ts`), e a pessoa não vê o aviso de novo. No servidor e
 * na hidratação ele não existe; entra logo depois, com o que o navegador
 * guardou — e quem já fechou nunca o vê piscar.
 */

const CHAVE = "amaan:aviso-cookies";

/* Reserva para quando o storage está bloqueado (aba anônima em alguns
   navegadores): sem ele o "Entendi" vale até a pessoa recarregar. */
let fechadoNaPagina = false;
const ouvintes = new Set<() => void>();

function jaFechou() {
  if (fechadoNaPagina) return true;
  try {
    return window.localStorage.getItem(CHAVE) !== null;
  } catch {
    return false;
  }
}

function fechar() {
  fechadoNaPagina = true;
  try {
    window.localStorage.setItem(CHAVE, new Date().toISOString());
  } catch {
    /* ver a reserva acima */
  }
  ouvintes.forEach((avisar) => avisar());
}

/* O evento `storage` é o "Entendi" dado em outra aba. */
function inscrever(avisar: () => void) {
  ouvintes.add(avisar);
  window.addEventListener("storage", avisar);
  return () => {
    ouvintes.delete(avisar);
    window.removeEventListener("storage", avisar);
  };
}

export function AvisoCookies() {
  const fechado = useSyncExternalStore(inscrever, jaFechou, () => true);

  if (fechado) return null;

  return (
    <section
      aria-label="Aviso de cookies"
      /* Faixa fina no pé da tela, e não um cartão: nas LPs um cartão cobria o
         CTA do hero. Acima do header (z-50); o formulário das LPs abre num
         <dialog>, na camada de topo do navegador, e cobre o aviso sem
         precisar de z-index. */
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-dourado/30 bg-azul-escuro/95 font-[family-name:var(--font-inter)] text-white backdrop-blur-md animate-[aviso-cookies-entra_700ms_var(--ease-cena)_800ms_both] motion-reduce:animate-none"
    >
      <div className="faixa flex items-center gap-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:gap-8">
        <p className="flex-1 text-[12px] leading-[1.55] font-light text-white/85 md:text-[13px]">
          Usamos cookies para medir visitas e anúncios. Saiba mais na nossa{" "}
          <Link
            href={ROTA_PRIVACIDADE}
            className="text-white underline decoration-dourado/70 underline-offset-4 transition-colors duration-300 hover:decoration-dourado"
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={fechar}
          className="tipo-label inline-flex h-10 shrink-0 items-center border border-dourado/60 bg-dourado/15 px-5 text-white transition-colors duration-300 ease-out hover:border-dourado hover:bg-dourado/30 md:px-7"
        >
          Entendi
        </button>
      </div>
    </section>
  );
}
