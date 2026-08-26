import Image from "next/image";

export default function SoberaniaSection() {
  return (
    <div className="grid grid-cols-[5vw_380px_1fr] min-h-[520px] bg-linha">
      {/* container no espaço da lateral esquerda */}
      <div className="rounded-lg border border-linha bg-fundo" />
      <div className="relative overflow-hidden rounded-lg border border-linha bg-azul-escuro">
        <Image src="/site4.JPG" alt="" fill sizes="380px" className="object-cover" />
      </div>
      <div className="flex flex-col justify-center rounded-lg border border-linha bg-fundo py-20 px-16">
        <h3 className="font-[family-name:var(--font-playfair)] text-[30px] font-normal mb-7 text-azul-escuro">
          A Soberania da Eficiência
        </h3>
        <p className="text-[13.5px] leading-[1.9] text-azul max-w-[560px]">
          Em um mercado de commodities, a soberania nasce da precisão técnica e da preservação patrimonial.<br /><br />
          O Tourmaline Tower é um ativo imobiliário de alta performance: a primeira infraestrutura física de Porto Belo totalmente ativada por um sistema operacional predial.<br /><br />
          Nossa engenharia de performance desenha a tipologia para a eficiência de capital, transformando a governança predial em uma máquina de yield que reduz riscos e protege o preço no longo prazo.<br /><br />
          Aqui, a inteligência preditiva e a neuroarquitetura são o alicerce de uma harmonia operacional que devolve o luxo mais escasso da era moderna: o seu tempo.<br /><br />
          Entregamos um ecossistema digital projetado para performar, onde a tecnologia serve à vida e a inteligência garante a perpetuidade do valor. Tourmaline Tower: a arquitetura na era da inteligência.
        </p>
      </div>
    </div>
  );
}
