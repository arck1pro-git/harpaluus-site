import Image from "next/image";
import Link from "next/link";

import { logo } from "../landing/site-config";
import { marca } from "./lp-config";

/**
 * Barra das landing pages: lettering e nada mais.
 *
 * Sem menu de propósito. A home tem navegação porque quer que o visitante
 * circule; uma página de funil quer que ele desça até o formulário, e todo
 * link a mais é uma saída. O único destino é a marca, que leva à home — ela
 * responde "quem está me oferecendo isto?", que é a pergunta que trava o
 * cadastro.
 *
 * Não é `sticky`: uma barra fixa come altura no celular justamente onde os
 * briefs pedem leitura confortável, e o CTA já se repete ao longo da página.
 */
export function LpHeader() {
  return (
    <header className="relative z-20 border-b border-linha bg-fundo">
      <div className="faixa flex h-[var(--header-altura)] items-center">
        <Link
          href="/"
          /* Sem prefetch. O App Router baixa a home inteira assim que este
             link aparece na tela — payload RSC mais os chunks dos componentes
             de cliente dela (hero com parallax, seções animadas). No celular
             isso chegava como uma tarefa longa de ~300ms no meio do
             carregamento da LP, atrasando a pintura do próprio título.
             A home é a saída da página, não o destino: quem clica aqui aceita
             esperar o carregamento dela. */
          prefetch={false}
          className="inline-flex items-center"
          aria-label={`${marca} — página inicial`}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            /* `priority` foi depreciado no Next 16. Para o logo o
               substituto certo é `loading="eager"`, não `preload`: ele está no
               topo do body e o navegador o descobre imediatamente — um
               `<link rel="preload">` no head só disputaria banda com a imagem
               do hero, que é a LCP de verdade. */
            loading="eager"
            sizes="132px"
            className="h-auto w-[132px]"
          />
        </Link>
      </div>
    </header>
  );
}
