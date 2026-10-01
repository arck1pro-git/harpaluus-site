import { ImageResponse } from "next/og";

import { CartaoOg, TAMANHO_OG } from "../components/lp/og-card";

/**
 * Card do link da LP03. O layout está em `og-card.tsx`, compartilhado com as
 * outras LPs — aqui fica só o que é desta página.
 *
 * Sem a taxa, pelo mesmo motivo do card da LP02: fora da página, o número
 * apareceria sem o asterisco e a nota que o qualificam. E sem a sigla SCP,
 * como pede o roteiro de captação.
 */
export const alt =
  "Amaan Incorporadora — Investimento em incorporação imobiliária no litoral catarinense";
export const size = TAMANHO_OG;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <CartaoOg
        etiqueta="Investimento em incorporação imobiliária"
        titulo="Invista diretamente no desenvolvimento de empreendimentos imobiliários"
        apoio="Incorporações da Amaan no litoral catarinense."
      />
    ),
    size
  );
}
