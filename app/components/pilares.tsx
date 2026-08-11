import Image from "next/image";

type Grupo = { titulo: string; itens: string[] };
type PilarData = {
  numero: string;
  titulo: string;
  frase: string;
  resumo: string;
  img: string;
  grupos: Grupo[];
};

const PILARES: PilarData[] = [
  {
    numero: "01",
    titulo: "Sistema Operacional Predial",
    frase: "Infraestrutura inteligente que reduz risco e custo ao longo do tempo.",
    resumo:
      "Monitoramento, prevenção e segurança automatizada que reduzem risco e custo ao longo de todo o ciclo do edifício.",
    img: "/tourmaline.png",
    grupos: [
      {
        titulo: "Monitoramento e Prevenção",
        itens: [
          "Gestão preventiva de sistemas hidráulicos e elétricos",
          "Monitoramento técnico contínuo",
          "Controle inteligente de elevadores",
          "Alertas automatizados de manutenção",
        ],
      },
      {
        titulo: "Eficiência Condominial",
        itens: [
          "Telemetria individual de água, gás e energia",
          "Redução de desperdício e justiça no rateio",
          "Transparência operacional via aplicativo",
        ],
      },
      {
        titulo: "Acesso e Segurança Inteligente",
        itens: [
          "Biometria facial e QR Code dinâmico",
          "Eliminação de chave física",
          "Gestão remota de acesso",
        ],
      },
    ],
  },
  {
    numero: "02",
    titulo: "Engenharia de Performance",
    frase: "Tipologia desenhada para eficiência de capital.",
    resumo:
      "Tipologia compacta desenhada para liquidez e eficiência de capital, com alta absorção em qualquer ciclo de mercado.",
    img: "/tourmaline2.png",
    grupos: [
      {
        titulo: "Ticket Inteligente",
        itens: [
          "Unidades entre 42m² e 64m²",
          "Ticket de entrada otimizado",
          "Alta absorção de mercado",
        ],
      },
      {
        titulo: "Giro e Rotatividade",
        itens: [
          "Maior taxa de ocupação",
          "Ideal para short stay e locação executiva",
          "Flexibilidade de uso",
        ],
      },
      {
        titulo: "Resiliência de Ciclo",
        itens: [
          "Público amplo (Agro, Tech, Executivo, Sucessão)",
          "Alta liquidez secundária",
          "Preparado para atravessar ciclos econômicos",
        ],
      },
    ],
  },
  {
    numero: "03",
    titulo: "Máquina de Yield Integrada",
    frase: "Infraestrutura física ativada por sistema operacional.",
    resumo:
      "Ambientes monetizáveis e gestão de performance que fazem o ativo nascer estruturado para performar.",
    img: "/tourmaline3.png",
    grupos: [
      {
        titulo: "Infraestrutura Monetizável",
        itens: [
          "Rooftop panorâmico",
          "Coworking integrado",
          "Lavanderia inteligente e minimarket interno",
        ],
      },
      {
        titulo: "Gestão de Performance",
        itens: [
          "Precificação dinâmica",
          "Gestão de plataformas",
          "Otimização de ocupação",
        ],
      },
      {
        titulo: "Arquitetura Landmark",
        itens: [
          "Torre com 31 pavimentos",
          "Rooftop no ponto mais alto da região",
          "Presença vertical dominante na Vila Nova",
        ],
      },
    ],
  },
  {
    numero: "04",
    titulo: "Experiência e Percepção de Valor",
    frase: "Percepção premium é o que protege preço no longo prazo.",
    resumo:
      "Neuroarquitetura, modernidade percebida e topografia estratégica que sustentam a percepção premium e protegem o preço.",
    img: "/tourmaline5.png",
    grupos: [
      {
        titulo: "Neuroarquitetura Aplicada",
        itens: [
          "Design biofílico",
          "Iluminação estratégica",
          "Integração com paisagem e descompressão",
        ],
      },
      {
        titulo: "Percepção de Modernidade",
        itens: [
          "Biometria facial e controle por aplicativo",
          "Infraestrutura tecnológica integrada",
          "Comunicação visual sofisticada",
        ],
      },
      {
        titulo: "Topografia Estratégica",
        itens: [
          "Implantação em cota elevada",
          "Distância equilibrada da praia",
          "Localização pensada para proteção patrimonial",
        ],
      },
    ],
  },
];

export default function PilaresSection() {
  return (
    <div className="grid h-screen w-screen grid-cols-1 grid-rows-[repeat(4,1fr)] bg-linha md:grid-cols-2 md:grid-rows-2">
      {PILARES.map((p) => (
        <div
          key={p.numero}
          className="group relative overflow-hidden rounded-lg border border-linha bg-fundo"
        >
          {/* texto por baixo */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center gap-3 px-12 py-10">
            <p className="text-[10px] tracking-[0.25em] uppercase text-dourado">
              Pilar {p.numero}
            </p>
            <h3 className="font-[family-name:var(--font-playfair)] text-[26px] font-normal leading-[1.15] text-verde-escuro">
              {p.titulo}
            </h3>
            <p className="text-[12px] italic text-verde leading-[1.6] max-w-[460px]">
              {p.frase}
            </p>
            <div className="mt-1 flex flex-col gap-2">
              {p.grupos.map((g) => (
                <p
                  key={g.titulo}
                  className="text-[11px] text-verde leading-[1.6] max-w-[480px]"
                >
                  <span className="font-semibold uppercase tracking-[0.08em] text-verde-escuro">
                    {g.titulo}
                  </span>
                  {" — "}
                  {g.itens.join(", ")}.
                </p>
              ))}
            </div>
          </div>

          {/* imagem de fundo com o título — some no hover, revelando o texto */}
          <div className="absolute inset-0 z-10 transition-opacity duration-700 ease-out group-hover:opacity-0">
            <Image
              src={p.img}
              alt=""
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <p className="absolute top-10 left-10 text-[10px] tracking-[0.25em] uppercase text-dourado">
              Pilar {p.numero}
            </p>
            <h3 className="absolute bottom-10 left-10 right-10 font-[family-name:var(--font-playfair)] text-[34px] font-normal leading-[1.15] text-fundo">
              {p.titulo}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
