type Canto = "superior-direito" | "superior-esquerdo" | "inferior-direito" | "inferior-esquerdo";

const cantos: Record<Canto, { posicao: string; origem: string }> = {
  "superior-direito": { posicao: "top-0 right-0", origem: "100% 0%" },
  "superior-esquerdo": { posicao: "top-0 left-0", origem: "0% 0%" },
  "inferior-direito": { posicao: "bottom-0 right-0", origem: "100% 100%" },
  "inferior-esquerdo": { posicao: "bottom-0 left-0", origem: "0% 100%" },
};

/* Baixas de propósito: a textura precisa ser sentida, não vista. Acima disso
   ela disputa atenção com o texto que corre por cima. */
const cores = {
  claro: "rgba(255,255,255,0.17)",
  escuro: "rgba(17,17,17,0.14)",
};

/**
 * Textura de bolinhas muito discreta, ancorada num canto e dissolvida por uma
 * máscara radial. Puramente decorativa — some no mobile e é ignorada por
 * leitores de tela.
 */
export function Dots({
  canto,
  tone = "escuro",
  /* passado por classe em vez de style: precisa variar no breakpoint */
  tamanho = "h-[460px] w-[460px]",
  className = "",
}: {
  canto: Canto;
  tone?: keyof typeof cores;
  tamanho?: string;
  className?: string;
}) {
  const { posicao, origem } = cantos[canto];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute hidden md:block ${tamanho} ${posicao} ${className}`}
      style={{
        backgroundImage: `radial-gradient(${cores[tone]} 1.2px, transparent 1.2px)`,
        backgroundSize: "18px 18px",
        maskImage: `radial-gradient(100% 100% at ${origem}, #000 0%, transparent 72%)`,
        WebkitMaskImage: `radial-gradient(100% 100% at ${origem}, #000 0%, transparent 72%)`,
      }}
    />
  );
}
