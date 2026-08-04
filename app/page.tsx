import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Harpaluus Incorporadora — Em manutenção",
  description:
    "Estamos em manutenção. Em breve o site oficial da Harpaluus Incorporadora estará no ar.",
};

const WHATSAPP_URL =
  "https://wa.me/554792399626?text=" +
  encodeURIComponent(
    "Olá! Vim pelo site da Harpaluus e gostaria de falar com o time comercial."
  );

export default function Manutencao() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f5f4f0] px-6 py-16 text-[#0a0a0a] font-[family-name:var(--font-raleway)]">
      {/* textura de bolinhas (dots) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(#0a0a0a 1.6px, transparent 1.6px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* clareado do centro para suavizar a textura atrás do conteúdo */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at center, #f5f4f0 0%, #f5f4f0 42%, transparent 90%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-[620px] flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Harpaluus Incorporadora"
          width={360}
          height={120}
          className="h-auto w-[260px] object-contain sm:w-[320px]"
          priority
        />

        <span className="mt-14 text-[10px] uppercase tracking-[0.3em] text-[#8a857c]">
          Em manutenção
        </span>

        <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-[30px] leading-[1.25] font-normal tracking-[0.02em] text-[#0a0a0a] sm:text-[40px]">
          Estamos em manutenção
        </h1>

        <p className="mt-6 max-w-[440px] text-[14px] leading-[1.8] text-[#3a3835]">
          Em breve o site oficial da Harpaluus Incorporadora estará no ar. Enquanto
          isso, fale diretamente com o nosso time comercial.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-11 inline-flex items-center gap-3 rounded-lg bg-[#0a0a0a] px-9 py-[15px] text-[10px] uppercase tracking-[0.22em] text-[#f5f4f0] no-underline transition-colors hover:bg-[#8a7a5a]"
        >
          Falar com o time comercial
          <ArrowUpRight size={16} strokeWidth={1.4} />
        </a>

        <p className="mt-5 text-[12px] tracking-[0.06em] text-[#8a857c]">
          (47) 9239-9626
        </p>
      </div>
    </main>
  );
}
