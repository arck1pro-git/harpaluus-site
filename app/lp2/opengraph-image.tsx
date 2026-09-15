import { ImageResponse } from "next/og";

import { CartaoOg, TAMANHO_OG } from "../components/lp/og-card";

/**
 * Card do link da LP02. O layout está em `og-card.tsx`, compartilhado com a
 * LP01 — aqui fica só o que é desta página.
 */
export const alt =
  "Amaan Incorporadora — Participação em incorporação via SCP no litoral catarinense";
export const size = TAMANHO_OG;
export const contentType = "image/png";

/* O potencial projetado não entra no card: fora da página ele apareceria sem
   o qualificador e sem o disclaimer que o modelo obriga a manter colados no
   número — que é a leitura de "taxa contratada" que a regra existe para
   impedir. O card vende a operação; o número espera a página. */
export default function Image() {
  return new ImageResponse(
    (
      <CartaoOg
        etiqueta="Participação em incorporação"
        titulo="Participe economicamente de uma incorporação no litoral catarinense"
        apoio="Não começamos pelo investimento. Começamos pela incorporação."
      />
    ),
    size
  );
}
