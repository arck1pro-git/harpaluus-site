import { ComDestaque, TituloComDestaque } from "./com-destaque";
import { MarcaDagua } from "./marca-dagua";
import { Reveal } from "./reveal";
import { sobre as sobrePt } from "./site-config";
import { ABERTURA, CORPO, TITULO_SECAO } from "./tipografia";

/**
 * Quem é a Amaan: bloco editorial no tom claro da marca.
 *
 * Alinhado à esquerda, na mesma margem (`faixa`) do hero e das outras
 * seções — antes era uma coluna centralizada de 1080px, que começava 40px
 * para dentro da linha do resto da página. O título corre na largura
 * inteira, com o símbolo da Amaan apagado no canto de cima; abaixo, o grid
 * de 12 colunas põe o lead nas colunas 1 a 5 e os parágrafos de
 * desenvolvimento a partir da coluna 7, a mesma linha de divisão das outras
 * seções da home. O fundo é liso: as listras diagonais das laterais saíram.
 */
export function SobreSection({
  conteudo: sobre = sobrePt,
}: {
  /** o texto da seção; o padrão é o português, e `/alemao` passa o seu */
  conteudo?: typeof sobrePt;
} = {}) {
  return (
    <section id="sobre" className="ritmo-secao relative overflow-hidden bg-fundo">
      <MarcaDagua canto="superior-direito" />

      <div className="faixa relative">
        <Reveal>
          <h2 className={`${TITULO_SECAO} text-grafite`}>
            <TituloComDestaque texto={sobre.titulo} destaque={sobre.tituloDestaque} />
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-y-9 md:mt-14 lg:grid-cols-12 lg:gap-x-6">
          <Reveal delay={120} className="lg:col-span-5">
            <p className={`${ABERTURA} max-w-[34ch] text-grafite lg:max-w-none`}>
              <ComDestaque texto={sobre.lead} />
            </p>
          </Reveal>

          {/* no mobile a seção fica no título e no lead: os dois parágrafos
              de desenvolvimento só aparecem a partir de md */}
          <Reveal
            delay={200}
            className="hidden flex-col gap-6 md:flex lg:col-span-6 lg:col-start-7 lg:pt-[0.35rem]"
          >
            {sobre.paragrafos.map((texto) => (
              <p key={texto.slice(0, 24)} className={`${CORPO} max-w-[62ch] text-pedra`}>
                <ComDestaque texto={texto} />
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
