import { ImageResponse } from "next/og";

import { CartaoOg, TAMANHO_OG } from "../components/lp/og-card";

/**
 * Card do link da LP01. O layout está em `og-card.tsx`, compartilhado com a
 * LP02 — aqui fica só o que é desta página.
 */
export const alt =
  "Amaan Incorporadora — Checklist: 7 perguntas antes de participar de uma SCP imobiliária";
export const size = TAMANHO_OG;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <CartaoOg
        etiqueta="Checklist gratuito"
        titulo="7 perguntas antes de participar de uma SCP imobiliária"
        apoio="Analise o negócio por trás da projeção."
      />
    ),
    size
  );
}
