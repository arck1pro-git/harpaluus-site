"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { pageViewDaRota } from "./lp/meta-eventos";

/**
 * PageView das navegações internas.
 *
 * O código base no `<head>` só roda quando o documento carrega. Ir da home
 * para uma LP por um link do site troca a página sem recarregar, e sem isto
 * essa visita não contaria. A primeira página é pulada: o PageView dela já
 * saiu do código base. Como lá, sai o `PageView` padrão e, nas
 * LPs, também o `PageView_lp1` / `PageView_lp2`.
 */
export function MetaPageViewNavegacao() {
  const pathname = usePathname();
  const anterior = useRef(pathname);

  useEffect(() => {
    if (anterior.current === pathname) return;
    anterior.current = pathname;
    window.fbq?.("track", "PageView");
    const pageView = pageViewDaRota(pathname);
    if (pageView) window.fbq?.("trackCustom", ...pageView);
  }, [pathname]);

  return null;
}
