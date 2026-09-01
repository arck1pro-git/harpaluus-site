import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Header from "../components/header";
import PilaresDestaque from "../components/pilares-destaque";
import PilaresSection from "../components/pilares";

/**
 * Rascunho antigo, fora da navegação: ainda traz telefone e e-mail de exemplo
 * e um rodapé com o nome de outra marca. Fica no repositório como referência,
 * mas não pode ser indexado — enquanto estava aberto, era mais uma página
 * competindo pela identidade do site na busca.
 *
 * Continua acessível em /home no navegador; o `noindex` só fala com robôs.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};


export default function Home() {
  return (
    <div className="scroll-smooth bg-fundo text-azul-escuro text-[14px] leading-[1.6] font-[family-name:var(--font-raleway)]">
      {/* LINHA LATERAL ESQUERDA */}

      {/* NAV */}
      <Header />

      {/* HERO */}
      <div className="relative h-screen w-full overflow-hidden bg-azul-escuro">
        <Image
          src="/site6.JPG"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        {/* leve escurecida na base para o BLOG ficar legível sobre a foto */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-12 right-10 z-10 flex items-center gap-2 text-3xl tracking-[0.2em] uppercase text-white">
          BLOG <ArrowUpRight size={50} strokeWidth={1.2} />
        </span>
      </div>

      {/* PILARES EM DESTAQUE */}
      <PilaresDestaque />

      {/* SUBTITLE BANNER */}
      <div className="flex items-stretch bg-linha">
        {/* container esquerda */}
        <div
          className="flex-1 rounded-lg border border-linha bg-fundo bg-listras"
        />

        {/* container central com a frase */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg border border-linha bg-fundo px-12 py-[60px]">
          {/* aurora blur branco vindo do centro */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="h-72 w-[55%] rounded-full bg-white opacity-95 blur-3xl" />
            <div className="absolute h-44 w-[35%] rounded-full bg-white opacity-90 blur-2xl" />
          </div>
          <p className="relative z-10 max-w-[760px] text-center text-[16px] leading-[1.8] text-azul">
            Uma leitura sobre arquitetura, tecnologia e o futuro de morar em prédios inteligentes. Aqui exploramos como a gestão preditiva, a automação predial e a neuroarquitetura estão redefinindo a forma como habitamos, investimos e cuidamos do patrimônio. Edição após edição, reunimos ideias, projetos e visões de quem está construindo a cidade que vem aí — onde cada edifício pensa, aprende e se adapta às pessoas que vivem nele.
          </p>
        </div>

        {/* container direita */}
        <div
          className="flex-1 rounded-lg border border-linha bg-fundo bg-listras"
        />
      </div>

      {/* FAIXA */}
      <div className="bg-linha">
        <div className="h-16 rounded-lg border border-linha bg-fundo" />
      </div>

      {/* PORTO BELO GALLERY */}

      {/* SOBERANIA DA EFICIÊNCIA */}

      {/* PILARES */}
      <PilaresSection />

      {/* ARQUITETURA INTELIGENTE */}
      <div className="flex flex-col bg-linha">
        <div className="rounded-lg border border-linha bg-fundo text-center py-12 px-10">
          <h3 className="font-[family-name:var(--font-playfair)] text-[28px] font-normal tracking-[0.06em] text-azul-escuro">
            Arquitetura Inteligente
          </h3>
        </div>

        <div className="grid grid-cols-4 h-[320px]">
          <div className="relative overflow-hidden flex items-end p-7 rounded-lg border border-linha bg-azul-escuro">
            <Image src="/site4.JPG" alt="" fill sizes="25vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
            <span className="relative z-10 text-[10px] tracking-[0.2em] uppercase text-dourado">Imobiliário Digital</span>
          </div>
          <div className="relative overflow-hidden flex items-end p-7 rounded-lg border border-linha bg-azul-escuro">
            <Image src="/site5.JPG" alt="" fill sizes="25vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
            <span className="relative z-10 text-[10px] tracking-[0.2em] uppercase text-dourado">Residência</span>
          </div>
          <div className="relative overflow-hidden flex items-end p-7 rounded-lg border border-linha bg-azul-escuro">
            <Image src="/site6.JPG" alt="" fill sizes="25vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
            <span className="relative z-10 text-[10px] tracking-[0.2em] uppercase text-dourado">Lucratividade Estruturada</span>
          </div>
          <div className="relative overflow-hidden flex items-end p-7 rounded-lg border border-linha bg-azul-escuro">
            <Image src="/site7.JPG" alt="" fill sizes="25vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
            <span className="relative z-10 text-[10px] tracking-[0.2em] uppercase text-dourado">Blindagem Imaterial</span>
          </div>
        </div>
      </div>

      {/* PARTNER STRIP */}
      <div className="bg-linha">
        <div className="flex items-center justify-center rounded-lg border border-linha bg-azul-escuro py-6 px-10">
          <span className="font-[family-name:var(--font-playfair)] text-[13px] tracking-[0.3em] uppercase text-fundo">
            Bayview Easy Driving Rentals
          </span>
        </div>
      </div>

      {/* SUNSET BLOCK */}
      <div className="bg-linha">
        <div className="relative overflow-hidden rounded-lg border border-linha bg-azul-escuro h-[360px]">
          <Image src="/site6.JPG" alt="" fill sizes="100vw" className="object-cover" />
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-fundo border-t border-linha pt-[72px] px-10 pb-12">
        <div className="grid grid-cols-2 gap-20 max-w-[1000px] mx-auto">
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal mb-9 text-azul-escuro">fale conosco</h4>
            <div className="flex flex-col gap-2.5">
              <p className="text-[12px] text-azul tracking-[0.04em] leading-[1.7]">(47) 98888-0000</p>
              <p className="text-[12px] text-azul tracking-[0.04em] leading-[1.7]">contato@contato.com</p>
              <p className="text-[12px] text-azul tracking-[0.04em] leading-[1.7]">R. Dorvalino Voltolini, 179<br />Perequê - Porto Belo/SC</p>
              <p className="text-[12px] text-azul tracking-[0.04em] leading-[1.7]">CNPJ: 50.550.515/0001-33</p>
            </div>
            <div className="flex gap-4 mt-7">
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-dourado text-[12px] text-azul no-underline transition-colors hover:border-azul-escuro hover:text-azul-escuro">IG</a>
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-dourado text-[12px] text-azul no-underline transition-colors hover:border-azul-escuro hover:text-azul-escuro">𝕏</a>
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-dourado text-[12px] text-azul no-underline transition-colors hover:border-azul-escuro hover:text-azul-escuro">in</a>
            </div>
          </div>
          <div>
            <div className="flex flex-col.5">
              <input
                type="text"
                placeholder="Name"
                className="bg-transparent border-0 border-b border-cinza py-2.5 text-[12px] text-azul-escuro outline-none transition-colors focus:border-azul-escuro placeholder:text-cinza placeholder:text-[11px] placeholder:tracking-[0.1em]"
              />
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-0 border-b border-cinza py-2.5 text-[12px] text-azul-escuro outline-none transition-colors focus:border-azul-escuro placeholder:text-cinza placeholder:text-[11px] placeholder:tracking-[0.1em]"
              />
              <textarea
                placeholder="Leave a message"
                className="bg-transparent border-0 border-b border-cinza py-2.5 text-[12px] text-azul-escuro outline-none resize-none min-h-[80px] transition-colors focus:border-azul-escuro placeholder:text-cinza placeholder:text-[11px] placeholder:tracking-[0.1em]"
              />
              <button
                type="button"
                className="self-start bg-azul-escuro text-fundo border-none py-[13px] px-10 text-[10px] tracking-[0.22em] uppercase cursor-pointer transition-colors hover:bg-dourado"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center max-w-[1000px] mx-auto mt-[60px] pt-7 border-t border-linha">
          <p className="text-[10px] text-cinza tracking-[0.12em]">Seu nome de perfil no Canva não será compartilhado. Nunca envie senhas.</p>
          <p className="text-[10px] text-cinza tracking-[0.12em]">© Empírus – Tourmaline Tower</p>
        </div>
      </footer>
    </div>
  );
}
