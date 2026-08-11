"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { CtaLink } from "./cta-link";
import { hero } from "./site-config";

/** Fator do parallax: quanto a imagem desloca em relação à rolagem. */
const PARALLAX = 0.18;

/** Hero da home: fala da incorporadora, não de um empreendimento. */
export function Hero() {
  const imagem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = imagem.current;
    if (!node) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) return;

    let frame = 0;

    function aplicar() {
      frame = 0;
      if (!node) return;
      // só desloca enquanto o hero está em tela
      const y = Math.min(window.scrollY, window.innerHeight);
      node.style.transform = `translate3d(0, ${y * PARALLAX}px, 0)`;
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
      className="relative h-[92svh] max-h-[900px] min-h-[560px] w-full overflow-hidden bg-verde-escuro"
    >
      <div ref={imagem} className="absolute inset-0 will-change-transform">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: hero.image.position }}
        />
      </div>

      {/* véu discreto: só o suficiente para o texto branco respirar */}
      <div className="absolute inset-0 bg-linear-to-t from-verde-escuro/75 via-verde-escuro/20 to-verde-escuro/30" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1240px] flex-col justify-end px-6 pb-[150px] md:px-10 md:pb-[160px]">
        <div className="max-w-[620px]">
          <span className="block h-px w-[52px] bg-dourado/70" />

          <h1 className="mt-8 font-[family-name:var(--font-playfair)] text-4xl leading-[1.1] font-normal tracking-normal text-white md:text-6xl">
            {hero.titulo}
          </h1>

          <p className="mt-7 max-w-[460px] text-[13px] leading-[1.8] font-light text-white/65">
            {hero.texto}
          </p>

          <CtaLink href={hero.cta.href} tone="claro" className="mt-11">
            {hero.cta.label}
          </CtaLink>
        </div>
      </div>

      {/* filete vertical com um brilho que desce continuamente */}
      <a
        href={hero.cta.href}
        aria-label="Ir para o conteúdo"
        className="group absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center pb-[52px]"
      >
        <span className="relative h-[64px] w-px overflow-hidden bg-white/20 text-white/90 transition-colors duration-500 group-hover:bg-white/35 filete-rolagem" />
      </a>
    </section>
  );
}
