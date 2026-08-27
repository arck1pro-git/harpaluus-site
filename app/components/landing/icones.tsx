/**
 * Espessura única de traço para todos os ícones do site.
 * Qualquer ícone novo — lucide ou SVG inline — precisa usar este valor.
 */
export const TRACO = 1.5;

/*
 * O lucide-react (v1) não distribui mais marcas de terceiros, então Instagram,
 * WhatsApp e LinkedIn vêm como SVG inline, desenhados no mesmo traço e com o
 * mesmo arredondamento de cantos dos ícones lucide.
 */

type IconeProps = {
  size?: number;
  /** só para casos pontuais (ex.: header) — o padrão é sempre TRACO */
  strokeWidth?: number;
};

function base(size: number, strokeWidth: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
}

export function InstagramIcon({ size = 15, strokeWidth = TRACO }: IconeProps) {
  return (
    <svg {...base(size, strokeWidth)}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 15, strokeWidth = TRACO }: IconeProps) {
  return (
    <svg {...base(size, strokeWidth)}>
      {/* balão com a cauda na base e o fone dentro: o desenho antigo somava
          quatro traços soltos que, no tamanho do header, viravam um borrão */}
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21z" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export function LinkedInIcon({ size = 15, strokeWidth = TRACO }: IconeProps) {
  return (
    <svg {...base(size, strokeWidth)}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
