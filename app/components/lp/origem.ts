import type { Utms } from "./utms";

/**
 * De onde veio uma visita que chegou sem UTM.
 *
 * As UTMs só existem quando quem fez o link as escreveu: o anúncio com os
 * parâmetros de URL preenchidos, o link da bio montado à mão. O resto do
 * tráfego — bio sem parâmetro, link colado no WhatsApp, busca no Google,
 * anúncio publicado sem os parâmetros — chegava ao CRM com os cinco campos
 * vazios, e campo vazio na ficha não distingue "o site perdeu a campanha" de
 * "não havia campanha nenhuma".
 *
 * Aqui o navegador conta o que sabe: o identificador de clique na URL, o
 * navegador embutido do app e a página de onde a pessoa veio. O resultado
 * ocupa as mesmas cinco chaves, e o `utm_campaign` é sempre `SEM_UTM` — é por
 * ele que o tráfego deduzido se separa, no CRM, do que veio de link marcado.
 *
 * É dedução, não medição. O navegador pode esconder a origem (política de
 * referrer, app que abre o link sem dizer de onde), e aí a visita vira
 * `direto` mesmo que tenha vindo de um link no WhatsApp. Atribuição exata só
 * com UTM no link.
 *
 * Função pura, sem `window`: quem lê o navegador é `utms.ts`.
 */

/** O `utm_campaign` de toda origem deduzida. */
export const SEM_UTM = "(sem utm)";

export type Pistas = {
  /** `document.referrer` — vazio quando o navegador não conta */
  referencia: string;
  /** o host deste site: navegação interna não é origem */
  host: string;
  /** a query da página de entrada */
  parametros: URLSearchParams;
  /** `navigator.userAgent` */
  agente: string;
};

/**
 * Identificadores que só aparecem em clique de anúncio.
 *
 * O `fbclid` fica de fora de propósito: o Meta o põe em todo link que sai do
 * Facebook e do Instagram, anúncio ou bio, então ele diz de onde a pessoa
 * veio, não que o clique foi pago.
 */
const CLIQUE_PAGO: readonly [parametro: string, source: string][] = [
  ["gclid", "google"],
  ["gbraid", "google"],
  ["wbraid", "google"],
  ["msclkid", "bing"],
  ["ttclid", "tiktok"],
];

/**
 * O navegador embutido de cada app, pelo user agent.
 *
 * No iPhone o Instagram abre o link sem referrer nenhum, e o agente é a
 * única pista de que a visita veio de lá. Vence o primeiro da lista.
 */
const APPS: readonly [padrao: RegExp, source: string][] = [
  [/Instagram/i, "instagram"],
  [/FBAN|FBAV|FB_IAB|FBIOS/, "facebook"],
  [/LinkedInApp/i, "linkedin"],
  [/musical_ly|BytedanceWebview/i, "tiktok"],
  [/WhatsApp/i, "whatsapp"],
];

/**
 * Sites e apps conhecidos, pelo host da página anterior.
 *
 * Os subdomínios caem no mesmo nome (`l.instagram.com`, `lm.facebook.com`,
 * `www.google.com.br`). A segunda metade de cada padrão é o pacote do app no
 * Android: aberto de dentro do WhatsApp ou do Instagram, o Chrome informa
 * `android-app://com.whatsapp/` como página anterior. Threads vem antes do
 * Instagram porque o pacote dele começa com `com.instagram.`.
 */
const CONHECIDOS: readonly [padrao: RegExp, source: string, medium: string][] = [
  [/(^|\.)threads\.(net|com)$|^com\.instagram\.barcelona$/, "threads", "social"],
  [/(^|\.)instagram\.com$|^com\.instagram\./, "instagram", "social"],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$|^com\.facebook\./, "facebook", "social"],
  [/(^|\.)(whatsapp\.com|wa\.me)$|^com\.whatsapp/, "whatsapp", "social"],
  [/(^|\.)(youtube\.com|youtu\.be)$|^com\.google\.android\.youtube$/, "youtube", "social"],
  [/(^|\.)(linkedin\.com|lnkd\.in)$|^com\.linkedin\./, "linkedin", "social"],
  [/(^|\.)tiktok\.com$|^com\.zhiliaoapp\.musically$/, "tiktok", "social"],
  [/(^|\.)(x\.com|twitter\.com|t\.co)$|^com\.twitter\./, "x", "social"],
  /* Só a busca: `mail.google.com` não é o Google orgânico, e cai mais
     abaixo como site de origem. */
  [/^(www\.)?google\.[a-z.]+$|^com\.google\.android\.googlequicksearchbox$/, "google", "organic"],
  [/^(www\.)?bing\.com$/, "bing", "organic"],
  [/(^|\.)search\.yahoo\.com$/, "yahoo", "organic"],
  [/^(www\.)?duckduckgo\.com$/, "duckduckgo", "organic"],
];

const semWww = (host: string) => host.toLowerCase().replace(/^www\./, "");

/**
 * O host da página anterior, ou `undefined` quando não há uma de fora.
 *
 * `new URL` num `try` e não `URL.canParse`: o alvo do site inclui Safari
 * 15.4, que não tem `canParse` — e uma exceção aqui derrubaria o formulário.
 */
function hostAnterior(referencia: string, host: string) {
  if (!referencia) return undefined;

  let anterior: string;
  try {
    anterior = new URL(referencia).host.toLowerCase();
  } catch {
    return undefined;
  }

  if (!anterior || semWww(anterior) === semWww(host)) return undefined;
  return anterior;
}

/**
 * A origem desta visita nas cinco chaves de UTM.
 *
 * - `utm_source`: a rede, o buscador ou o site; `direto` sem pista nenhuma.
 * - `utm_medium`: `cpc`, `social`, `organic`, `referral` ou `nenhum` —
 *   nenhum se confunde com o `paid_social` dos anúncios marcados.
 * - `utm_campaign`: sempre `SEM_UTM`.
 * - `utm_content`: o host da página anterior, como o navegador o informou.
 * - `utm_term`: a pista que decidiu (`gclid`, `app`, `link`, `fbclid` ou
 *   `nenhuma`), para saber o quanto confiar no resto.
 *
 * As cinco sempre preenchidas: a webhook escreve na ficha do contato, e uma
 * chave deixada de fora manteria ali o valor de uma visita anterior —
 * misturando duas origens numa linha só.
 */
export function deduzirOrigem({ referencia, host, parametros, agente }: Pistas): Utms {
  const anterior = hostAnterior(referencia, host);
  const conhecido = anterior ? CONHECIDOS.find(([padrao]) => padrao.test(anterior)) : undefined;
  const app = APPS.find(([padrao]) => padrao.test(agente));
  const pago = CLIQUE_PAGO.find(([parametro]) => parametros.has(parametro));

  const [source, medium, pista] = pago
    ? [pago[1], "cpc", pago[0]]
    : app
      ? [app[1], "social", "app"]
      : conhecido
        ? [conhecido[1], conhecido[2], "link"]
        : parametros.has("fbclid")
          ? ["meta", "social", "fbclid"]
          : anterior
            ? [semWww(anterior), "referral", "link"]
            : ["direto", "nenhum", "nenhuma"];

  return {
    utm_source: source,
    utm_medium: medium,
    utm_campaign: SEM_UTM,
    utm_content: anterior ?? "(sem página anterior)",
    utm_term: pista,
  };
}
