import { Reveal } from "../landing/reveal";

/**
 * Diagrama de etapas — a peça de maior peso visual da LP02.
 *
 * Os briefs pedem "simples, horizontal no desktop e vertical no mobile", e é
 * literalmente o que acontece: o mesmo markup, com o trilho (losango + linha)
 * virando de eixo no `md`. No celular ele lê como uma lista com um fio à
 * esquerda; no desktop, como uma régua de processo.
 *
 * Vai em `<ol>` porque a ordem é o conteúdo: "terreno → viabilidade → projeto"
 * só significa alguma coisa nessa sequência, e é assim que um leitor de tela
 * precisa anunciar. As setas do brief viram o fio contínuo — a mesma
 * informação, sem sete glifos repetidos na tela.
 */

type Tom = "claro" | "escuro";

/**
 * `normal` é a régua de processo das seções 02 e 08.
 * `cadeia` é a origem do resultado (seção 06), que o brief define como o
 * maior destaque visual da página: mesma estrutura, tipografia maior.
 */
type Variante = "normal" | "cadeia";

export function Fluxo({
  etapas,
  tom = "claro",
  variante = "normal",
  className = "",
}: {
  etapas: readonly string[];
  tom?: Tom;
  variante?: Variante;
  className?: string;
}) {
  const cadeia = variante === "cadeia";

  const corLinha = tom === "escuro" ? "bg-white/20" : "bg-linha";
  const corTexto = tom === "escuro" ? "text-white" : "text-azul-escuro";
  const corNumero = tom === "escuro" ? "text-dourado-claro" : "text-dourado-escuro";

  return (
    <ol className={`flex flex-col md:flex-row md:items-stretch ${className}`}>
      {etapas.map((etapa, i) => {
        const ultimo = i === etapas.length - 1;

        return (
          <Reveal
            key={etapa}
            as="li"
            delay={i * 90}
            className="flex gap-5 pb-7 last:pb-0 md:flex-1 md:flex-col md:gap-0 md:pb-0"
          >
            {/* Trilho. No mobile é uma coluna (losango em cima, fio descendo);
                no desktop a mesma dupla deita e o fio corre para a direita. */}
            <div className="flex shrink-0 flex-col items-center self-stretch md:w-full md:flex-row">
              <span
                aria-hidden
                className={`mt-[6px] h-[7px] w-[7px] shrink-0 rotate-45 border border-dourado md:mt-0 ${
                  cadeia ? "bg-dourado" : ""
                }`}
              />
              {/* o último item não puxa fio: o processo termina nele */}
              {!ultimo && (
                <span
                  aria-hidden
                  className={`mt-2 w-px flex-1 md:mt-0 md:ml-2 md:h-px md:w-auto md:flex-1 ${corLinha}`}
                />
              )}
            </div>

            <div className="min-w-0 pr-4 md:pt-5 md:pr-6">
              <span className={`tipo-numero block ${corNumero}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={`mt-2.5 font-medium ${corTexto} ${
                  cadeia
                    ? "text-[15px] leading-[1.4] tracking-[-0.01em] md:text-[17px]"
                    : "tipo-label leading-[1.5]"
                }`}
              >
                {etapa}
              </p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
