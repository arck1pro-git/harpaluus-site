"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vídeo no fundo de uma seção das LPs.
 *
 * Entra por `fundo` na `Secao` (ver lp-ui.tsx), que o coloca atrás da faixa
 * de conteúdo e desliga a textura de bolinhas enquanto ele estiver lá.
 *
 * Três decisões que o arquivo inteiro existe para sustentar:
 *
 * 1. O vídeo não baixa com a página. São ~3,7 MB num bloco que está no meio
 *    da rolagem: baixá-lo no carregamento disputaria banda com a imagem do
 *    hero, que é a LCP, para servir algo que boa parte das visitas nunca vê.
 *    O `src` só é escrito quando o bloco chega perto da tela — por isso
 *    `preload="none"` e o `IntersectionObserver` com folga de 300px, que dá
 *    ao vídeo o tempo de rolagem restante para começar a tocar antes de
 *    aparecer.
 *
 * 2. O pôster é um quadro do próprio vídeo, não outra imagem. É o que a
 *    seção mostra antes de o arquivo chegar, em conexão ruim e para quem
 *    pediu menos movimento — nesse caso o vídeo nunca é baixado, e o que
 *    fica é a mesma cena, parada. Nada do conteúdo depende do movimento.
 *
 *    Ele também só é escrito perto da tela: `poster` no HTML o navegador
 *    baixa na hora, mesmo com `preload="none"`. Eram 124 KB, lá embaixo da
 *    página, disputando o 4G com o Pixel do Meta nos primeiros segundos — e
 *    o PageView saía meio segundo mais tarde, perdendo quem desiste antes.
 *
 * 3. Os véus são chapados, e não o degradê de `FundoHero`. No hero o texto
 *    se apoia no rodapé do bloco, então o degradê pode fechar embaixo e
 *    deixar a foto clara em cima. Aqui o texto ocupa a altura toda e a
 *    filmagem é de dia — céu e mar claros, do topo à base. Um degradê
 *    deixaria o título sem contraste justamente onde a imagem é mais clara.
 */
export function FundoVideo({
  src,
  poster,
}: {
  src: string;
  /** quadro do próprio vídeo, em `/public` */
  poster: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [perto, setPerto] = useState(false);
  const [fonte, setFonte] = useState<string | undefined>(undefined);

  useEffect(() => {
    const node = video.current;
    if (!node) return;

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setPerto(true);
        // quem pediu menos movimento fica só com o pôster
        if (!semMovimento) setFonte(src);
        observador.disconnect();
      },
      { rootMargin: "300px" }
    );

    observador.observe(node);
    return () => observador.disconnect();
  }, [src]);

  return (
    <>
      <video
        ref={video}
        src={fonte}
        poster={perto ? poster : undefined}
        /* Os quatro juntos são o que permite tocar sozinho: sem `muted` o
           navegador bloqueia o autoplay, e sem `playsInline` o iPhone abre o
           vídeo em tela cheia em vez de deixá-lo no fundo do bloco. */
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        /* Decoração: a informação do bloco está no texto e nos indicadores.
           `tabIndex={-1}` porque sem controles não há o que focar. */
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* baixa o brilho da filmagem inteira */}
      <div className="absolute inset-0 bg-black/40" />

      {/* e o azul da marca por cima, para o bloco continuar sendo uma seção
          escura do site e não um vídeo com texto em cima */}
      <div className="absolute inset-0 bg-azul-escuro/75" />
    </>
  );
}
