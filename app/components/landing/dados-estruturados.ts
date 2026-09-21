import {
  CNPJ,
  descricao,
  endereco,
  INSTAGRAM,
  logo,
  marca,
  SITE_URL,
} from "./site-config";

/**
 * Os registros Schema.org do site, num lugar só.
 *
 * O motivo de existirem aqui e não dentro de cada página é o `@id`: é ele que
 * diz ao Google que a Amaan da home, a da LP01 e a da LP02 são *a mesma*
 * empresa, e não três organizações homônimas. Declarar o bloco por página, na
 * mão, é como esses identificadores divergem com o tempo.
 *
 * O que cada página acrescenta (o seu próprio `WebPage`, a sua trilha) fica na
 * própria página; o que é da empresa e do site fica aqui.
 */

/**
 * A empresa.
 *
 * `sameAs` lista os perfis oficiais: é a aresta que faz o Google tratar o
 * site e o Instagram da Amaan como uma entidade só. Ficou vazio enquanto o
 * único perfil estava no handle antigo — declarar aquele endereço aqui diria
 * o contrário do que se quer.
 */
export const ID_ORGANIZACAO = `${SITE_URL}/#organizacao`;
export const ID_SITE = `${SITE_URL}/#site`;

export const organizacao = {
  "@type": "Organization",
  "@id": ID_ORGANIZACAO,
  name: marca,
  url: SITE_URL,
  sameAs: [INSTAGRAM],
  logo: `${SITE_URL}${logo.src}`,
  image: `${SITE_URL}${logo.src}`,
  description: descricao,
  slogan: "Confiança para construir o que permanece.",
  taxID: CNPJ,
  address: {
    "@type": "PostalAddress",
    streetAddress: endereco.rua,
    addressLocality: `${endereco.bairro}, ${endereco.cidade}`,
    addressRegion: endereco.uf,
    addressCountry: endereco.pais,
  },
  areaServed: {
    "@type": "State",
    name: "Santa Catarina",
  },
};

/**
 * O nome do *site* — que não é a mesma declaração que o nome da empresa.
 *
 * A linha em negrito do resultado de busca sai do "site name", e o Google diz
 * ler para isso, nesta ordem: `WebSite.name` no JSON-LD, `og:site_name`, o
 * `<title>` da home.
 *
 * `alternateName` é a forma curta, a que ele costuma preferir quando o nome
 * completo não cabe. Nenhum dos dois campos aceita o nome antigo: declarar a
 * marca extinta aqui seria pedir para ela continuar aparecendo.
 */
export const site = {
  "@type": "WebSite",
  "@id": ID_SITE,
  name: marca,
  alternateName: "Amaan",
  url: SITE_URL,
  inLanguage: "pt-BR",
  /* amarra o site à empresa acima, em vez de repetir os dados dela */
  publisher: { "@id": ID_ORGANIZACAO },
};

/**
 * Uma página do site.
 *
 * `isPartOf` e `about` são as duas arestas que ligam a página ao site e à
 * empresa; sem elas o Google lê a LP como um documento solto, que é como uma
 * página de funil acaba indexada sem a marca junto.
 */
export function paginaWeb({
  caminho,
  titulo,
  descricao: resumo,
}: {
  /** caminho absoluto do site, começando com "/" */
  caminho: string;
  titulo: string;
  descricao: string;
}) {
  const url = `${SITE_URL}${caminho}`;

  return {
    "@type": "WebPage",
    "@id": `${url}#pagina`,
    url,
    name: titulo,
    description: resumo,
    inLanguage: "pt-BR",
    isPartOf: { "@id": ID_SITE },
    about: { "@id": ID_ORGANIZACAO },
    publisher: { "@id": ID_ORGANIZACAO },
  };
}

/**
 * Trilha "Início › página".
 *
 * Existe para o resultado de busca mostrar o caminho em vez da URL crua, e
 * para o Google entender a LP como parte do site — não como uma ilha.
 */
export function trilha({ caminho, titulo }: { caminho: string; titulo: string }) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${caminho}#trilha`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: titulo,
        item: `${SITE_URL}${caminho}`,
      },
    ],
  };
}

/**
 * Serializa o grafo para dentro da tag `<script>`.
 *
 * O escape de "<" é o que o guia do Next pede: os objetos são nossos e não há
 * entrada de usuário aqui, mas é a linha que impede qualquer conteúdo futuro
 * de fechar a tag antes da hora.
 */
export function jsonLd(...registros: object[]) {
  const grafo = {
    "@context": "https://schema.org",
    "@graph": registros,
  };

  return JSON.stringify(grafo).replace(/</g, "\\u003c");
}
