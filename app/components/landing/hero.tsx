"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { CtaLink } from "./cta-link";
import { hero } from "./site-config";

/** Fator do parallax: quanto a imagem desloca em relação à rolagem. */
const PARALLAX = 0.18;

/**
 * Hero da home: fala da incorporadora, não de um empreendimento.
 *
 * A entrada é encenada — a foto assenta de 1.045 para 1 enquanto filete,
 * headline, texto e CTA sobem em cascata. Nada acontece em menos de 1s: a
 * sensação de calma vem da duração, não do movimento.
 */
export function Hero() {
  const imagem = useRef<HTMLDivElement>(null);
  const indicador = useRef<HTMLAnchorElement>(null);
  const [emCena, setEmCena] = useState(false);

  // Um quadro depois da montagem: garante que o estado inicial (foto ampliada,
  // texto deslocado) chegou a ser pintado antes de a transição começar.
  useEffect(() => {
    const id = requestAnimationFrame(() => setEmCena(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const node = imagem.current;
    if (!node) return;

    const reduzido = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduzido) return;

    let frame = 0;

    function aplicar() {
      frame = 0;
      if (!node) return;
      // só desloca enquanto o hero está em tela
      const y = Math.min(window.scrollY, window.innerHeight);
      node.style.transform = `translate3d(0, ${y * PARALLAX}px, 0)`;
      // o convite a rolar perde a razão de existir assim que o usuário rola
      if (indicador.current) {
        indicador.current.style.opacity = window.scrollY > 40 ? "0" : "1";
      }
    }

    function aoRolar() {
      if (!frame) frame = requestAnimationFrame(aplicar);
    }

    aplicar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="hero"
      data-cena={emCena}
      className="relative h-[92svh] max-h-[900px] min-h-[600px] w-full overflow-hidden bg-verde-escuro"
    >
      <div ref={imagem} className="absolute inset-0 will-change-transform">
        <div className="cena-imagem h-full w-full">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: hero.image.position }}
          />
        </div>
      </div>

      {/* véu discreto: só o suficiente para o texto branco respirar */}
      <div className="absolute inset-0 bg-linear-to-t from-verde-escuro/80 via-verde-escuro/20 to-verde-escuro/35" />

      <div className="faixa relative z-10 flex h-full flex-col justify-end pb-[clamp(120px,17vh,168px)]">
        <div className="max-w-[640px]">
          <span className="cena-filete block h-px w-[52px] bg-dourado/70" />

          <h1
            className="cena tipo-display mt-8 text-white"
            style={{ "--cena-delay": "220ms" } as React.CSSProperties}
          >
            {hero.titulo}
          </h1>

          <p
            className="cena tipo-corpo mt-7 max-w-[480px] text-white/70"
            style={{ "--cena-delay": "480ms" } as React.CSSProperties}
          >
            {hero.texto}
          </p>

          <div
            className="cena mt-11"
            style={{ "--cena-delay": "720ms" } as React.CSSProperties}
          >
            <CtaLink href={hero.cta.href} tone="claro">
              {hero.cta.label}
            </CtaLink>
          </div>
        </div>
      </div>

      {/* filete vertical com um brilho que desce continuamente.
          Dois elementos de propósito: o de fora faz a entrada em cena, o de
          dentro some conforme a rolagem — se fosse um só, o opacity inline
          escrito pelo scroll atropelaria a transição de entrada. */}
      <div
        className="cena absolute bottom-0 left-1/2 z-10 -translate-x-1/2"
        style={{ "--cena-delay": "1100ms" } as React.CSSProperties}
      >
        <a
          ref={indicador}
          href={hero.cta.href}
          aria-label="Ir para o conteúdo"
          className="group flex flex-col items-center pb-[52px] transition-opacity duration-700 ease-out"
        >
          <span className="filete-rolagem relative h-[64px] w-px overflow-hidden bg-white/20 text-white/90 transition-colors duration-500 group-hover:bg-white/35" />
        </a>
      </div>
    </section>
  );
}
