import {
  empreendimentos,
  hero,
  INSTAGRAM,
  invest,
  linkWhatsapp,
  LOCALIZACAO,
  pilares,
  PORTAL,
  rodape,
  ROTA_ALEMAO,
  sobre,
  type NavItem,
  type Textos,
} from "./site-config";

/**
 * A home institucional em alemão, servida em `/alemao`.
 *
 * Mesma forma dos objetos de `site-config.ts` (cada um é tipado pelo
 * português), então os componentes da home recebem estes por prop sem mudar
 * nada no desenho. As fotos são as mesmas; só os textos alternativos mudam.
 *
 * Escrito para soar como texto alemão, não como tradução palavra por palavra:
 * - "Empreendimentos Vivos", o conceito da marca, vira „Lebendige
 *   Immobilien“. No meio da frase vai entre aspas alemãs, que é como o
 *   alemão marca um termo cunhado (o adjetivo em maiúscula sem aspas parece
 *   erro de digitação); em títulos e rótulos, que já são caixa alta, sem aspas.
 * - "Alto padrão" vira "Premiumsegment", o termo do mercado imobiliário
 *   alemão; "incorporadora" vira "Projektentwickler". "Amaan Incorporadora"
 *   fica como está, por ser a razão social.
 * - SCP fica como sigla, mas o cartão do AMAAN Invest explica numa frase que
 *   é uma participação silenciosa ("stille Beteiligung") pelo direito
 *   brasileiro — a figura alemã equivalente à SCP. O leitor alemão não
 *   conhece a sigla.
 * - Tratamento formal (Sie) do começo ao fim; números em algarismos;
 *   travessão (–) onde o alemão usa travessão.
 * - Os trechos entre « » (dourado no corpo) e o `tituloDestaque` (dourado
 *   itálico no título) seguem a mesma lógica do português, cada um num
 *   pedaço equivalente da frase.
 *
 * O menu não tem o Blog: os artigos vêm do CRM e só existem em português.
 * A Política de Privacidade também só existe em português, e o link avisa.
 */

/** Conversa no WhatsApp já aberta em alemão; a equipe vê de onde a pessoa veio. */
const WHATSAPP_DE = linkWhatsapp(
  "Hallo! Ich komme über die deutsche Website der AMAAN Incorporadora und hätte gern weitere Informationen zu Ihren Projekten."
);

/* As âncoras ficam sem a barra: o header e o rodapé desta versão só existem
   na própria `/alemao`, então `#sobre` sempre rola a página em que já se está. */
export const navDe: NavItem[] = [
  { label: "Über uns", href: "#sobre" },
  { label: "Projekte", href: "#empreendimentos" },
  { label: "Kontakt", href: "#contato" },
  { label: "Investorenportal", href: PORTAL, externo: true },
];

export const textosDe: Textos = {
  inicio: ROTA_ALEMAO,
  abrirMenu: "Menü öffnen",
  fecharMenu: "Menü schließen",
  irParaConteudo: "Weiter zum Inhalt",
  novaAba: "(öffnet in neuem Tab)",
  whatsappFlutuante: "Amaan per WhatsApp kontaktieren (öffnet in neuem Tab)",
  privacidade: "Datenschutzerklärung (auf Portugiesisch)",
  whatsapp: WHATSAPP_DE,
};

/* ------------------------------------------------------------------ HERO */

export const heroDe: typeof hero = {
  image: {
    ...hero.image,
    alt: "Dachterrasse eines Amaan-Projekts bei Sonnenuntergang, im Hintergrund die Stadt und das Meer",
  },
  titulo: "Mit Vertrauen bauen, was bleibt.",
  tituloDestaque: "was bleibt.",
  texto:
    "Wir entwickeln „Lebendige Immobilien“: Ökosysteme, die mitwachsen, den Alltag erleichtern und noch lange nach der Übergabe Werte schaffen.",
  cta: { label: "Wie wir Gebäude neu denken", href: "#sobre" },
};

/* ------------------------------------------------------------------ SOBRE */

export const sobreDe: typeof sobre = {
  titulo: "DAS PREMIUMSEGMENT IST IN DIE JAHRE GEKOMMEN.",
  tituloDestaque: "IN DIE JAHRE GEKOMMEN.",
  lead: "Ausstattung, Design und Freizeitangebote bleiben wichtig. Doch was das Premiumsegment von morgen ausmacht, ist «das, was ein Gebäude für seine Bewohner leistet».",
  paragrafos: [
    "Dafür braucht es «ein System»: Architektur, Technologie, Nachhaltigkeit, Services, Erlebnisse und Management, von der Planung an miteinander verzahnt, wobei jede Ebene die nächste trägt.",
    "Amaan ist ein Projektentwickler aus Santa Catarina, der seine Immobilien selbst «konzipiert, entwickelt und betreibt». Mit der Schlüsselübergabe beginnt der längste Abschnitt: Jetzt fängt das Leben des Gebäudes an, und sein Betrieb wird messbar.",
  ],
};

/* ---------------------------------------------------------------- PILARES */

