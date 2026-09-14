/**
 * Formato do lead das duas LPs do Funil 1 — tipos e estado inicial.
 *
 * Vive fora de `actions.ts` por uma regra do React: um arquivo `"use server"`
 * só pode exportar funções async, porque tudo que ele exporta vira um
 * endpoint chamável pelo cliente. `ESTADO_INICIAL` é um objeto, então
 * exportá-lo de lá quebra a action em tempo de execução — e não no build,
 * que é o que torna o erro fácil de publicar sem perceber.
 */

/** De qual LP veio — vai junto no payload; o brief da LP02 pede origem identificada. */
export type OrigemLead = "lp1-checklist" | "lp2-interesse";

export type CampoLead = "nome" | "whatsapp" | "email" | "experiencia" | "faixaCapital";

export type EstadoLead = {
  status: "inicial" | "erro" | "sucesso";
  /** erro geral (falha de rede/servidor), acima do formulário */
  mensagem?: string;
  erros?: Partial<Record<CampoLead, string>>;
  /**
   * O que a pessoa digitou. Sem isto, um erro de validação apagaria o
   * formulário inteiro em navegadores sem JS — o `defaultValue` dos campos
   * lê daqui para reidratar.
   */
  valores?: Partial<Record<CampoLead, string>>;
};

export const ESTADO_INICIAL: EstadoLead = { status: "inicial" };
