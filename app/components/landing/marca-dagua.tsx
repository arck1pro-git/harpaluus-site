import Image from "next/image";

/* O símbolo circular oficial, na versão dourada (`public/LOGO AMAAN-01.png`).
   Importado em vez de apontado por caminho: o nome do arquivo tem espaço, e o
   import dá ao `next/image` largura e altura sem precisar escrevê-las. */
import simbolo from "../../../public/LOGO AMAAN-01.png";

type Canto = "superior-direito" | "superior-esquerdo" | "inferior-direito" | "inferior-esquerdo";

/* O arquivo tem uma margem transparente de ~12% em volta do círculo; os
   deslocamentos já contam com ela. Uma parte do símbolo fica sempre fora da
   seção, que corta o excesso: ele entra pelo canto, não pousa no meio. */
const POSICAO: Record<Canto, string> = {
  "superior-direito": "top-0 right-0 translate-x-[36%] -translate-y-[28%]",
  "superior-esquerdo": "top-0 left-0 -translate-x-[36%] -translate-y-[28%]",
  "inferior-direito": "bottom-0 right-0 translate-x-[36%] translate-y-[28%]",
  "inferior-esquerdo": "bottom-0 left-0 -translate-x-[36%] translate-y-[28%]",
};

/**
 * O símbolo da Amaan em marca d'água, num canto das seções de fundo liso.
 *
 * Bem apagado (12% de opacidade) para nunca disputar com o texto que passa
 * por cima, e decorativo: o leitor de tela o ignora. A seção que o recebe
 * precisa de `relative overflow-hidden`, e o conteúdo dela de `relative`, para
 * ficar à frente — sem isso o símbolo, posicionado, pintaria por cima do
 * texto.
 */
export function MarcaDagua({ canto, className = "" }: { canto: Canto; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute w-[min(80vw,360px)] select-none md:w-[min(56vw,640px)] ${POSICAO[canto]} ${className}`}
    >
      <Image
        src={simbolo}
        alt=""
        sizes="(min-width: 768px) 640px, 360px"
        className="h-auto w-full opacity-[0.12]"
      />
    </div>
  );
}
