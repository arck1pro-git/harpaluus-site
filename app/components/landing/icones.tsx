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

function base(size: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: TRACO,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
}

export function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg {...base(size)}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg {...base(size)}>
      <path d="M3 21l1.9-4.3A8.6 8.6 0 1 1 8.4 20.1L3 21z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" />
      <path d="M9 9.5h1.4l.9 2-1 1" />
      <path d="M14.5 15v-1.4l2-.9 1 1" />
    </svg>
  );
}

export function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg {...base(size)}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
