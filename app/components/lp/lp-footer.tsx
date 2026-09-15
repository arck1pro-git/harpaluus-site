import { Dots } from "../landing/dots";
import { Reveal } from "../landing/reveal";
import { CNPJ, endereco, marca } from "../landing/site-config";

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
 * - Quando existe aviso de risco, ele fica legível e não em letra de 10px:
 *   transparência é argumento de confiança, então é lida, não escondida.
 *
 * CNPJ e endereço fecham a identificação de quem fala: a mesma pergunta que
 * a marca no topo responde, agora com a pessoa jurídica por extenso.
 */
export function LpFooter({
  titulo,
  tese,
  aviso,
}: {
  /** assinatura da marca, como o brief da página escreveu */
  titulo: string;
  /** a tese central do funil, que a página inteira construiu */
  tese: string;
  /** aviso de risco da página. A LP02 fecha sem nenhum. */
  aviso?: string;
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

          <p className="tipo-lead mt-6 font-[family-name:var(--font-playfair)] text-white">
            {tese}
          </p>
        </Reveal>

        <Reveal
          delay={140}
          /* sem aviso, o endereço fica sozinho na linha: `justify-end` o
             mantém encostado à direita, onde ele já estava — `between` com
             um filho só o jogaria para a esquerda, embaixo da assinatura */
          className={`mt-12 border-t border-white/10 pt-9 md:mt-16 md:flex md:items-start md:gap-12 ${
            aviso ? "md:justify-between" : "md:justify-end"
          }`}
        >
          {/* o aviso vem primeiro na ordem de leitura: é o que importa */}
          {aviso && (
            <p className="max-w-[620px] text-[13px] leading-[1.75] font-light text-pedra-claro">
              {aviso}
            </p>
          )}

          <address className="mt-7 text-[13px] leading-[1.75] font-light text-pedra-claro not-italic md:mt-0 md:shrink-0 md:text-right">
            <span className="block">{marca}</span>
            <span className="block">CNPJ {CNPJ}</span>
            <span className="block">
              {endereco.rua} · {endereco.bairro}
            </span>
            <span className="block">
              {endereco.cidade}/{endereco.uf}
            </span>
          </address>
        </Reveal>
      </div>
    </footer>
  );
}
