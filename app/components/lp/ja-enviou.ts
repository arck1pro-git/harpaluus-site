import { useSyncExternalStore } from "react";

import type { OrigemLead } from "./lead";

/**
 * "Este navegador já mandou o cadastro desta LP."
 *
 * Gravada quando o servidor aceita o cadastro, é o que faz quem volta à LP
 * encontrar "Você já enviou" no lugar do formulário — em vez de um segundo
 * lead no CRM e um segundo Lead no Meta, com outro `event_id`, que nenhum dos
 * dois deduplica.
 *
 * `localStorage`, ao contrário das UTMs (ver `utms.ts`): a ideia aqui é
 * justamente reconhecer quem volta outro dia, não só nesta visita.
 *
 * Uma marca por LP, e não uma para o site: cada página é uma conversão
 * diferente. Quem pegou o checklist da LP01 ainda pode querer conhecer uma
 * operação na LP03 — e esse cadastro o Comercial quer receber.
 */
const chave = (origem: OrigemLead) => `amaan:lead-enviado:${origem}`;

/* Reserva para quando o storage está bloqueado (aba anônima em alguns
   navegadores): sem ele a marca não sobrevive à visita, mas ao menos vale
   até a pessoa sair da página. */
const enviadosNaPagina = new Set<OrigemLead>();
const ouvintes = new Set<() => void>();

export function marcarLeadEnviado(origem: OrigemLead) {
  enviadosNaPagina.add(origem);
  try {
    window.localStorage.setItem(chave(origem), new Date().toISOString());
  } catch {
    /* ver a reserva acima */
  }
  ouvintes.forEach((avisar) => avisar());
}

export function leadJaEnviado(origem: OrigemLead) {
  if (enviadosNaPagina.has(origem)) return true;
  try {
    return window.localStorage.getItem(chave(origem)) !== null;
  } catch {
    return false;
  }
}

/* O evento `storage` é o envio feito em outra aba da mesma LP. */
function inscrever(avisar: () => void) {
  ouvintes.add(avisar);
  window.addEventListener("storage", avisar);
  return () => {
    ouvintes.delete(avisar);
    window.removeEventListener("storage", avisar);
  };
}

/**
 * A marca, para a renderização. No servidor e na hidratação é sempre
 * `false` — lá não existe `localStorage` —, e o formulário que veio no HTML
 * troca para o "já enviou" logo depois de hidratar.
 */
export function useLeadJaEnviado(origem: OrigemLead) {
  return useSyncExternalStore(
    inscrever,
    () => leadJaEnviado(origem),
    () => false
  );
}
