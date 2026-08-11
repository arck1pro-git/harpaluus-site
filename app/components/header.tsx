"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** rolagem (px) até o header atingir a opacidade mínima */
const DISTANCIA_FADE = 400;
/** opacidade mínima — abaixo disso o menu fica ilegível */
const OPACIDADE_MINIMA = 0.35;

export default function Header() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        let frame = 0;

        function aplicar() {
            frame = 0;
            if (!ref.current) return;
            const progresso = Math.min(window.scrollY / DISTANCIA_FADE, 1);
            ref.current.style.opacity = String(
                1 - progresso * (1 - OPACIDADE_MINIMA)
            );
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

    return (
        <header
            ref={ref}
            className="fixed top-0 left-0 right-0 z-[100] flex items-stretch h-16 bg-linha border-b border-linha"
        >

            {/* linhas diagonais à esquerda */}
            <div
                className="flex-[0.12] rounded-lg border border-linha bg-fundo bg-listras"
            />

            {/* container do logo (largura reduzida) */}
            <div className="flex flex-1 items-center overflow-hidden rounded-lg border border-linha bg-fundo px-10">
                <Image src="/logo.png" alt="Logo" width={120} height={40} className="h-9 w-auto object-contain" priority />
            </div>

            <ul className="flex w-auto items-center gap-9 rounded-lg border border-linha bg-fundo px-7">
                <li><a href="#" className="text-[11px]  uppercase text-verde-escuro font-medium no-underline transition-colors hover:text-dourado">Sobre</a></li>
                <li><a href="#" className="text-[11px]  uppercase text-verde-escuro font-medium no-underline transition-colors hover:text-dourado">Parceiros</a></li>
                <li><a href="#" className="text-[11px]  uppercase text-verde-escuro font-medium no-underline transition-colors hover:text-dourado">Lançamento</a></li>
            </ul>

            {/* espacinho que sobra na direita */}
            <div
                className="flex-[0.12] rounded-lg border border-linha bg-fundo bg-listras"
            />
        </header>
    );
}
