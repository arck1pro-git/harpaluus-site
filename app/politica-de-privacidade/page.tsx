import type { Metadata } from "next";

import { Dots } from "../components/landing/dots";
import { Footer } from "../components/landing/footer";
import { Header } from "../components/landing/header";
import {
  CNPJ,
  endereco,
  marca,
  ROTA_PRIVACIDADE,
  SITE_URL,
  WHATSAPP_EXIBICAO,
  WHATSAPP_PRIVACIDADE,
} from "../components/landing/site-config";

/**
 * Política de Privacidade do site e das LPs.
 *
 * O texto descreve o que o código faz de fato, e muda junto com ele: quem
 * acrescentar um destino para o lead (`actions.ts`), um evento ou cookie do
 * Meta (`meta-pixel.tsx`, `meta-capi.ts`) ou uma chave de armazenamento no
 * navegador (`ja-enviou.ts`, `utms.ts`, `aviso-cookies.tsx`) atualiza esta
 * página e a data de `ATUALIZADA_EM`.
 */

const ATUALIZADA_EM = { iso: "2026-10-08", texto: "8 de outubro de 2026" };

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como a ${marca} coleta, usa, compartilha e protege os dados de quem visita o site e as páginas de campanha.`,
  alternates: { canonical: ROTA_PRIVACIDADE },
};

/** O que fica gravado no navegador, na ordem em que aparece na seção 07. */
const COOKIES = [
  {
    nome: "_fbp",
    tipo: "Cookie · Meta",
    finalidade:
      "Identifica o navegador para que o Meta meça as visitas e os resultados dos anúncios.",
    duracao: "90 dias",
  },
  {
    nome: "_fbc",
    tipo: "Cookie · Meta",
    finalidade:
      "Guarda o identificador do clique quando a visita vem de um anúncio do Facebook ou do Instagram.",
    duracao: "90 dias",
  },
  {
    nome: "amaan:utm",
    tipo: "Armazenamento da sessão · Amaan",
    finalidade: "Lembra de qual campanha veio a visita, para associá-la ao cadastro.",
    duracao: "Até a aba ser fechada",
  },
  {
    nome: "amaan:lead-enviado",
    tipo: "Armazenamento local · Amaan",
    finalidade:
      "Registra que o cadastro daquela página já foi enviado, para evitar um envio em duplicidade.",
    duracao: "Até ser apagado no navegador",
  },
  {
    nome: "amaan:aviso-cookies",
    tipo: "Armazenamento local · Amaan",
    finalidade: "Lembra que você já viu o aviso de cookies, para não mostrá-lo de novo.",
    duracao: "Até ser apagado no navegador",
  },
];

function Secao({
  numero,
  titulo,
  children,
}: {
  numero: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-linha pt-10">
      <p className="tipo-numero text-dourado">{numero}</p>
      <h2 className="mt-4 text-[1.375rem] leading-[1.25] font-normal tracking-[-0.01em] text-azul-escuro md:text-[1.625rem]">
        {titulo}
      </h2>
      <div className="mt-6 flex flex-col gap-5 text-[15px] leading-[1.8] font-light text-grafite/80 md:text-base">
        {children}
      </div>
    </section>
  );
}

function Lista({ itens }: { itens: React.ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-3 pl-5 marker:text-dourado">
      {itens.map((item, i) => (
        <li key={i} className="pl-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Link no corpo do texto: sublinhado, para não se perder no parágrafo. */
function LinkTexto({ href, children }: { href: string; children: React.ReactNode }) {
  const externo = href.startsWith("http");

  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="font-normal text-azul-escuro underline decoration-dourado/60 underline-offset-4 transition-colors duration-300 hover:decoration-dourado"
    >
      {children}
    </a>
  );
}

const Forte = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-medium text-azul-escuro">{children}</strong>
);

export default function PoliticaDePrivacidade() {
  const dominio = new URL(SITE_URL).host;

  return (
    <main className="relative w-full bg-fundo font-[family-name:var(--font-inter)]">
      <Header />

      {/* Abre em fundo escuro porque o header é transparente no topo, com
          marca e links em branco — o mesmo contrato do hero da home. */}
      <section className="relative overflow-clip bg-azul-escuro text-white">
        <Dots
          canto="superior-direito"
          tone="claro"
          tamanho="h-[420px] w-[420px] md:h-[760px] md:w-[760px]"
        />

        <div className="faixa relative pt-[calc(var(--header-altura)+clamp(4rem,9vw,7rem))] pb-[clamp(3.5rem,7vw,5.5rem)]">
          <span className="block h-px w-[44px] bg-dourado" />
          <p className="tipo-label mt-7 text-dourado-claro">{marca}</p>
          <h1 className="tipo-secao mt-6 font-[family-name:var(--font-playfair)]">
            Política de Privacidade
          </h1>
          <p className="mt-6 text-[13px] leading-[1.6] font-light text-white/70">
            Última atualização:{" "}
            <time dateTime={ATUALIZADA_EM.iso}>{ATUALIZADA_EM.texto}</time>
          </p>
        </div>
      </section>

      <article className="faixa py-[clamp(4rem,8vw,6.5rem)]">
        <div className="flex max-w-[720px] flex-col gap-10">
          <p className="tipo-lead text-azul-escuro">
            Esta política explica quais dados pessoais a {marca} coleta quando você visita{" "}
            {dominio} e as nossas páginas de campanha, para que eles servem, com quem são
            compartilhados e como você pode exercer os seus direitos, nos termos da Lei
            Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).
          </p>

          <Secao numero="01" titulo="Quem é responsável pelos seus dados">
            <p>
              A controladora dos dados é a <Forte>{marca}</Forte>, inscrita no CNPJ sob o nº{" "}
              {CNPJ}, com sede na {endereco.rua}, {endereco.bairro}, {endereco.cidade}/
              {endereco.uf}.
            </p>
            <p>
              Para qualquer assunto sobre os seus dados pessoais, fale com a gente pelo
              WhatsApp{" "}
              <LinkTexto href={WHATSAPP_PRIVACIDADE}>{WHATSAPP_EXIBICAO}</LinkTexto>. É o nosso
              canal de atendimento ao titular.
            </p>
          </Secao>

          <Secao numero="02" titulo="Quais dados coletamos">
            <p>
              <Forte>Dados que você informa.</Forte> Quando você preenche um formulário no
              site, recebemos o seu nome, e-mail e número de WhatsApp. Em algumas páginas
              também perguntamos se você já participou de uma SCP, a faixa de capital que
              pretende investir e o prazo em que pretende decidir.
            </p>
            <p>
              <Forte>Dados da navegação.</Forte> Enquanto você navega, registramos
              automaticamente o endereço IP, o tipo de navegador e de dispositivo, as páginas
              visitadas e algumas ações dentro delas, como chegar ao fim da página, abrir o
              formulário ou enviá-lo. Quando a visita vem de um anúncio, registramos também
              os parâmetros da campanha no endereço da página (como as UTMs e o
              identificador de clique do Meta).
            </p>
            <p>
              <Forte>Cookies e armazenamento no navegador.</Forte> Explicamos cada um na
              seção 07.
            </p>
          </Secao>

          <Secao numero="03" titulo="Para que usamos os dados">
            <Lista
              itens={[
                "Atender ao que você pediu no formulário: enviar o material solicitado e entrar em contato pelo WhatsApp ou por e-mail para apresentar os empreendimentos e as oportunidades da Amaan.",
                "Entender o seu perfil de interesse, para que o nosso time comercial converse com você sobre o que faz sentido.",
                "Saber por qual campanha você chegou e medir o desempenho dos nossos anúncios no Facebook e no Instagram.",
                "Mostrar os nossos anúncios a pessoas com interesses parecidos e evitar mostrá-los a quem já se cadastrou.",
                "Manter o site funcionando com segurança e evitar cadastros duplicados.",
              ]}
            />
          </Secao>

          <Secao numero="04" titulo="Bases legais">
            <p>Tratamos os seus dados com base nas hipóteses do art. 7º da LGPD:</p>
            <Lista
              itens={[
                <>
                  <Forte>Consentimento</Forte> (inciso I), quando você envia o formulário para
                  receber um material ou o nosso contato;
                </>,
                <>
                  <Forte>Procedimentos preliminares a um contrato</Forte> (inciso V), quando
                  você pede informações sobre um empreendimento ou uma oportunidade de
                  participação;
                </>,
                <>
                  <Forte>Legítimo interesse</Forte> (inciso IX), para medir a audiência do
                  site, avaliar campanhas e manter a segurança, sempre respeitando os seus
                  direitos e as suas expectativas.
                </>,
              ]}
            />
          </Secao>

          <Secao numero="05" titulo="Com quem compartilhamos">
            <p>Não vendemos dados pessoais. Compartilhamos apenas o necessário com:</p>
            <Lista
              itens={[
                <>
                  <Forte>Meta Platforms</Forte> (Facebook e Instagram), por meio do Meta Pixel
                  e da API de Conversões, para medir e direcionar anúncios. Nome, e-mail e
                  WhatsApp são enviados ao Meta somente criptografados por hash (SHA-256),
                  nunca em texto aberto. O uso que o Meta faz desses dados segue a{" "}
                  <LinkTexto href="https://www.facebook.com/privacy/policy/">
                    Política de Privacidade do Meta
                  </LinkTexto>
                  .
                </>,
                <>
                  <Forte>Plataforma de CRM</Forte> usada pelo nosso time comercial para
                  registrar o seu cadastro e organizar o contato com você.
                </>,
                <>
                  <Forte>Provedor de hospedagem</Forte> do site, que processa as requisições
                  de quem o visita.
                </>,
                <>
                  <Forte>Autoridades públicas</Forte>, quando houver obrigação legal ou ordem
                  judicial.
                </>,
              ]}
            />
            <p>
              Alguns desses fornecedores processam dados em servidores fora do Brasil, como
              nos Estados Unidos. Nesses casos, a transferência internacional segue as
              hipóteses do art. 33 da LGPD.
            </p>
          </Secao>

          <Secao numero="06" titulo="Por quanto tempo guardamos">
            <p>
              Guardamos os dados do cadastro enquanto houver relacionamento ou interesse na
              conversa com você, ou até que você peça a exclusão, ressalvados os prazos que a
              lei nos obrigue a cumprir. Os dados de navegação ficam pelo tempo necessário
              para medir as campanhas. Os prazos dos cookies estão na seção 07.
            </p>
          </Secao>

          <Secao numero="07" titulo="Cookies e armazenamento no navegador">
            <p>
              Cookies são pequenos arquivos gravados no seu navegador. Usamos os do Meta Pixel
              para medir as visitas e os resultados dos anúncios, e o armazenamento do
              próprio navegador para lembrar detalhes da sua visita. O Meta Pixel também pode
              registrar automaticamente cliques em botões e informações da página.
            </p>

            <dl className="flex flex-col border-y border-linha">
              {COOKIES.map((cookie) => (
                <div
                  key={cookie.nome}
                  className="grid gap-x-8 gap-y-2 border-b border-linha py-5 last:border-b-0 md:grid-cols-[200px_1fr]"
                >
                  <dt>
                    <code className="text-[13px] font-medium text-azul-escuro">
                      {cookie.nome}
                    </code>
                    <span className="mt-1 block text-[12px] leading-[1.5] text-cinza-texto">
                      {cookie.tipo}
                    </span>
                  </dt>
                  <dd className="text-[14px] leading-[1.7]">
                    {cookie.finalidade}
                    <span className="mt-1 block text-[12px] text-cinza-texto">
                      Duração: {cookie.duracao}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <p>
              Você pode apagar ou bloquear cookies nas configurações do seu navegador e
              ajustar o uso dos seus dados para anúncios nas{" "}
              <LinkTexto href="https://accountscenter.facebook.com/ad_preferences">
                preferências de anúncios do Meta
              </LinkTexto>
              . Bloquear cookies não impede o uso do site, mas pode afetar a medição das
              campanhas.
            </p>
          </Secao>

          <Secao numero="08" titulo="Seus direitos">
            <p>Pelo art. 18 da LGPD, você pode, a qualquer momento:</p>
            <Lista
              itens={[
                "confirmar se tratamos os seus dados e acessá-los;",
                "corrigir dados incompletos, inexatos ou desatualizados;",
                "pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados em desconformidade com a lei;",
                "pedir a portabilidade dos dados a outro fornecedor;",
                "saber com quem os seus dados foram compartilhados;",
                "revogar o consentimento e pedir a eliminação dos dados tratados com base nele;",
                "se opor a um tratamento feito com base em outra hipótese legal, quando ele descumprir a LGPD.",
              ]}
            />
            <p>
              Para exercer qualquer um desses direitos, fale com a gente pelo WhatsApp{" "}
              <LinkTexto href={WHATSAPP_PRIVACIDADE}>{WHATSAPP_EXIBICAO}</LinkTexto>. Também é
              seu direito apresentar reclamação à Autoridade Nacional de Proteção de Dados
              (ANPD).
            </p>
          </Secao>

          <Secao numero="09" titulo="Segurança">
            <p>
              O site funciona só com conexão criptografada (HTTPS), os dados de contato
              enviados ao Meta saem em hash e o acesso aos cadastros é restrito às pessoas do
              nosso time que precisam deles para atender você.
            </p>
          </Secao>

          <Secao numero="10" titulo="Menores de idade">
            <p>
              O site e as nossas ofertas são destinados a maiores de 18 anos. Não coletamos
              intencionalmente dados de crianças e adolescentes.
            </p>
          </Secao>

          <Secao numero="11" titulo="Alterações nesta política">
            <p>
              Podemos atualizar esta política para refletir mudanças no site ou na lei. A data
              da última atualização fica sempre no topo desta página.
            </p>
          </Secao>
        </div>
      </article>

      <Footer />
    </main>
  );
}
