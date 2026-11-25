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
 * Título com um trecho em dourado itálico: a Playfair itálica, no gradiente
 * dourado da marca.
 *
 * O trecho vem separado do título (`destaque`), e não marcado com « » dentro
 * dele, porque os mesmos títulos de `site-config.ts` também são lidos pelos
 * rascunhos de `app/versoes/`, que mostrariam as aspas. Se o texto do título
 * mudar e o trecho não estiver mais nele, o título sai inteiro, sem destaque.
 *
 * `fundo` escolhe a rampa: a clara sobre azul-escuro ou foto, a do bronze
 * sobre branco (a clara some no branco). O `pe`/`-me` de 0,12em existe por
 * causa do itálico: a última letra inclinada passa da caixa do texto, e o
 * gradiente, que é fundo recortado pelo texto, cortaria a ponta dela. O
 * respiro estende o fundo e a margem negativa devolve o espaço, para a
 * pontuação seguinte não se afastar.
 */
export function TituloComDestaque({
  texto,
  destaque,
  fundo = "claro",
  marca = false,
  brilho = false,
}: {
  texto: string;
  destaque?: string;
  fundo?: "claro" | "escuro";
  /** o trecho é nome de marca: o tradutor automático do navegador não mexe */
  marca?: boolean;
  /** uma faixa de luz atravessa o trecho de tempos em tempos
      (`.brilho-dourado`, em globals.css); só vale sobre fundo escuro */
  brilho?: boolean;
}) {
  const inicio = destaque ? texto.lastIndexOf(destaque) : -1;
  if (!destaque || inicio < 0) return texto;

  const gradiente =
    fundo === "escuro"
      ? `text-gradiente-dourado${brilho ? " brilho-dourado" : ""}`
      : "text-gradiente-dourado-escuro";

  return (
    <>
      {texto.slice(0, inicio)}
      <em
        translate={marca ? "no" : undefined}
        className={`${gradiente} -me-[0.12em] pe-[0.12em] italic [box-decoration-break:clone] [-webkit-box-decoration-break:clone]`}
      >
        {destaque}
      </em>
      {texto.slice(inicio + destaque.length)}
    </>
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
