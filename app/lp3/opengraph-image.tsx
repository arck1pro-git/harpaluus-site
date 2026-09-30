import { ImageResponse } from "next/og";

import { CartaoOg, TAMANHO_OG } from "../components/lp/og-card";

/**
 * Card do link da LP03. O layout está em `og-card.tsx`, compartilhado com as
 * outras LPs — aqui fica só o que é desta página.
 *
 * Sem a taxa, pelo mesmo motivo do card da LP02: fora da página, o número
 * apareceria sem o prazo, o contrato e a garantia que o explicam.
 */
export const alt = "Amaan Incorporadora — Investimento em SCP no litoral catarinense";
export const size = TAMANHO_OG;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <CartaoOg
        etiqueta="Investimento em SCP"
        titulo="Seja sócio de incorporações no litoral catarinense"
        apoio="Garantia real em imóveis registrados em cartório."
      />
    ),
    size
  );
}
