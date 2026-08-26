/**
 * Mesma geometria do utilitário `bg-listras` do projeto: 45°, 1px, a cada 11px.
 * A cor vem do token da marca, para acompanhar mudanças na paleta.
 */
const COR = "color-mix(in oklab, var(--color-azul) 26%, transparent)";
const TRAMA = `repeating-linear-gradient(45deg, ${COR} 0, ${COR} 1px, transparent 1px, transparent 11px)`;

/**
 * Faixa de listras diagonais nas laterais das seções claras.
 * Fica mais densa na borda da tela e se dissolve em direção ao conteúdo.
 * Só aparece a partir de xl, onde há margem lateral suficiente para ela não
 * invadir a coluna de texto.
 */
export function Listras({ lado }: { lado: "esquerda" | "direita" }) {
  const posicao = lado === "esquerda" ? "left-0" : "right-0";
  const sentido = lado === "esquerda" ? "to right" : "to left";
  const mascara = `linear-gradient(${sentido}, #000 0%, transparent 100%)`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 hidden w-[90px] xl:block 2xl:w-[150px] ${posicao}`}
      style={{
        backgroundImage: TRAMA,
        maskImage: mascara,
        WebkitMaskImage: mascara,
      }}
    />
  );
}
