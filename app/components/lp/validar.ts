import type { CampoLead, EstadoLead, OrigemLead } from "./lead";
import { FAIXAS_CAPITAL, PARTICIPOU_SCP } from "./lp-config";
import type { Utms } from "./utms";

/**
 * Regras de validação e normalização do lead.
 *
 * Separado de `actions.ts` porque é a única parte com regra de negócio de
 * verdade — e a única que se quer poder exercitar sozinha, sem subir servidor
 * nem simular um POST de Server Action. Lá fica o transporte (ler o FormData,
 * falar com o webhook); aqui, o que é certo e errado.
 */

/** Aceita acentos, hífen e apóstrofo; recusa dígitos e nome de uma letra só. */
const NOME = /^[\p{L}][\p{L}\s'.-]{1,}$/u;

/**
 * Checagem de formato, não de existência: o objetivo é impedir erro de
 * digitação óbvio sem barrar endereço válido incomum. Quem valida de fato é
 * o e-mail de entrega.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Os DDDs que existem de fato no Brasil.
 *
 * A faixa 11–99 tem buracos (não existe 20, 23, 25, 26, 29, 30, 36, 39, 40,
 * 50, 52, 56–60, 70, 72, 76, 78, 80 nem 90), e são justamente os que um dedo
 * escorregando no teclado produz. Conferir contra a lista pega o erro de
 * digitação que uma checagem de faixa deixa passar.
 */
const DDDS = new Set([
  "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "21", "22", "24", "27", "28",
  "31", "32", "33", "34", "35", "37", "38",
  "41", "42", "43", "44", "45", "46", "47", "48", "49",
  "51", "53", "54", "55",
  "61", "62", "63", "64", "65", "66", "67", "68", "69",
  "71", "73", "74", "75", "77", "79",
  "81", "82", "83", "84", "85", "86", "87", "88", "89",
  "91", "92", "93", "94", "95", "96", "97", "98", "99",
]);

/**
 * A recusa que a pessoa lê, no campo, quando o número não fecha.
 *
 * Mora aqui junto da regra porque o cliente barra o envio com a mesma função
 * e precisa dizer exatamente a mesma coisa — duas mensagens para a mesma
 * recusa é como o formulário passa a se contradizer.
 */
export const ERRO_WHATSAPP =
  "Número fora do padrão brasileiro. Use DDD + 9 dígitos — ex.: (47) 99999-8888.";

/**
 * Normaliza para E.164 brasileiro (`5547999998888`), que é o formato que
 * WhatsApp e a maioria dos CRMs esperam. Devolve `null` quando não é um
 * celular brasileiro válido.
 *
 * Regra: DDD que exista, o 9 do celular, e 8 dígitos depois dele — 11 no
 * total. Números que já venham com o 55 na frente são aceitos e não ganham
 * outro; o zero da operadora colado na frente cai fora, porque aí o par
 * inicial deixa de ser um DDD da lista.
 *
 * Fixo de 10 dígitos não passa: o campo é de WhatsApp, e um fixo ali é quase
 * sempre engano de quem digitou o telefone errado.
 */
export function normalizarWhatsApp(valor: string) {
  let numero = valor.replace(/\D/g, "");

  if (numero.length > 11 && numero.startsWith("55")) {
    numero = numero.slice(2);
  }

  if (numero.length !== 11) return null;
  if (!DDDS.has(numero.slice(0, 2))) return null;
  /* Todo celular brasileiro ganhou o nono dígito, e ele é sempre 9. */
  if (numero[2] !== "9") return null;

  return `55${numero}`;
}

/** `true` se o valor está entre as opções que a página realmente ofereceu. */
function daLista(valor: string, lista: readonly { value: string }[]) {
  return lista.some((opcao) => opcao.value === valor);
}

/** O lead já validado e pronto para sair — o payload que o webhook recebe. */
export type Lead = {
  origem: OrigemLead;
  nome: string;
  email: string;
  /** sempre em E.164: `5547999998888` */
  whatsapp: string;
  experiencia?: string;
  faixaCapital?: string;
  /** a campanha que trouxe a visita; ausente quando não veio nenhuma */
  utm?: Utms;
  enviadoEm: string;
};

export type Resultado =
  | { ok: true; lead: Lead }
  | { ok: false; erros: NonNullable<EstadoLead["erros"]> };

/**
 * Valida o que veio do formulário.
 *
 * A LP01 não manda `faixaCapital` nem `experiencia` — o brief proíbe
 * qualificação naquela página —, e os dois só são exigidos quando a origem é
 * a LP02. Os selects são conferidos contra a lista de opções, e não apenas
 * "não vazio": o campo chega pelo cliente e pode trazer qualquer string.
 *
 * As UTMs não são validadas, são anexadas: chegam já limpas de `utms.ts` e
 * não entram em nenhuma das recusas abaixo. Campanha faltando é um dado a
 * menos para o Comercial, nunca um motivo para perder o cadastro.
 */
export function validarLead(
  origem: OrigemLead,
  entrada: Record<CampoLead, string>,
  utm?: Utms
): Resultado {
  const nome = entrada.nome.trim();
  const email = entrada.email.trim().toLowerCase();
  const experiencia = entrada.experiencia.trim();
  const faixaCapital = entrada.faixaCapital.trim();

  const erros: NonNullable<EstadoLead["erros"]> = {};

  if (!NOME.test(nome)) {
    erros.nome = "Informe seu nome completo.";
  }

  const whatsapp = normalizarWhatsApp(entrada.whatsapp);
  if (!whatsapp) {
    erros.whatsapp = ERRO_WHATSAPP;
  }

  if (!EMAIL.test(email)) {
    erros.email = "Informe um e-mail válido.";
  }

  if (origem === "lp2-interesse") {
    if (!daLista(experiencia, PARTICIPOU_SCP)) {
      erros.experiencia = "Selecione uma opção.";
    }
    if (!daLista(faixaCapital, FAIXAS_CAPITAL)) {
      erros.faixaCapital = "Selecione uma faixa.";
    }
  }

  if (Object.keys(erros).length > 0 || !whatsapp) {
    return { ok: false, erros };
  }

  return {
    ok: true,
    lead: {
      origem,
      nome,
      email,
      whatsapp,
      /* só existem na LP02; ficam fora do payload da LP01 em vez de irem vazios */
      ...(origem === "lp2-interesse" ? { experiencia, faixaCapital } : {}),
      /* mesma ideia da linha de cima: a chave não existe quando não há valor */
      ...(utm ? { utm } : {}),
      enviadoEm: new Date().toISOString(),
    },
  };
}
