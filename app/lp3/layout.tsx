import "./lp3.css";

/**
 * Casca das duas páginas da LP03 — a landing e o obrigado. O `.lp3` é a raiz
 * de escopo de todo o `lp3.css`; as fontes (Inter e Playfair) vêm do layout
 * raiz, como nas outras LPs.
 */
export default function Lp3Layout({ children }: { children: React.ReactNode }) {
  return <div className="lp3">{children}</div>;
}
