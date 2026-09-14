import { Fragment } from "react";

/**
 * Marca em dourado os trechos entre « » do texto vindo dos arquivos de
 * conteúdo (`site-config.ts` na home, `lp-config.ts` nas landing pages).
 *
 * O gradiente é a versão de fundo claro: vai do dourado da marca ao bronze,
 * porque a rampa clara some sobre branco. A faixa de cor é estreita de
 * propósito — num trecho inline que quebra linha o `background-clip: text`
 * reinicia o gradiente a cada linha, e com dois tons próximos isso passa
 * despercebido. Vai em `strong` porque o trecho é de fato o mais importante da
 * frase, mas sem o peso de negrito: quem destaca aqui é a cor.
 */
export function ComDestaque({ texto }: { texto: string }) {
  return texto.split(/«([^»]+)»/g).map((parte, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-gradiente-dourado-escuro font-normal">
        {parte}
      </strong>
    ) : (
      <Fragment key={i}>{parte}</Fragment>
    )
  );
}

/**
 * Mesmo destaque, para as seções em azul-escuro.
 *
 * Sobre fundo escuro o bronze fecha demais e o trecho destacado fica mais
 * apagado que o texto ao redor — o oposto do que o destaque quer. Aqui vale
 * a rampa clara da marca, que sobre o azul-escuro tem contraste de sobra.
 */
export function ComDestaqueClaro({ texto }: { texto: string }) {
  return texto.split(/«([^»]+)»/g).map((parte, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-gradiente-dourado font-normal">
        {parte}
      </strong>
    ) : (
      <Fragment key={i}>{parte}</Fragment>
    )
  );
}
