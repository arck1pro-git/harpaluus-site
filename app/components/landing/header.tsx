"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { TRACO } from "./icones";
import { logo, nav } from "./site-config";

/** Rolagem (px) a partir da qual o header troca de estado. */
const LIMITE_SCROLL = 80;

/**
 * Header flutuante com glassmorphism muito sutil.
 * Sobre o hero: vidro translúcido escuro, logo e links em branco.
 * Ao rolar: vidro branco translúcido, logo e links em grafite.
 */
export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    let frame = 0;

    function aplicar() {
      frame = 0;
      setRolou(window.scrollY > LIMITE_SCROLL);
    }

    function aoRolar() {
      // 1 atualização por frame em vez de 1 por evento de scroll
      if (!frame) frame = requestAnimationFrame(aplicar);
    }

    aplicar(); // respeita a posição atual (ex.: reload no meio da página)
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // O logo.png não é transparente: traz um fundo sólido #f5f4f0 (--color-fundo).
  // A barra usa exatamente esse tom para o logo se fundir com o header.
  // Ao rolar, a opacidade cai a 50% no header inteiro — se fosse só no
  // background, o retângulo do PNG continuaria opaco e apareceria como mancha.
  const estado = rolou ? "opacity-50 backdrop-blur-xl" : "opacity-100";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-grafite/[0.07] bg-fundo transition-[opacity,backdrop-filter] duration-700 ease-out ${estado}`}
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-[9px] md:px-10">
        <a href="#hero" className="block no-underline" aria-label={logo.alt}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            className="h-[30px] w-auto"
          />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(item.externo
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-[11px] leading-none font-medium tracking-[0.14em] text-grafite/70 uppercase no-underline transition-colors duration-500 hover:text-grafite"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          className="text-grafite transition-colors duration-500 md:hidden"
        >
          {aberto ? (
            <X size={18} strokeWidth={TRACO} />
          ) : (
            <Menu size={18} strokeWidth={TRACO} />
          )}
        </button>
      </div>

      {aberto ? (
        <nav className="flex flex-col gap-5 bg-fundo px-6 pb-8 md:hidden">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setAberto(false)}
              {...(item.externo
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-[12px] leading-none font-medium tracking-[0.14em] text-grafite/75 uppercase no-underline"
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
