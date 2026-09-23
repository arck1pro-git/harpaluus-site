import type { OrigemLead } from "./lead";

/**
 * O que o Pixel (navegador) e a API de Conversões (servidor) precisam dizer
 * igual para o Meta juntar os dois lados de um mesmo evento.
 *
 * Fica fora de `meta-pixel.tsx` porque aquele é `"use client"`: importado de
 * um módulo de servidor, ele não entrega valores, só referências de cliente.
 */

export const PIXEL_ID = "1124238353883498";

/** o nome com que cada LP aparece no Gerenciador de Eventos */
const CONTEUDO: Record<OrigemLead, string> = {
  "lp1-checklist": "LP01 · Checklist SCP",
  "lp2-interesse": "LP02 · Participação SCP",
};

export function conteudo(origem: OrigemLead) {
  return { content_name: CONTEUDO[origem], content_category: "SCP imobiliária" };
}

/**
 * Os eventos de conversão de cada LP. A LP01 soma `CompleteRegistration`,
 * porque a troca ali é o material gratuito.
 */
export function eventosDeConversao(origem: OrigemLead) {
  return origem === "lp1-checklist" ? ["Lead", "CompleteRegistration"] : ["Lead"];
}

/**
 * O id que o navegador gera no envio e manda nos dois caminhos. É ele que faz
 * o Meta contar o cadastro uma vez só, e não uma pelo Pixel e outra pelo
 * servidor. Chega por campo oculto, então é conferido antes de ser usado.
 */
export function idDeEventoValido(valor: string) {
  return /^[\w-]{8,64}$/.test(valor) ? valor : undefined;
}
