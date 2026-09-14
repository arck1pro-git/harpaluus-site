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
          className="inline-flex items-center"
          aria-label={`${marca} — página inicial`}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            sizes="132px"
            className="h-auto w-[132px]"
          />
        </Link>
      </div>
    </header>
  );
}
