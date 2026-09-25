/**
 * As UTMs da visita — da URL do anúncio até o payload do lead.
 *
 * O anúncio manda a pessoa para `/lp2?utm_source=meta&utm_campaign=…`, e esses
 * cinco parâmetros são o que liga o lead à campanha que o pagou. Eles precisam
 * sobreviver a dois percursos: o da página, porque a janela do formulário abre
 * depois do clique num CTA, e o da sessão, para o caso de alguma navegação
 * interna limpar a query da barra.
 *
 * O arquivo é compartilhado de propósito. `normalizarUtms` roda no servidor,
 * sobre o que chegou no FormData; `capturarUtms` roda no navegador, sobre a
 * URL. As duas pontas precisam concordar sobre quais são os campos e sobre o
 * que é um valor aceitável — manter as listas em arquivos separados é como
 * elas divergem, e a divergência aqui não dá erro: dá campo vazio na ficha.
 *
 * Nada neste arquivo pode reprovar um lead. UTM é metadado de marketing: valor
 * ausente, torto ou forjado vira campo vazio, nunca uma recusa na cara de quem
 * acabou de preencher o formulário.
 */

export const CAMPOS_UTM = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type CampoUtm = (typeof CAMPOS_UTM)[number];

export type Utms = Partial<Record<CampoUtm, string>>;

/**
 * Teto por valor.
 *
 * O campo vem do navegador, e qualquer pessoa pode escrever o que quiser na
 * barra de endereço. UTM de verdade não passa de algumas dezenas de
 * caracteres; o teto existe para que um valor absurdo não entre no corpo da
 * webhook nem no log de erro — que é onde o lead inteiro é impresso para
 * reenvio manual.
 */
const LIMITE = 200;

/**
 * Um valor pronto para viajar, ou `undefined`.
 *
 * Os caracteres de controle e os invisíveis saem antes do corte: `\p{Cf}` é
 * onde moram os zero-width, que é como um valor se disfarça de outro na ficha
 * do CRM, e `\p{Cc}` é o que quebra a leitura de uma linha de log.
 */
function limpar(valor: unknown) {
  if (typeof valor !== "string") return undefined;

  const limpo = valor
    .replace(/[\p{Cc}\p{Cf}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, LIMITE)
    .trim();

  /* `{{campaign.name}}` literal é macro do Meta que não foi substituída —
     clique vindo da pré-visualização ou de link do anúncio repassado. Não é
     campanha nenhuma, então vira campo vazio em vez de sujar a ficha. */
  if (/\{\{.*\}\}/.test(limpo)) return undefined;

  return limpo || undefined;
}

/**
 * Do que chegou — FormData, query, sessão — para o objeto que vai no lead.
 *
 * Recebe um leitor em vez de um objeto porque as três origens guardam o valor
 * de jeitos diferentes (`FormData.get`, `URLSearchParams.get`, propriedade de
 * um JSON), e um leitor é o que deixa a lista de campos viver num lugar só.
 *
 * Devolve `undefined` quando não sobrou nenhum campo: assim a chave `utm` não
 * existe no lead da visita orgânica, em vez de existir vazia.
 */
export function normalizarUtms(
  ler: (campo: CampoUtm) => unknown
): Utms | undefined {
  const utms: Utms = {};

  for (const campo of CAMPOS_UTM) {
    const valor = limpar(ler(campo));
    if (valor) utms[campo] = valor;
  }

  return Object.keys(utms).length > 0 ? utms : undefined;
}

/* --------------------------------------------------------------- NAVEGADOR */

/**
 * Onde as UTMs da visita ficam guardadas.
 *
 * `sessionStorage` e não `localStorage`: a atribuição é desta visita. Guardar
 * por mais tempo faria o lead de amanhã, vindo direto pelo nome do site,
 * herdar a campanha de uma semana atrás — o que é pior do que não ter campanha
 * nenhuma, porque parece informação.
 */
const CHAVE = "amaan:utm";

function daUrl(): Utms | undefined {
  const parametros = new URLSearchParams(window.location.search);
  return normalizarUtms((campo) => parametros.get(campo));
}

/* Leitura e escrita em `try/catch`: `sessionStorage` lança em aba anônima com
   armazenamento bloqueado, e uma exceção aqui derrubaria o formulário inteiro
   por causa de um metadado. Sem storage o valor ainda vale para esta página,
   que é o caso comum — a pessoa chega pelo anúncio e preenche ali mesmo. */
function daSessao(): Utms | undefined {
  try {
    const guardado = window.sessionStorage.getItem(CHAVE);
    if (!guardado) return undefined;

    const objeto = JSON.parse(guardado) as Record<string, unknown>;
    return normalizarUtms((campo) => objeto?.[campo]);
  } catch {
    return undefined;
  }
}

function guardar(utms: Utms) {
  try {
    window.sessionStorage.setItem(CHAVE, JSON.stringify(utms));
  } catch {
    /* ver a nota acima: a falta de storage não impede o envio desta visita */
  }
}

/**
 * As UTMs desta visita.
 *
 * A URL ganha da sessão, e substitui o conjunto inteiro em vez de se misturar
 * a ele: um segundo clique, em outro anúncio, é outra campanha — mesclar os
 * dois produziria uma linha que nunca existiu, com o `utm_source` de um e o
 * `utm_campaign` do outro.
 *
 * Só faz sentido no navegador; no servidor devolve vazio.
 */
function capturarUtms(): Utms {
  if (typeof window === "undefined") return {};

  const daPagina = daUrl();

  if (daPagina) {
    guardar(daPagina);
    return daPagina;
  }

  return daSessao() ?? {};
}

/**
 * O mesmo objeto de UTMs durante toda a vida da página.
 *
 * O memo não é micro-otimização: é o contrato de `useSyncExternalStore`, que
 * é como o formulário lê este valor. Ele compara o retorno por identidade a
 * cada renderização, e um objeto novo a cada chamada o poria em laço infinito.
 *
 * Estabilidade também é o que se quer do dado em si — a campanha da visita não
 * muda no meio dela, e o valor congelado na primeira leitura é justamente o
 * que sobrevive a uma navegação interna que limpe a query.
 */
let memo: Utms | undefined;

export function utmsDaVisita(): Utms {
  memo ??= capturarUtms();
  return memo;
}

/**
 * As duas peças que faltam a `useSyncExternalStore`, prontas e estáveis.
 *
 * `SEM_INSCRICAO` porque não há a que se inscrever: nada muda as UTMs depois
 * da carga da página. `VAZIO` é o retrato do servidor, onde `window` não
 * existe — e precisa ser sempre o mesmo objeto pela razão acima.
 */
export const SEM_INSCRICAO = () => () => {};

const VAZIO: Utms = {};

export const utmsNoServidor = () => VAZIO;
