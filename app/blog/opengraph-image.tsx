import { ImageResponse } from "next/og";

import { marca } from "../components/landing/site-config";
import { CartaoOg, TAMANHO_OG } from "../components/lp/og-card";

/**
 * Card do link de /blog. O layout é o mesmo das LPs (`og-card.tsx`): marca
 * escrita por extenso sobre o azul, porque quem recebe o link no WhatsApp
 * precisa ler "Amaan" antes de qualquer outra coisa.
 */
export const alt = `Blog da ${marca}`;
export const size = TAMANHO_OG;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <CartaoOg
        etiqueta="Blog"
        titulo="Mercado imobiliário, explicado para quem investe."
        apoio="Juros, crédito, lançamentos e o litoral de Santa Catarina."
      />
    ),
    size
  );
}
