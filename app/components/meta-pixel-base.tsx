import { PIXEL_ID } from "./lp/meta-eventos";

/**
 * Código base do Meta Pixel, no `<head>` de todas as páginas — como pede a
 * instrução de instalação do Meta. É o snippet oficial, só com o ID vindo de
 * `meta-eventos.ts`, o mesmo que a API de Conversões usa.
 *
 * Ele roda uma vez por carregamento de documento: dá o `init` e o PageView da
 * primeira página. Os PageViews das navegações internas saem de
 * `MetaPageViewNavegacao`, e os eventos das LPs, de `lp/meta-pixel.tsx`.
 */
const SNIPPET = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`;

export function MetaPixelBase() {
  return <script dangerouslySetInnerHTML={{ __html: SNIPPET }} />;
}

/**
 * A parte `<noscript>` do snippet. Fica no `<body>`, e não no `<head>`: lá
 * dentro o HTML só admite `<link>`, `<style>` e `<meta>` num `<noscript>`, e
 * o navegador fecharia o `<head>` ao encontrar a imagem.
 */
export function MetaPixelSemJs() {
  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element -- pixel de 1px sem JS, não é imagem de conteúdo */}
      <img
        height="1"
        width="1"
        alt=""
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
