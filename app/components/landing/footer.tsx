import { MapPin } from "lucide-react";

import { CtaLink } from "./cta-link";
import { Dots } from "./dots";
import { InstagramIcon, TRACO, WhatsAppIcon } from "./icones";
import { Reveal } from "./reveal";
import { rodape } from "./site-config";

/** Ícones vazados ao lado dos links da coluna Contato. */
const iconesLink = {
  whatsapp: () => <WhatsAppIcon size={14} />,
  instagram: () => <InstagramIcon size={14} />,
  local: () => <MapPin size={14} strokeWidth={TRACO} aria-hidden />,
} as const;

export function Footer() {
  return (
    <footer
      id="contato"
      className="relative overflow-hidden bg-linear-to-b from-azul-escuro to-zinc-950 text-white"
    >
      <Dots
        canto="superior-direito"
        tone="claro"
        tamanho="h-[560px] w-[560px] md:h-[1040px] md:w-[1040px]"
      />

      <div className="relative mx-auto max-w-[1080px] px-6 pt-[110px] pb-[36px] md:px-10 md:pt-[150px]">
        {/* encerramento */}
        <Reveal className="flex flex-col items-start">
          <span className="h-px w-[44px] bg-dourado" />
          <h2 className="mt-6 font-[family-name:var(--font-playfair)] text-3xl leading-[1.1] font-normal tracking-[0.06em] md:text-[42px]">
            {rodape.titulo}
          </h2>
          <p className="tipo-label mt-4 text-dourado">{rodape.assinatura}</p>
          <p className="mt-5 text-base leading-[1.45] font-normal tracking-[-0.01em] text-white/75 md:text-[17px]">
            {rodape.frase}
          </p>

          <CtaLink href={rodape.cta.href} tone="claro" external className="mt-7">
            {rodape.cta.label}
          </CtaLink>
        </Reveal>

        {/* colunas de navegação */}
        <div className="mt-[64px] grid gap-y-8 border-t border-white/10 pt-9 sm:grid-cols-3 sm:gap-x-12">
          {rodape.colunas.map((coluna, i) => (
            <Reveal key={coluna.titulo} delay={i * 110}>
              <p className="text-[9px] font-medium tracking-[0.24em] text-dourado uppercase">
                {coluna.titulo}
              </p>
              <ul className="mt-3 flex flex-col">
                {coluna.links.map((link) => {
                  const chave = "icone" in link ? link.icone : undefined;
                  const Icone = chave
                    ? iconesLink[chave as keyof typeof iconesLink]
                    : undefined;

                  return (
                    <li key={link.label}>
                      {/* py generoso: alvo de toque de ~36px sem alterar o ritmo visual */}
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-2 py-2 text-[11px] leading-[1.2] font-normal tracking-[0.06em] text-white/60 no-underline transition-colors duration-500 hover:text-white"
                      >
                        {Icone ? <Icone /> : null}
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* dados legais */}
        <div className="mt-[54px] flex flex-col gap-1 border-t border-white/10 pt-6">
          {rodape.legais.map((linha) => (
            <p
              key={linha}
              className="text-[9px] leading-[1.5] font-light tracking-[0.06em] text-white/50"
            >
              {linha}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
