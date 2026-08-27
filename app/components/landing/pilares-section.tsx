"use client";

import { useEffect, useRef } from "react";
import {
  Activity,
  ConciergeBell,
  DraftingCompass,
  Gauge,
  ScanFace,
  Sunset,
} from "lucide-react";

import { Dots } from "./dots";
import { TRACO } from "./icones";
import { pilares, type PilarIcone } from "./site-config";
import { Reveal } from "./reveal";

/**
 * O ícone de cada camada sai da própria descrição, não do rótulo: biometria
 * na entrada (Tecnologia), medição individual (Sustentabilidade), rotina
 * resolvida no prédio (Serviços), monitoramento contínuo (Gestão).
 */
const icones: Record<PilarIcone, typeof DraftingCompass> = {
  arquitetura: DraftingCompass,
  tecnologia: ScanFace,
  sustentabilidade: Gauge,
  servicos: ConciergeBell,
  experiencias: Sunset,
  gestao: Activity,
};

/** Tempo de uma volta completa da lista, em ms — a cadência que vinha do CSS. */
const VOLTA_MS = 44000;

/** deltaMode=1 vem em linhas; 16px é a altura de linha assumida pelos browsers. */
const LINHA = 16;

/**
 * O método da incorporadora, em seção escura.
 *
 * A lista não é um cardápio de benefícios: é um sistema de decisão — e um
 * sistema não tem primeiro item. Por isso as seis camadas sobem em loop
 * contínuo dentro de uma janela: duas cópias empilhadas e um deslocamento de
 * uma cópia inteira fecham a volta sem emenda. Ao apontar um pilar o giro
 * automático para, os outros recuam, a guia lateral se desenha e a trama
 * técnica aparece no fundo da linha — e o scroll do mouse passa a comandar a
 * volta, para frente e para trás, no ritmo de quem está lendo.
 */
