import { MapPin } from "lucide-react";

import { CtaLink } from "./cta-link";
import { Dots } from "./dots";
import { InstagramIcon, LinkedInIcon, TRACO, WhatsAppIcon } from "./icones";
import { LocalTime } from "./local-time";
import { Reveal } from "./reveal";
import { rodape } from "./site-config";

const social = [
  { href: rodape.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: rodape.social.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
  { href: rodape.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  {
    href: rodape.social.localizacao,
    label: "Localização",
    Icon: () => <MapPin size={15} strokeWidth={TRACO} aria-hidden />,
  },
];

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
      className="relative overflow-hidden bg-linear-to-b from-verde-escuro to-zinc-950 text-white"
    >
      <Dots
        canto="superior-direito"
        tone="claro"
        tamanho="h-[1040px] w-[1040px]"
      />

      <div className="relative mx-auto max-w-[1080px] px-6 pt-[170px] pb-[56px] md:px-10 md:pt-[230px]">
        {/* encerramento */}
        <Reveal className="flex flex-col items-start">
          <span className="h-px w-[52px] bg-dourado" />
          <h2 className="mt-9 font-[family-name:var(--font-playfair)] text-4xl leading-[1.08] font-normal tracking-[0.06em] md:text-6xl">
            {rodape.titulo}
          </h2>
          <p className="mt-5 text-[19px] leading-[1.4] font-normal tracking-[-0.01em] text-white/75 md:text-[22px]">
            {rodape.frase}
          </p>

          <CtaLink href={rodape.cta.href} tone="claro" external className="mt-11">
            {rodape.cta.label}
          </CtaLink>
        </Reveal>

        {/* colunas de navegação */}
        <div className="mt-[110px] grid gap-y-12 border-t border-white/10 pt-14 sm:grid-cols-3 sm:gap-x-12">
          {rodape.colunas.map((coluna, i) => (
            <Reveal key={coluna.titulo} delay={i * 110}>
              <p className="text-[10px] font-medium tracking-[0.24em] text-dourado uppercase">
                {coluna.titulo}
              </p>
              <ul className="mt-4 flex flex-col">
                {coluna.links.map((link) => {
                  const chave = "icone" in link ? link.icone : undefined;
                  const Icone = chave
                    ? iconesLink[chave as keyof typeof iconesLink]
                    : undefined;

                  return (
                    <li key={link.label}>
                      {/* py generoso: alvo de toque de ~40px sem alterar o ritmo visual */}
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-2.5 py-2.5 text-[12px] leading-[1.2] font-normal tracking-[0.06em] text-white/60 no-underline transition-colors duration-500 hover:text-white"
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
        <div className="mt-[90px] flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="mb-2.5">
              <LocalTime />
            </div>
            {rodape.legais.map((linha) => (
              <p
                key={linha}
                className="text-[10px] leading-[1.6] font-light tracking-[0.06em] text-white/50"
              >
                {linha}
              </p>
            ))}
          </div>

          {/* -m compensa o padding: os ícones seguem alinhados como antes,
              mas cada um passa a ter 44x44px de alvo de toque */}
          <ul className="-m-2.5 flex items-center">
            {social.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center text-white/50 transition-colors duration-500 hover:text-dourado"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
