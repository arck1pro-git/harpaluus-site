import Link from "next/link";

import { Dots } from "../landing/dots";
import { Reveal } from "../landing/reveal";
import { CNPJ, endereco, marca, ROTA_PRIVACIDADE } from "../landing/site-config";

/**
 * Fechamento das duas LPs — os blocos "06. FECHAMENTO" e "12. FECHAMENTO"
 * dos briefs, que são o próprio rodapé.
 *
 * Três decisões vêm escritas nos briefs e explicam a sobriedade:
 *
 * - "Sem CTA novo concorrente": nenhum botão aqui. A conversão da página é
 *   uma só, e ela ficou no formulário logo acima.
 * - "Rodapé institucional e jurídico discreto": sem colunas de navegação,
 *   sem redes sociais, sem WhatsApp, nada que tire o visitante do funil.
 *   O único link é o da Política de Privacidade, que a página deve a quem
 *   deixa os dados no formulário.
 * - A tese de fecho é opcional: a LP02 perdeu a dela e fecha só na
 *   assinatura, então a marca não pode depender de ter uma frase embaixo.
 *
 * CNPJ e endereço fecham a identificação de quem fala: a mesma pergunta que
 * a marca no topo responde, agora com a pessoa jurídica por extenso.
 */
export function LpFooter({
  titulo,
  tese,
}: {
  /** assinatura da marca, como o brief da página escreveu */
  titulo: string;
  /** a tese central do funil. A LP02 fecha sem nenhuma. */
  tese?: string;
}) {
  return (
    <footer className="relative overflow-clip bg-azul-escuro text-white">
      {/* O rodapé da home fecha com a mesma textura no canto superior direito;
          sem ela, o último bloco das LPs seria o único azul chapado. */}
      <Dots
        canto="superior-direito"
        tone="claro"
        tamanho="h-[560px] w-[560px] md:h-[1040px] md:w-[1040px]"
      />

      <div className="faixa relative py-[clamp(4.5rem,9vw,7rem)]">
        <Reveal className="max-w-[760px]">
          <span className="block h-px w-[44px] bg-dourado" />

          <p className="tipo-label mt-7 text-dourado-claro">{titulo}</p>

          {tese && (
            <p className="tipo-lead mt-6 text-white">
              {tese}
            </p>
          )}
        </Reveal>

        <Reveal
          delay={140}
          className="mt-12 flex flex-col gap-7 border-t border-white/10 pt-9 md:mt-16 md:flex-row md:items-start md:justify-between md:gap-12"
        >
          {/* no celular o endereço vem antes, fechando a identificação; da
              tela média em diante o link vai para a esquerda e o endereço
              fica encostado à direita, onde sempre esteve */}
          <address className="text-[13px] leading-[1.75] font-light text-white not-italic md:shrink-0 md:text-right">
            <span className="block">{marca}</span>
            <span className="block">CNPJ {CNPJ}</span>
            <span className="block">
              {endereco.rua} · {endereco.bairro}
            </span>
            <span className="block">
              {endereco.cidade}/{endereco.uf}
            </span>
          </address>

          <Link
            href={ROTA_PRIVACIDADE}
            className="self-start text-[13px] leading-[1.75] font-light text-white/70 underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-dourado md:order-first"
          >
            Política de Privacidade
          </Link>
        </Reveal>
      </div>
    </footer>
  );
}