export function PilaresSection() {
  const janela = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const janelaEl = janela.current;
    const trilhoEl = trilho.current;
    if (!janelaEl || !trilhoEl) return;
    // sem movimento a lista volta a ser uma lista (regras em globals.css)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /** Altura de uma cópia da lista: é nela que a volta fecha. */
    function volta() {
      const copia = trilhoEl!.firstElementChild as HTMLElement | null;
      return copia?.offsetHeight ?? 0;
    }

    let deslocamento = 0;
    let parado = false;
    let anterior = 0;
    let frame = 0;

    function aplicar() {
      const altura = volta();
      if (!altura) return;
      // resto sempre positivo: a volta continua fechada nos dois sentidos
      deslocamento = ((deslocamento % altura) + altura) % altura;
      trilhoEl!.style.transform = `translate3d(0, ${-deslocamento}px, 0)`;
    }

    function quadro(agora: number) {
      // o primeiro quadro não anda, e um passo longo (aba em segundo plano)
      // não pode virar um salto
      const passo = anterior ? Math.min(agora - anterior, 64) : 0;
      anterior = agora;

      if (!parado) {
        deslocamento += (volta() / VOLTA_MS) * passo;
        aplicar();
      }

      frame = requestAnimationFrame(quadro);
    }

    /** Delta do wheel em pixels, qualquer que seja a unidade do dispositivo. */
    function pixels(evento: WheelEvent) {
      if (evento.deltaMode === 1) return evento.deltaY * LINHA;
      if (evento.deltaMode === 2) return evento.deltaY * janelaEl!.clientHeight;
      return evento.deltaY;
    }

    function aoGirar(evento: WheelEvent) {
      // com o cursor sobre a lista, o giro é dela; a página fica parada
      evento.preventDefault();
      deslocamento += pixels(evento);
      aplicar();
    }

    const pausar = () => {
      parado = true;
    };
    const seguir = () => {
      parado = false;
    };

    frame = requestAnimationFrame(quadro);
    janelaEl.addEventListener("wheel", aoGirar, { passive: false });
    janelaEl.addEventListener("pointerenter", pausar);
    janelaEl.addEventListener("pointerleave", seguir);
    janelaEl.addEventListener("focusin", pausar);
    janelaEl.addEventListener("focusout", seguir);

    return () => {
      cancelAnimationFrame(frame);
      janelaEl.removeEventListener("wheel", aoGirar);
      janelaEl.removeEventListener("pointerenter", pausar);
      janelaEl.removeEventListener("pointerleave", seguir);
      janelaEl.removeEventListener("focusin", pausar);
      janelaEl.removeEventListener("focusout", seguir);
    };
  }, []);

  return (
    <section
      id="pilares"
      className="ritmo-secao relative overflow-clip bg-linear-to-b from-azul-escuro to-zinc-950 text-white"
    >
      <Dots
        canto="inferior-esquerdo"
        tone="claro"
        tamanho="h-[560px] w-[560px] md:h-[1040px] md:w-[1040px]"
      />

      <div className="faixa relative grid gap-x-20 gap-y-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
        <div className="md:self-start">
          <Reveal variant="linha-desenha" className="h-px w-[52px] bg-dourado" />

          <Reveal className="mt-10">
            <h2 className="tipo-secao">{pilares.titulo}</h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="tipo-corpo mt-9 max-w-[420px] text-pedra-claro/90">
              {pilares.texto}
            </p>
          </Reveal>
        </div>

        {/* a janela recorta o loop; as bordas somem em vez de cortar o texto */}
        <Reveal delay={120}>
          <div
            ref={janela}
            className="janela-pilares relative h-[clamp(26rem,62vh,38rem)] overflow-hidden"
          >
            <div ref={trilho} className="trilho-pilares absolute inset-x-0 top-0">
              {[1, 2].map((copia) => (
                <ol
                  key={copia}
                  // a segunda cópia existe só para fechar a volta
                  aria-hidden={copia === 2}
                  data-copia={copia}
                >
                  {pilares.itens.map((item, i) => {
                    const Icone = icones[item.icone];

                    return (
                      <li key={item.titulo} className="group relative">
                        <div className="relative py-7 pr-6 pl-8 transition-[padding] duration-700 ease-out md:group-hover:pl-10">
                          {/* guia de estado: 1px sempre presente, que ganha o
                              dourado e a altura inteira quando o pilar está sob
                              o cursor */}
                          <span
                            aria-hidden
                            className="absolute inset-y-0 left-0 w-px bg-white/12"
                          />
                          <span
                            aria-hidden
                            className="absolute inset-y-0 left-0 w-px origin-center scale-y-0 bg-linear-to-b from-dourado/0 via-dourado to-dourado/0 transition-transform duration-[900ms] ease-out group-hover:scale-y-100"
                          />

                          {/* trama de planta no fundo da linha apontada */}
                          <span
                            aria-hidden
                            className="trama-tecnica pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-[0.045]"
                          />

                          <div className="relative flex items-baseline gap-5">
                            <span className="tipo-numero text-dourado/55 transition-colors duration-500 ease-out group-hover:text-dourado">
                              {String(i + 1).padStart(2, "0")}
                            </span>

                            <div>
                              <p className="flex items-center gap-3 text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-[1.25] font-normal tracking-[-0.015em] text-white/85 transition-colors duration-500 ease-out group-hover:text-white">
                                {/* decorativo: o nome da camada vem logo em
                                    seguida, então o leitor de tela pula */}
                                <Icone
                                  size={19}
                                  strokeWidth={TRACO}
                                  aria-hidden
                                  className="shrink-0 text-dourado/60 transition-colors duration-500 ease-out group-hover:text-dourado"
                                />
                                {item.titulo}
                              </p>
                              <p className="tipo-corpo-curto mt-3 max-w-[380px] text-pedra-claro/80 transition-colors duration-500 ease-out group-hover:text-pedra-claro">
                                {item.descricao}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* o divisor existe em todos os itens, inclusive no
                            último: é ele que disfarça a emenda do loop */}
                        <span
                          aria-hidden
                          className="ml-8 block h-px bg-white/10"
                        />
                      </li>
                    );
                  })}
                </ol>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
