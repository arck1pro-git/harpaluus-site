import { PAGEVIEW_POR_ROTA, PIXEL_ID, ROTA_SINAL } from "./lp/meta-eventos";

/**
 * Código base do Meta Pixel, no `<head>` de todas as páginas — como pede a
 * instrução de instalação do Meta. É o snippet oficial, só com o ID vindo de
 * `meta-eventos.ts`, o mesmo que a API de Conversões usa.
 *
 * Ele roda uma vez por carregamento de documento: dá o `init` e o PageView da
 * primeira página. O `PageView` padrão sai em todas as páginas — é dele que
 * o Gerenciador de Anúncios tira as visualizações da página de destino. Nas
 * LPs sai também o personalizado, `PageView_lp1` ou `PageView_lp2`, escolhido
 * pelo caminho da URL. Os PageViews das navegações internas saem de
 * `MetaPageViewNavegacao`, e os eventos das LPs, de `lp/meta-pixel.tsx`.
 *
 * Duas diferenças para o snippet oficial. A primeira: o PageView sai também
 * pelo servidor, com o mesmo `eventID`. O snippet gera o id, passa ao Pixel e
 * manda id + nomes por beacon para `ROTA_SINAL` — a mesma coisa que
 * `emitirEvento` faz para os outros eventos, repetida aqui à mão porque este
 * código roda antes do React. Mudar um pede mudar o outro.
 *
 * A segunda é QUANDO o `fbevents.js` baixa.
 * O `fbq` nasce aqui na hora, e tudo que for chamado nele — o PageView logo
 * abaixo, o Lead, os eventos das LPs — entra na fila dele. O script do Meta
 * (~240 KB somando o arquivo de configuração do Pixel) só é buscado na
 * primeira interação (toque, rolagem, clique, tecla) ou, sem nenhuma,
 * `ESPERA_MS` depois do `load`, e ao chegar esvazia a fila na ordem. Nada se
 * perde, só sai mais tarde.
 *
 * O motivo: baixado e executado junto com a página, ele era o maior custo do
 * celular — ~800 ms de bloqueio na thread principal, e a primeira pintura das
 * LPs ficava esperando por ele. Medido com Lighthouse (celular), era a
 * diferença entre ~50 e ~85 de nota.
 *
 * O custo: quem sai antes de interagir e antes da espera não chega a enviar
 * o PageView pelo navegador. O do servidor sai mesmo assim — o beacon parte
 * na hora, sem esperar o `fbevents.js`. E o Lead não corre esse risco: quem
 * envia o formulário já interagiu.
 */
const ESPERA_MS = 5000;

const SNIPPET = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];
var ev=['pointerdown','keydown','scroll','touchstart','wheel'],op={once:true,passive:true,capture:true};
function carregar(){if(t)return;t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s);
ev.forEach(function(x){f.removeEventListener(x,carregar,op)})}
ev.forEach(function(x){f.addEventListener(x,carregar,op)});
f.addEventListener('load',function(){setTimeout(carregar,${ESPERA_MS})})
}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
!function(c,n){
var p=${JSON.stringify(PAGEVIEW_POR_ROTA)}[location.pathname.replace(/[/]+$/,'')],
i=c&&c.randomUUID?c.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2),
o={eventID:i},
d=JSON.stringify({id:i,nomes:p?['PageView',p[0]]:['PageView'],url:location.href});
fbq('track','PageView',{},o);
if(p)fbq('trackCustom',p[0],p[1],o);
if(!(n.sendBeacon&&n.sendBeacon('${ROTA_SINAL}',d)))fetch('${ROTA_SINAL}',{method:'POST',body:d,keepalive:!0}).catch(function(){})
}(window.crypto,navigator);`;

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
