import Image from "next/image";

type Destaque = { numero: string; titulo: string; img: string };

const DESTAQUES: Destaque[] = [
  { numero: "01", titulo: "Imobiliário Digital", img: "/site4.JPG" },
  { numero: "02", titulo: "Residência", img: "/site5.JPG" },
  { numero: "03", titulo: "Lucratividade Estruturada", img: "/site6.JPG" },
  { numero: "04", titulo: "Blindagem Imaterial", img: "/site7.JPG" },
];

/** faixa vazia na mesma altura do header, com a aurora branca desfocada */
function Faixa() {
  return (
    <div className="relative flex h-16 items-center justify-center overflow-hidden rounded-lg border border-linha bg-fundo px-12">
      {/* aurora blur branco vindo do centro */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-72 w-[55%] rounded-full bg-white opacity-95 blur-3xl" />
        <div className="absolute h-44 w-[35%] rounded-full bg-white opacity-90 blur-2xl" />
      </div>
    </div>
  );
}

export default function PilaresDestaque() {
  return (
    // sem h-screen: a seção passa a ser faixa + cards + faixa
    <section className="flex flex-col bg-linha">
      <Faixa />

      {/* cards com altura reduzida */}
      <div className="flex h-[60vh] items-stretch">
        {/* faixa de listras à esquerda */}
        <div
          className="hidden flex-1 rounded-lg border border-linha bg-fundo bg-listras md:block"
        />

        {/* no desktop os 4 cards somam metade da tela (12.5vw cada) */}
        <div className="grid w-full grid-cols-2 grid-rows-2 md:w-[50vw] md:grid-cols-4 md:grid-rows-1">
          {DESTAQUES.map((d) => (
            <article
              key={d.numero}
              className="group relative overflow-hidden rounded-lg border border-linha bg-azul-escuro"
            >
              <Image
                src={d.img}
                alt=""
                fill
                sizes="(min-width: 768px) 12.5vw, 50vw"
                className="object-cover"
              />
              <div className="relative z-10 flex h-full flex-col justify-between p-7">
                <span className="text-[10px] tracking-[0.25em] uppercase text-dourado">
                  {d.numero}
                </span>
                <h3 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal leading-[1.2] text-fundo">
                  {d.titulo}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* faixa de listras à direita */}
        <div
          className="hidden flex-1 rounded-lg border border-linha bg-fundo bg-listras md:block"
        />
      </div>

      <Faixa />
    </section>
  );
}
