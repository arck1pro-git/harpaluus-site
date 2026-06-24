import Image from "next/image";

export default function GallerySection() {
  return (
    <div className="flex items-stretch bg-[#e8e6e0]">
      {/* container lateral esquerda */}
      <div className="w-[16%] rounded-lg border border-[#e8e6e0] bg-[#f5f4f0]" />

      {/* grids centrais */}
      <div className="flex flex-1 flex-col">
        <div className="grid grid-cols-4 h-[220px]">
          <div className="relative overflow-hidden rounded-lg border border-[#e8e6e0] bg-[#0a0a0a]">
            <Image src="/tourmaline.png" alt="" fill sizes="20vw" className="object-cover grayscale transition-[filter] duration-[2000ms] ease-out hover:grayscale-0" />
          </div>
          <div className="relative overflow-hidden rounded-lg border border-[#e8e6e0] bg-[#0a0a0a]">
            <Image src="/tourmaline2.png" alt="" fill sizes="20vw" className="object-cover grayscale transition-[filter] duration-[2000ms] ease-out hover:grayscale-0" />
          </div>
          <div className="relative overflow-hidden rounded-lg border border-[#e8e6e0] bg-[#0a0a0a]">
            <Image src="/tourmaline3.png" alt="" fill sizes="20vw" className="object-cover grayscale transition-[filter] duration-[2000ms] ease-out hover:grayscale-0" />
          </div>
          <div className="relative overflow-hidden rounded-lg border border-[#e8e6e0] bg-[#0a0a0a]">
            <Image src="/tourmaline4.png" alt="" fill sizes="20vw" className="object-cover grayscale transition-[filter] duration-[2000ms] ease-out hover:grayscale-0" />
          </div>
        </div>
        <div className="grid grid-cols-2 h-[200px]">
          <div className="relative overflow-hidden rounded-lg border border-[#e8e6e0] bg-[#0a0a0a]">
            <Image src="/tourmaline5.png" alt="" fill sizes="40vw" className="object-cover grayscale transition-[filter] duration-[2000ms] ease-out hover:grayscale-0" />
          </div>
          <div className="relative overflow-hidden rounded-lg border border-[#e8e6e0] bg-[#0a0a0a]">
            <Image src="/tourmaline%20perspectiva.png" alt="" fill sizes="40vw" className="object-cover grayscale transition-[filter] duration-[2000ms] ease-out hover:grayscale-0" />
          </div>
        </div>

        {/* tourmaline */}
        <div className="group relative flex min-h-[480px] flex-col items-center justify-end overflow-hidden rounded-lg border border-[#e8e6e0] bg-[#0a0a0a] py-[60px] px-10">
          <Image src="/tourmaline4.png" alt="" fill sizes="68vw" className="object-cover grayscale transition-[filter] duration-[2000ms] ease-out group-hover:grayscale-0" />
          <div className="absolute inset-0 bg-black/45" />
          <h2 className="font-[family-name:var(--font-playfair)] text-[42px] text-[#f5f4f0] font-normal tracking-[0.06em] absolute top-[60px] left-[60px]">
            Tourmaline Tower
          </h2>
          <a href="#" className="inline-block rounded-full border border-white/40 text-[#f5f4f0] text-[10px] tracking-[0.25em] uppercase px-9 py-3 no-underline transition-colors hover:bg-white/10 hover:border-[#f5f4f0]">
            Explore
          </a>
        </div>
      </div>

      {/* container lateral direita */}
      <div className="w-[16%] rounded-lg border border-[#e8e6e0] bg-[#f5f4f0]" />
    </div>
  );
}
