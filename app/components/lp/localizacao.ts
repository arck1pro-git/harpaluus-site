/**
 * A localização aproximada da visita, pelo IP — cidade, estado e país.
 *
 * Quem faz a conta é a Vercel: toda requisição que chega a uma função traz
 * os cabeçalhos `x-vercel-ip-*`, preenchidos na borda a partir do IP de quem
 * pediu. O site não consulta serviço nenhum e não guarda o IP: lê os três
 * cabeçalhos na hora do cadastro e anexa o resultado ao lead, que é o que o
 * Comercial vê na ficha do CRM (`chroma.ts`) e o que melhora a
 * correspondência do Lead no Meta (`meta-capi.ts`).
 *
 * É aproximação, não endereço. A base de IP acerta a cidade na maior parte
 * das conexões fixas; no celular, a operadora pode responder pela capital do
 * estado, e uma VPN responde por onde ela sai. Por isso o dado vai como veio,
 * sem virar regra de nada — e, como a UTM, a falta dele nunca reprova o
 * cadastro.
 *
 * Em `next dev`, e em qualquer hospedagem que não seja a Vercel, os
 * cabeçalhos não existem: o lead sai sem localização, sem erro.
 *
 * Função pura, sem `next/headers`: quem lê a requisição é `actions.ts`, e é
 * isso que deixa este arquivo ser exercitado sozinho.
 */

export type Localizacao = {
  /** `x-vercel-ip-city`, já decodificada: "São Paulo", "Balneário Camboriú" */
  cidade?: string;
  /** `x-vercel-ip-country-region`: a UF, como "SP" ou "SC" */
  estado?: string;
  /** `x-vercel-ip-country`: ISO 3166-1, como "BR" */
  pais?: string;
};

const CABECALHOS: Record<keyof Localizacao, string> = {
  cidade: "x-vercel-ip-city",
  estado: "x-vercel-ip-country-region",
  pais: "x-vercel-ip-country",
};

/** O nome de cidade mais longo que faz sentido; acima disso é dado torto. */
const LIMITE = 100;

/**
 * Um valor pronto para a ficha, ou `undefined`.
 *
 * A cidade chega percent-encoded (`S%C3%A3o%20Paulo`), porque cabeçalho HTTP
 * não carrega acento; o `decodeURIComponent` dentro do `try` é para um valor
 * malformado virar o que veio, e não uma exceção no meio do cadastro. A
 * limpeza de controle e invisíveis segue a das UTMs (`utms.ts`), e pelo
 * mesmo motivo: o valor vai para a ficha do CRM e para o log. A diferença é
 * que o invisível (`\p{Cf}`) sai sem deixar espaço — no meio de um nome de
 * cidade ele partiria "Itajaí" em "Itaja í".
 */
function limpar(valor: string | null) {
  if (!valor) return undefined;

  let texto = valor;
  try {
    texto = decodeURIComponent(valor);
  } catch {
    /* fica como veio */
  }

  const limpo = texto
    .replace(/\p{Cf}/gu, "")
    .replace(/\p{Cc}/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, LIMITE)
    .trim();

  return limpo || undefined;
}

/**
 * A localização que os cabeçalhos da requisição contam, ou `undefined`
 * quando não contam nada — assim a chave `localizacao` não existe no lead
 * de `next dev`, em vez de existir vazia.
 *
 * Recebe só o `get` de propósito: serve tanto para o `headers()` do Next
 * quanto para um `Headers` montado à mão num teste.
 */
export function localizacaoDosCabecalhos(
  cabecalhos: Pick<Headers, "get">
): Localizacao | undefined {
  const localizacao: Localizacao = {};

  for (const chave of Object.keys(CABECALHOS) as (keyof Localizacao)[]) {
    const valor = limpar(cabecalhos.get(CABECALHOS[chave]));
    if (valor) localizacao[chave] = valor;
  }

  return Object.keys(localizacao).length > 0 ? localizacao : undefined;
}

/** "São Paulo/SP/BR" para o log do envio; "nenhuma" quando não veio. */
export function resumoLocalizacao(localizacao?: Localizacao) {
  if (!localizacao) return "nenhuma";
  return [localizacao.cidade, localizacao.estado, localizacao.pais]
    .map((parte) => parte ?? "-")
    .join("/");
}
