import { Montserrat } from "next/font/google";

import "./lp3.css";

/**
 * Casca das duas páginas da LP03 — a landing e o obrigado.
 *
 * A Montserrat fica só aqui: declarada no layout raiz, ela entraria no
 * preload da home e das outras LPs, que não a usam. O `.lp3` é a raiz de
 * escopo de todo o `lp3.css`.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function Lp3Layout({ children }: { children: React.ReactNode }) {
  return <div className={`lp3 ${montserrat.variable}`}>{children}</div>;
}