export const pilaresDe: typeof pilares = {
  titulo: "LEBENDIGE IMMOBILIEN.",
  tituloDestaque: "LEBENDIGE",
  texto:
    "Sechs Ebenen, festgelegt, bevor die erste Wand steht, und gepflegt bis lange nach der Übergabe des letzten Schlüssels. Keine davon funktioniert für sich allein.",
  itens: [
    {
      icone: "arquitetura",
      titulo: "Architektur",
      descricao:
        "Wo der Turm platziert wird, wohin die Fenster blicken, wo sich die Wege der Menschen kreuzen. Die einzige Ebene, die niemand mehr ändert, wenn der Bau erst einmal in die Höhe wächst.",
    },
    {
      icone: "tecnologia",
      titulo: "Technologie",
      descricao:
        "Der klassische Schlüssel hat ausgedient: Biometrie am Eingang, QR-Code für Besucher, Aufzug und Wohnung per Smartphone. Die Bewohner merken es an der Zeit, die sie nicht mehr verlieren.",
    },
    {
      icone: "sustentabilidade",
      titulo: "Nachhaltigkeit",
      descricao:
        "Jede Wohnung erfasst ihren eigenen Wasser-, Gas- und Stromverbrauch. Am Monatsende zahlen Sie genau das, was Sie verbraucht haben – nicht mehr.",
    },
    {
      icone: "servicos",
      titulo: "Services",
      descricao:
        "Wäscherei, Minimarkt und Coworking direkt im Haus. Die Wohnung ist darauf ausgelegt, auch an den Tagen Einnahmen zu erzielen, an denen sie leer steht.",
    },
    {
      icone: "experiencias",
      titulo: "Erlebnisse",
      descricao:
        "Dachterrasse, Gourmet-Lounge und Außenbereich mit Feuerstelle, gedacht für die Nutzung an einem ganz normalen Dienstag.",
    },
    {
      icone: "gestao",
      titulo: "Management",
      descricao:
        "Das Gebäude meldet einen drohenden Systemausfall, bevor er eintritt, und die Bewohner verfolgen die Reparatur in der App. Wer vermietet, überlässt den Betrieb der Hausverwaltung.",
    },
  ],
};

/* -------------------------------------------------------- EMPREENDIMENTOS */

const [imagemLounge, imagemTorre] = empreendimentos.imagens;

export const empreendimentosDe: typeof empreendimentos = {
  titulo: "PROJEKTE",
  destaque: {
    nome: "Tourmaline Tower",
    meta: "Porto Belo / SC · In Planung",
    texto:
      "31 Stockwerke im Viertel Vila Nova in Porto Belo (SC), mit einer Dachterrasse am höchsten Punkt der Region.",
  },
  imagens: [
    { ...imagemLounge, alt: "Gourmet-Lounge des Tourmaline Tower mit Panoramablick aufs Meer" },
    { ...imagemTorre, alt: "Der beleuchtete Turm in der Abenddämmerung" },
  ],
};

/* ----------------------------------------------------------------- INVEST */

/* Mesmo cuidado do português: nada aqui descreve rentabilidade. A primeira
   frase do texto só diz o que é a SCP, para o leitor alemão. */
export const investDe: typeof invest = {
  titulo: "Verfolgen Sie Ihre SCP-Beteiligung mit",
  produto: "AMAAN INVEST",
  texto:
    "Die SCP ist eine stille Beteiligung nach brasilianischem Recht. Einlagen, Ausschüttungen und Ihren Anteil am Ergebnis sehen Sie Monat für Monat dort, wo Sie auch den Baufortschritt verfolgen.",
  cta: { label: "Amaan Invest öffnen", href: PORTAL },
  mockup: {
    ...invest.mockup,
    alt: "Die App Amaan Invest auf einem Smartphone: eingezahltes Kapital, erhaltene Ausschüttungen und deren Entwicklung",
  },
};

/* ----------------------------------------------------------------- RODAPÉ */

export const rodapeDe: typeof rodape = {
  titulo: "AMAAN",
  assinatura: "Lebendige Immobilien",
  frase: "Mit Vertrauen bauen, was bleibt.",
  cta: { label: "Sprechen Sie mit unserem Team", href: WHATSAPP_DE },
  colunas: [
    {
      titulo: "Unternehmen",
      links: [
        { label: "Unsere Vision", href: "#sobre" },
        { label: "Lebendige Immobilien", href: "#pilares" },
      ],
    },
    {
      titulo: "Projekte",
      links: [{ label: "Tourmaline Tower", href: "#empreendimentos" }],
    },
    {
      titulo: "Kontakt",
      links: [
        { label: "WhatsApp", href: WHATSAPP_DE, icone: "whatsapp" },
        { label: "Instagram", href: INSTAGRAM, icone: "instagram" },
        { label: "Standort", href: LOCALIZACAO, icone: "local" },
      ],
    },
  ],
  legais: [
    "Amaan Incorporadora · CNPJ 50.550.515/0001-33",
    "R. Dorvalino Voltolini, 179 · Perequê, Porto Belo/SC",
    "© 2026. Alle Rechte vorbehalten.",
  ],
};
