import { ImageResponse } from "next/og";

import { CartaoOg, TAMANHO_OG } from "../components/lp/og-card";

/**
 * Card do link da LP02. O layout está em `og-card.tsx`, compartilhado com a
 * LP01 — aqui fica só o que é desta página.
 */
export const alt =
  "Amaan Incorporadora — Como funciona participar de uma operação de incorporação";
export const size = TAMANHO_OG;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <CartaoOg
        etiqueta="Participação em incorporação"
        titulo="Participar do mercado imobiliário sem comprar um apartamento"
        apoio="Antes de perguntar quanto rende, descubra quem produz o resultado."
      />
    ),
    size
  );
}
