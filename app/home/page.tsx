import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Header from "../components/header";
import HeroVideo from "../components/hero-video";
import HeroHeadline from "../components/hero-headline";
import BannerHeadline from "../components/banner-headline";
import PilaresSection from "../components/pilares";


export default function Home() {
  return (
    <div className="scroll-smooth bg-[#f5f4f0] text-[#0a0a0a] text-[14px] leading-[1.6] font-[family-name:var(--font-raleway)]">
      {/* LINHA LATERAL ESQUERDA */}

      {/* NAV */}
      <Header />


      {/* HERO */}
      <div className="relative flex min-h-screen items-center justify-start bg-[#f5f4f0] pl-[5vw]">
        {/* textura de bolinhas (dots) na base do hero */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
          style={{
            backgroundImage: "radial-gradient(#0a0a0a 1.6px, transparent 1.6px)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* sombra do topo direito até o meio, na cor do fundo */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at top right, #f5f4f0 0%, #f5f4f0 80%, transparent 140%)",
          }}
        />
        <div className="relative z-10 h-[75vh] w-[60vw] overflow-hidden rounded-lg bg-[#0a0a0a]">
          <HeroVideo />
          <HeroHeadline />
        </div>
        <p className="absolute top-[28vh] right-10 z-10 max-w-[460px] text-right text-[16px] leading-[1.8] text-[#3a3835]">
          Uma leitura sobre arquitetura, tecnologia e o futuro de morar em prédios inteligentes. Aqui exploramos como a gestão preditiva, a automação predial e a neuroarquitetura estão redefinindo a forma como habitamos, investimos e cuidamos do patrimônio. Edição após edição, reunimos ideias, projetos e visões de quem está construindo a cidade que vem aí — onde cada edifício pensa, aprende e se adapta às pessoas que vivem nele.
        </p>
        <span className="absolute bottom-12 right-10 z-10 flex items-center gap-2 text-3xl tracking-[0.2em] uppercase text-[#0a0a0a]">
          BLOG <ArrowUpRight size={50} strokeWidth={1.2} />
        </span>
      </div>

      {/* SUBTITLE BANNER */}
      <div className="flex items-stretch bg-[#e8e6e0]">
        {/* container esquerda */}
        <div
          className="flex-1 rounded-lg border border-[#e8e6e0] bg-[#f5f4f0]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #e8e6e0 0, #e8e6e0 1px, transparent 1px, transparent 11px)",
          }}
        />

        {/* container central com a frase */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg border border-[#e8e6e0] bg-[#f5f4f0] px-12 py-[60px]">
          {/* aurora blur branco vindo do centro */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="h-72 w-[55%] rounded-full bg-white opacity-95 blur-3xl" />
            <div className="absolute h-44 w-[35%] rounded-full bg-white opacity-90 blur-2xl" />
          </div>
          <BannerHeadline />
        </div>

        {/* container direita */}
        <div
          className="flex-1 rounded-lg border border-[#e8e6e0] bg-[#f5f4f0]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #e8e6e0 0, #e8e6e0 1px, transparent 1px, transparent 11px)",
          }}
        />
      </div>

      {/* FAIXA */}
      <div className="bg-[#e8e6e0]">
        <div className="h-16 rounded-lg border border-[#e8e6e0] bg-[#f5f4f0]" />
      </div>

      {/* PORTO BELO GALLERY */}

      {/* SOBERANIA DA EFICIÊNCIA */}

      {/* PILARES */}
      <PilaresSection />

      {/* ARQUITETURA INTELIGENTE */}
      <div className="flex flex-col bg-[#e8e6e0]">
        <div className="rounded-lg border border-[#e8e6e0] bg-[#f5f4f0] text-center py-12 px-10">
          <h3 className="font-[family-name:var(--font-playfair)] text-[28px] font-normal tracking-[0.06em] text-[#0a0a0a]">
            Arquitetura Inteligente
          </h3>
        </div>

        <div className="grid grid-cols-4 h-[320px]">
          <div className="relative overflow-hidden flex items-end p-7 rounded-lg border border-[#e8e6e0] bg-[#0a0a0a]">
            <Image src="/site4.JPG" alt="" fill sizes="25vw" className="object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
            <span className="relative z-10 text-[10px] tracking-[0.2em] uppercase text-[#f5f4f0]/70">Imobiliário Digital</span>
          </div>
          <div className="relative overflow-hidden flex items-end p-7 rounded-lg border border-[#e8e6e0] bg-[#0a0a0a]">
            <Image src="/site5.JPG" alt="" fill sizes="25vw" className="object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
            <span className="relative z-10 text-[10px] tracking-[0.2em] uppercase text-[#f5f4f0]/70">Residência</span>
          </div>
          <div className="relative overflow-hidden flex items-end p-7 rounded-lg border border-[#e8e6e0] bg-[#0a0a0a]">
            <Image src="/site6.JPG" alt="" fill sizes="25vw" className="object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
            <span className="relative z-10 text-[10px] tracking-[0.2em] uppercase text-[#f5f4f0]/70">Lucratividade Estruturada</span>
          </div>
          <div className="relative overflow-hidden flex items-end p-7 rounded-lg border border-[#e8e6e0] bg-[#0a0a0a]">
            <Image src="/site7.JPG" alt="" fill sizes="25vw" className="object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
            <span className="relative z-10 text-[10px] tracking-[0.2em] uppercase text-[#f5f4f0]/70">Blindagem Imaterial</span>
          </div>
        </div>
      </div>

      {/* PARTNER STRIP */}
      <div className="bg-[#e8e6e0]">
        <div className="flex items-center justify-center rounded-lg border border-[#e8e6e0] bg-[#0a0a0a] py-6 px-10">
          <span className="font-[family-name:var(--font-playfair)] text-[13px] tracking-[0.3em] uppercase text-[#f5f4f0]">
            Bayview Easy Driving Rentals
          </span>
        </div>
      </div>

      {/* SUNSET BLOCK */}
      <div className="bg-[#e8e6e0]">
        <div className="relative overflow-hidden rounded-lg border border-[#e8e6e0] bg-[#0d0d0d] h-[360px]">
          <Image src="/site6.JPG" alt="" fill sizes="100vw" className="object-cover grayscale" />
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#f5f4f0] border-t border-[#e8e6e0] pt-[72px] px-10 pb-12">
        <div className="grid grid-cols-2 gap-20 max-w-[1000px] mx-auto">
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-[22px] font-normal mb-9 text-[#0a0a0a]">fale conosco</h4>
            <div className="flex flex-col gap-2.5">
              <p className="text-[12px] text-[#3a3835] tracking-[0.04em] leading-[1.7]">(47) 98888-0000</p>
              <p className="text-[12px] text-[#3a3835] tracking-[0.04em] leading-[1.7]">contato@contato.com</p>
              <p className="text-[12px] text-[#3a3835] tracking-[0.04em] leading-[1.7]">R. Dorvalino Voltolini, 179<br />Perequê - Porto Belo/SC</p>
              <p className="text-[12px] text-[#3a3835] tracking-[0.04em] leading-[1.7]">CNPJ: 50.550.515/0001-33</p>
            </div>
            <div className="flex gap-4 mt-7">
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-[#b0aca4] text-[12px] text-[#3a3835] no-underline transition-colors hover:border-[#0a0a0a] hover:text-[#0a0a0a]">IG</a>
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-[#b0aca4] text-[12px] text-[#3a3835] no-underline transition-colors hover:border-[#0a0a0a] hover:text-[#0a0a0a]">𝕏</a>
              <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full border border-[#b0aca4] text-[12px] text-[#3a3835] no-underline transition-colors hover:border-[#0a0a0a] hover:text-[#0a0a0a]">in</a>
            </div>
          </div>
          <div>
            <div className="flex flex-col.5">
              <input
                type="text"
                placeholder="Name"
                className="bg-transparent border-0 border-b border-[#b0aca4] py-2.5 text-[12px] text-[#0a0a0a] outline-none transition-colors focus:border-[#0a0a0a] placeholder:text-[#b0aca4] placeholder:text-[11px] placeholder:tracking-[0.1em]"
              />
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-0 border-b border-[#b0aca4] py-2.5 text-[12px] text-[#0a0a0a] outline-none transition-colors focus:border-[#0a0a0a] placeholder:text-[#b0aca4] placeholder:text-[11px] placeholder:tracking-[0.1em]"
              />
              <textarea
                placeholder="Leave a message"
                className="bg-transparent border-0 border-b border-[#b0aca4] py-2.5 text-[12px] text-[#0a0a0a] outline-none resize-none min-h-[80px] transition-colors focus:border-[#0a0a0a] placeholder:text-[#b0aca4] placeholder:text-[11px] placeholder:tracking-[0.1em]"
              />
              <button
                type="button"
                className="self-start bg-[#0a0a0a] text-[#f5f4f0] border-none py-[13px] px-10 text-[10px] tracking-[0.22em] uppercase cursor-pointer transition-colors hover:bg-[#8a7a5a]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center max-w-[1000px] mx-auto mt-[60px] pt-7 border-t border-[#e8e6e0]">
          <p className="text-[10px] text-[#b0aca4] tracking-[0.12em]">Seu nome de perfil no Canva não será compartilhado. Nunca envie senhas.</p>
          <p className="text-[10px] text-[#b0aca4] tracking-[0.12em]">© Empírus – Tourmaline Tower</p>
        </div>
      </footer>
    </div>
  );
}
