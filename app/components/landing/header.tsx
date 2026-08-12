"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { InstagramIcon, TRACO, WhatsAppIcon } from "./icones";
import { INSTAGRAM, logo, nav, WHATSAPP, type NavItem } from "./site-config";

/** Rolagem (px) a partir da qual o header troca de estado. */
const LIMITE_SCROLL = 24;

/** Atalhos diretos, fixos no canto direito da barra. */
const atalhos = [
  { href: WHATSAPP, label: "WhatsApp", Icon: WhatsAppIcon },
  { href: INSTAGRAM, label: "Instagram", Icon: InstagramIcon },
];

/**
 * Link de menu no elemento certo para cada destino: `next/link` nas rotas
 * internas (navegação sem recarregar), âncora simples nos fragmentos da
 * própria página e nos destinos externos.
 */
function LinkNav({
  item,
  className,
  ativo = false,
  onClick,
  children,
}: {
  item: NavItem;
  className: string;
  /** vira data-ativo: é o que o CSS usa para o filete dourado permanente */
  ativo?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const comuns = {
    className,
    onClick,
    "data-ativo": ativo,
  };

  if (item.externo) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        {...comuns}
      >
        {children}
      </a>
    );
  }

  if (item.href.startsWith("#")) {
    return (
      <a href={item.href} {...comuns}>
        {children}
      </a>
    );
  }

  return (
    <Link href={item.href} {...comuns}>
      {children}
    </Link>
  );
}

/** Id da seção que um item de menu aponta — `#contato` e `/#sobre` valem. */
function ancoraDe(href: string) {
  if (href.startsWith("/#")) return href.slice(2);
  if (href.startsWith("#")) return href.slice(1);
  return null;
}

/** Seções observadas para marcar o item de menu correspondente. */
const ancoras = nav
  .map((item) => ancoraDe(item.href))
  .filter((id): id is string => id !== null);

/**
 * Header fixo em dois estados.
 * No topo: barra sólida no tom da marca, alta, sem divisor — discreta.
 * Ao rolar: encolhe, ganha translucidez com blur e um divisor de 1px. Os
 * links continuam em contraste pleno; nada de sombra.
 */
export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [secao, setSecao] = useState<string | null>(null);
  const rota = usePathname();

  /** Um item está ativo por rota (/empreendimentos) ou pela seção em tela. */
  function ativo(href: string) {
    const ancora = ancoraDe(href);
    if (ancora) return secao === ancora;
    return href === rota;
  }

  useEffect(() => {
    let frame = 0;

    function aplicar() {
      frame = 0;
      setRolou(window.scrollY > LIMITE_SCROLL);
    }

    function aoRolar() {
      // 1 atualização por frame em vez de 1 por evento de scroll
      if (!frame) frame = requestAnimationFrame(aplicar);
    }

    aplicar(); // respeita a posição atual (ex.: reload no meio da página)
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Seção visível: marca o item do menu sem custo de scroll por quadro.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const alvos = ancoras
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (!alvos.length) return;

    const visiveis = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visiveis.add(entry.target.id);
          else visiveis.delete(entry.target.id);
        }
        // a primeira da ordem do documento vence quando duas se sobrepõem
        setSecao(ancoras.find((id) => visiveis.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    for (const alvo of alvos) observer.observe(alvo);
    return () => observer.disconnect();
  }, []);

  // Fecha o menu no Esc: sai do estado aberto sem precisar mirar o botão.
  useEffect(() => {
    if (!aberto) return;

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") setAberto(false);
    }

    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  // O menu aberto vira uma superfície própria: precisa ser opaco mesmo no topo.
  const superficie =
    rolou || aberto
      ? "bg-fundo/80 backdrop-blur-xl border-grafite/10"
      : "bg-fundo border-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-700 ease-out ${superficie}`}
    >
      <div
        className="faixa flex items-center justify-between transition-[height] duration-700 ease-out"
        style={{
          height: rolou ? "var(--header-baixo)" : "var(--header-alto)",
        }}
      >
        {/* a marca leva para a home, não para a âncora do hero: em
            /empreendimentos o #hero não existe e o clique não fazia nada */}
        <Link href="/" className="block shrink-0 no-underline" aria-label={logo.alt}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            loading="eager"
            className="w-auto transition-[height] duration-700 ease-out"
            style={{ height: rolou ? "26px" : "30px" }}
          />
        </Link>

        {/* -mr compensa o padding dos ícones: eles ficam alinhados à borda do
            conteúdo, mas cada um mantém 40px de alvo de toque */}
        <div className="-mr-2.5 flex items-center gap-1 md:gap-8">
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <LinkNav
                key={item.label}
                item={item}
                ativo={ativo(item.href)}
                className="link-nav tipo-label text-grafite/65 no-underline transition-colors duration-500 hover:text-grafite data-[ativo=true]:text-grafite"
              >
                {item.label}
              </LinkNav>
            ))}
          </nav>

          <ul className="flex items-center md:border-l md:border-grafite/15 md:pl-5">
            {atalhos.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center text-grafite/60 no-underline transition-colors duration-500 hover:text-grafite"
                >
                  {/* traço mais encorpado que o TRACO padrão: nesse tamanho os
                      ícones sumiriam ao lado do peso do logo */}
                  <Icon size={20} strokeWidth={1.9} />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="flex h-10 w-10 items-center justify-center text-grafite transition-colors duration-500 md:hidden"
          >
            {aberto ? (
              <X size={19} strokeWidth={TRACO} />
            ) : (
              <Menu size={19} strokeWidth={TRACO} />
            )}
          </button>
        </div>
      </div>

      {aberto ? (
        <nav id="menu-mobile" className="faixa pb-9 md:hidden">
          <ul className="flex flex-col border-t border-grafite/10">
            {nav.map((item) => (
              <li key={item.label} className="border-b border-grafite/[0.07]">
                <LinkNav
                  item={item}
                  onClick={() => setAberto(false)}
                  className="tipo-label flex items-center justify-between py-[18px] text-grafite/75 no-underline"
                >
                  {item.label}
                  {ativo(item.href) ? (
                    <span aria-hidden className="h-px w-4 bg-dourado" />
                  ) : null}
                </LinkNav>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
