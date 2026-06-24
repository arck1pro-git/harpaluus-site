"use client";

import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";

export default function HeroHeadline() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const annotation = annotate(ref.current, {
      type: "underline",
      color: "#ffffff",
      strokeWidth: 2,
      padding: 4,
      animationDuration: 1200,
    });
    const t = setTimeout(() => annotation.show(), 500);
    return () => {
      clearTimeout(t);
      annotation.remove();
    };
  }, []);

  return (
    <h1 className="absolute top-8 ml-5 z-10 whitespace-nowrap font-[family-name:var(--font-playfair)] text-[28px] leading-[1.35] italic text-white">
      <span ref={ref}>
        &ldquo;Tecnologia predial é imprescindível ao futuro.&rdquo;
      </span>
    </h1>
  );
}
