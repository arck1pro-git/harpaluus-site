import { ArrowUpRight } from "lucide-react";

import { TRACO } from "./icones";

type CtaTone = "claro" | "escuro";

const tones: Record<CtaTone, string> = {
  // sobre fotografia ou fundo escuro: vidro fosco, borda quase invisível
  claro:
    "border-white/[0.14] bg-white/[0.10] text-white/90 backdrop-blur-md hover:border-dourado/60 hover:bg-white/[0.18] hover:text-white",
  // sobre off-white
  escuro:
    "border-grafite/15 bg-grafite/[0.03] text-grafite/85 backdrop-blur-md hover:border-dourado/60 hover:bg-dourado/10 hover:text-grafite",
};

/**
 * CTA em bloco discreto: mantém o tom editorial, mas com área de clique de
 * ~46px e peso visual suficiente para não se confundir com texto corrido.
 */
export function CtaLink({
  href,
  children,
  tone = "claro",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: CtaTone;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-3.5 border px-8 py-[15px] text-[10px] font-medium tracking-[0.22em] uppercase no-underline transition-colors duration-500 ${tones[tone]} ${className}`}
    >
      {children}
      <ArrowUpRight
        size={16}
        strokeWidth={TRACO}
        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}
