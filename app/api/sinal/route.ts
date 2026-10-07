import { after } from "next/server";

import { enviarEventosDoNavegador, lerContexto } from "../../components/lp/meta-capi";
import { EVENTOS_DO_NAVEGADOR } from "../../components/lp/meta-eventos";

/**
 * O lado de servidor de PageView, ViewContent e AbriuFormulario.
 *
 * O navegador dispara o evento no Pixel e, junto, manda para cá o mesmo id
 * e os mesmos nomes (ver `emitirEvento`, em `lp/meta-pixel.tsx`, e o código
 * base em `meta-pixel-base.tsx`). Daqui o evento segue para a API de
 * Conversões, e o Meta junta os dois lados pelo nome + id.
 *
 * Chega por `sendBeacon`, que manda o JSON como texto: por isso `text()` e
 * não `json()`. O corpo é `{ id, nomes, url }` — um id para até dois nomes,
 * o padrão e o da LP (`PageView` + `PageView_lp1`), que são o mesmo
 * acontecimento.
 *
 * A resposta não espera o Meta: o envio vai em `after()`, e quem chamou nem
 * lê o que volta.
 */
export async function POST(request: Request) {
  let corpo: unknown;
  try {
    corpo = JSON.parse(await request.text());
  } catch {
    return new Response(null, { status: 400 });
  }

  const { id, nomes, url } = (corpo ?? {}) as Record<string, unknown>;

  /* Sem id válido não há como o Meta juntar o evento ao do Pixel, e ele
     contaria duas vezes — melhor não mandar. */
  const valido =
    typeof id === "string" &&
    Array.isArray(nomes) &&
    nomes.length >= 1 &&
    nomes.length <= 2 &&
    new Set(nomes).size === nomes.length &&
    nomes.every((nome) => typeof nome === "string" && EVENTOS_DO_NAVEGADOR.has(nome));

  if (!valido) return new Response(null, { status: 400 });

  const contexto = await lerContexto(id, typeof url === "string" ? url : "");
  if (!contexto.idEvento) return new Response(null, { status: 400 });

  after(() => enviarEventosDoNavegador(nomes as string[], contexto));

  return new Response(null, { status: 204 });
}
