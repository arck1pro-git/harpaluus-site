/**
 * Limiar: a passagem entre dois ambientes da página (foto → claro, claro →
 * escuro). Em vez do corte seco, a trama diagonal da marca aparece densa na
 * borda e se dissolve em direção ao conteúdo, junto de uma régua de marcações
 * técnicas — a mesma linguagem de planta baixa usada nas laterais das seções.
 *
 * É decoração: não recebe foco, não é lido e não ocupa espaço no fluxo.
 */

const tramas = {
  escuro: "color-mix(in oklab, var(--color-verde) 34%, transparent)",
  claro: "rgba(255,255,255,0.14)",
} as const;

const reguas = {
  escuro: "color-mix(in oklab, var(--color-grafite) 12%, transparent)",
  claro: "rgba(255,255,255,0.10)",
} as const;

export function Limiar({
  tone = "escuro",
  className = "",
}: {
  /** `escuro` = marcas escuras sobre seção clara; `claro` = o inverso. */
  tone?: keyof typeof tramas;
  className?: string;
}) {
  const dissolve = "linear-gradient(to bottom, #000 0%, transparent 100%)";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 h-[clamp(72px,9vw,132px)] ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${tramas[tone]} 0, ${tramas[tone]} 1px, transparent 1px, transparent 11px)`,
          maskImage: dissolve,
          WebkitMaskImage: dissolve,
          opacity: 0.5,
        }}
      />

      {/* régua: filetes verticais a cada 44px, como marcações de escala */}
      <div
        className="absolute inset-x-0 top-0 h-6"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${reguas[tone]} 0, ${reguas[tone]} 1px, transparent 1px, transparent 44px)`,
          maskImage: dissolve,
          WebkitMaskImage: dissolve,
        }}
      />
    </div>
  );
}
