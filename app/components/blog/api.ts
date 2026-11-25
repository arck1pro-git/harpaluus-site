import "server-only";

/**
 * O blog vem pronto do CRM AmaanOffice (Chroma): lista, corpo em HTML,
 * sumário, dados estruturados e canonical. Este arquivo é o único lugar que
 * conversa com a API, e só roda no servidor.
 *
 * A chave do blog está dentro da URL, por isso três regras:
 *
 * - A URL inteira mora em `BLOG_API` (`.env.local` e Vercel), nunca no código
 *   versionado. Sem o prefixo `NEXT_PUBLIC_`, o Next não a embute no pacote
 *   do navegador.
 * - O `import "server-only"` aí em cima faz o build falhar se algum
 *   componente de cliente importar este arquivo — que é como a chave
 *   acabaria visível no DevTools.
 * - Toda busca sai daqui com cache de 5 minutos, o mesmo que a API declara.
 *
 * Erros, do jeito que a API combina:
 *
 * - 404 no artigo é "não existe para o site" (slug errado, artigo ainda não
 *   aprovado ou despublicado): `buscarArtigo` devolve `null` e a página
 *   responde 404.
 * - 5xx e falha de rede lançam erro. Na revalidação, erro lançado é o que faz
 *   o Next continuar servindo a última versão boa da página em vez de trocá-la
 *   por uma vazia — é o "sirva o cache anterior" da API.
 */

export type ArtigoResumo = {
  slug: string;
  titulo: string;
  resumo: string;
  meta_title: string;
  meta_description: string;
  palavra_chave: string;
  keywords: string[];
  imagem_alt: string;
  /** endereço absoluto e canonical do artigo, montado pelo CRM a partir do `url_base` */
  url: string;
  palavras: number;
  minutos: number;
  criado_em: string;
  atualizado_em: string;
};

export type ItemSumario = { nivel: number; id: string; texto: string };

export type Artigo = ArtigoResumo & {
  /** corpo pronto, já escapado e com os links filtrados pelo CRM */
  html: string;
  /** o mesmo corpo em markdown; o site usa o `html` e nunca os dois */
  markdown: string;
  /** índice ancorado nos ids que já estão no `html` */
  sumario: ItemSumario[];
  meta_tags: string;
  json_ld: Record<string, unknown>[];
  autor: string;
  /** matéria que originou o artigo */
  fonte: { titulo: string; url: string } | null;
};

/**
 * Cache de cada busca, em segundos: 5 minutos, o que a API declara.
 *
 * As páginas repetem o número no `export const revalidate = 300` porque o
 * Next exige ali um literal — `revalidate = REVALIDAR` não compila. Mudar um
 * é mudar os três: este, `blog/page.tsx` e `blog/[slug]/page.tsx`.
 */
const REVALIDAR = 300;

/**
 * Etiqueta das buscas. Hoje nada a chama; ela existe para o dia em que o CRM
 * avisar o site quando publicar (`revalidateTag("blog")` numa rota de
 * webhook), sem esperar os 5 minutos.
 */
const ETIQUETA = "blog";

const OPCOES = {
  headers: { accept: "application/json" },
  next: { revalidate: REVALIDAR, tags: [ETIQUETA] },
} satisfies RequestInit;

/** A URL da lista, sem barra no fim; `null` se a variável não existe. */
function base() {
  const url = process.env.BLOG_API?.trim().replace(/\/+$/, "");
  return url || null;
}

/**
 * `next build` em andamento.
 *
 * No build não existe versão anterior para servir: se o CRM estiver fora do
 * ar bem nessa hora, a lista sai vazia e se corrige na primeira revalidação,
 * 5 minutos depois — em vez de derrubar o deploy do site inteiro por causa
 * do blog.
 */
function emBuild() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

/**
 * Os artigos aprovados, do mais novo para o mais antigo — a ordem é a da
 * API, e não se reordena aqui.
 */
export async function listarArtigos(): Promise<ArtigoResumo[]> {
  const url = base();
  if (!url) {
    console.error("[blog] BLOG_API não configurada: o blog sai sem artigos.");
    return [];
  }

  try {
    const resposta = await fetch(url, OPCOES);
    if (!resposta.ok) {
      throw new Error(`[blog] a lista de artigos respondeu ${resposta.status}`);
    }

    const corpo = (await resposta.json()) as { artigos?: unknown };
    if (!Array.isArray(corpo.artigos)) {
      throw new Error("[blog] a lista de artigos veio sem o campo `artigos`");
    }

    return (corpo.artigos as ArtigoResumo[]).filter(
      (artigo) => typeof artigo?.slug === "string" && artigo.slug !== ""
    );
  } catch (erro) {
    if (emBuild()) {
      console.error("[blog] CRM indisponível no build; a lista sai vazia até a próxima revalidação.", erro);
      return [];
    }
    throw erro;
  }
}

/** Um artigo pelo slug; `null` quando a API diz que ele não existe. */
export async function buscarArtigo(slug: string): Promise<Artigo | null> {
  const url = base();
  if (!url) return null;

  const resposta = await fetch(`${url}/${encodeURIComponent(slug)}`, OPCOES);

  if (resposta.status === 404 || resposta.status === 410) return null;
  if (!resposta.ok) {
    throw new Error(`[blog] o artigo "${slug}" respondeu ${resposta.status}`);
  }

  const corpo = (await resposta.json()) as { artigo?: Artigo };
  if (!corpo.artigo || typeof corpo.artigo.html !== "string") {
    throw new Error(`[blog] o artigo "${slug}" veio sem corpo`);
  }

  return corpo.artigo;
}
