import type { Metadata } from "next";

import { EmpreendimentosSection } from "./components/landing/empreendimentos-section";
import { Footer } from "./components/landing/footer";
import { Header } from "./components/landing/header";
import { Hero } from "./components/landing/hero";
import { InvestSection } from "./components/landing/invest-section";
import { PilaresSection } from "./components/landing/pilares-section";
import { SobreSection } from "./components/landing/sobre-section";
import {
  CNPJ,
  descricao,
  endereco,
  logo,
  marca,
  SITE_URL,
} from "./components/landing/site-config";

/**
 * Título e descrição já vêm do layout; aqui só entra o canonical.
 *
 * Ele é a declaração de qual endereço é o oficial desta página. Enquanto não
 * existia, cada variação (com e sem www, domínio antigo, preview da Vercel)
 * competia como se fosse uma página diferente, e o Google elegeu a que tinha
 * mais histórico — a do nome antigo.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * O mesmo que o rodapé já diz, em Schema.org: é a forma que o Google entende
 * como identidade declarada da empresa, e a via mais direta para ele trocar o
 * nome que exibe. O CNPJ e o endereço amarram o registro a uma pessoa
 * jurídica só, o que evita o site ser confundido com a marca extinta.
 *
 * `sameAs` (perfis oficiais) fica de fora de propósito: o único perfil ligado
 * ao site ainda está no handle antigo, e declará-lo aqui diria ao Google
 * exatamente o contrário do que se quer — que a Amaan e o nome velho são a
 * mesma entidade. Entra assim que o perfil da Amaan existir.
 */
const dadosDaEmpresa = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organizacao`,
  name: marca,
  url: SITE_URL,
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
 * `<title>` da home. Só os dois últimos existiam aqui; o primeiro, que é o
 * sinal mais forte, faltava — e enquanto falta o buscador fica livre para
 * manter o nome que aprendeu antes.
 *
 * `alternateName` é a forma curta, a que ele costuma preferir quando o nome
 * completo não cabe. Nenhum dos dois campos aceita o nome antigo: declarar a
 * marca extinta aqui seria pedir para ela continuar aparecendo.
 */
const dadosDoSite = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#site`,
  name: marca,
  alternateName: "Amaan",
  url: SITE_URL,
  inLanguage: "pt-BR",
  /* amarra o site à empresa acima, em vez de repetir os dados dela */
  publisher: { "@id": `${SITE_URL}/#organizacao` },
};

/** Os dois registros num bloco só: é como o Schema.org liga entidades. */
const dadosEstruturados = {
  "@context": "https://schema.org",
  "@graph": [dadosDaEmpresa, dadosDoSite],
};

export default function Home() {
  return (
    <main className="relative w-full bg-fundo font-[family-name:var(--font-inter)]">
      {/* JSON-LD: dado para o buscador, invisível na página */}
      <script
        type="application/ld+json"
        // o objeto é nosso, não vem de fora — não há entrada de usuário aqui;
        // o escape de "<" é o que o guia do Next pede mesmo assim
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dadosEstruturados).replace(/</g, "\\u003c"),
        }}
      />

      <Header />

      <Hero />
      <InvestSection />
      <SobreSection />
      <PilaresSection />
      <EmpreendimentosSection />
      <Footer />
    </main>
  );
}
