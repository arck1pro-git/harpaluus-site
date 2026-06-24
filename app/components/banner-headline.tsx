"use client";

import { useEffect, useState } from "react";

const FULL = "Arquitetura na era da inteligência";

export default function BannerHeadline() {
  const [n, setN] = useState(0);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    function run() {
      timeouts.forEach(clearTimeout);
      timeouts = [];
      setN(0);
      const startDelay = 1300; // cursor piscando antes de escrever
      const speed = 55; // ms por caractere
      for (let i = 1; i <= FULL.length; i++) {
        timeouts.push(setTimeout(() => setN(i), startDelay + i * speed));
      }
    }

    run();
    const interval = setInterval(run, 10000);
    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <h2 className="relative z-10 text-center font-[family-name:var(--font-playfair)] text-[32px] font-normal tracking-[0.04em] text-[#0a0a0a]">
      <span>{FULL.slice(0, n)}</span>
      <span className="caret-blink text-[0.5em]">▍</span>
      <span className="text-transparent">{FULL.slice(n)}</span>
    </h2>
  );
}
