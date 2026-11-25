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
 * Escolhas de tradução:
 * - "Empreendimentos Vivos", o conceito da marca, vira "Lebendige
 *   Immobilien", com maiúscula, como nome próprio do conceito.
 * - "Incorporadora" vira "Projektentwickler"; "Amaan Incorporadora" fica como
 *   está, por ser a razão social.
 * - SCP fica como sigla: é a forma jurídica brasileira do investimento, e o
 *   portal e os contratos usam o nome em português.
 * - Os trechos entre « » (dourado no corpo) e o `tituloDestaque` (dourado
 *   itálico no título) seguem a mesma lógica do português, cada um num
 *   pedaço equivalente da frase.
 *
 * O menu não tem o Blog: os artigos vêm do CRM e só existem em português.
 * A Política de Privacidade também só existe em português, e o link avisa.
 */

/** Conversa no WhatsApp já aberta em alemão; a equipe vê de onde a pessoa veio. */
const WHATSAPP_DE = linkWhatsapp(
  "Hallo! Ich komme von der deutschen Website der AMAAN Incorporadora und hätte gern mehr Informationen über die Projekte."
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
  irParaConteudo: "Zum Inhalt",
  novaAba: "(öffnet in neuem Tab)",
  whatsappFlutuante: "Mit Amaan per WhatsApp sprechen (öffnet in neuem Tab)",
  privacidade: "Datenschutzerklärung (auf Portugiesisch)",
  whatsapp: WHATSAPP_DE,
};

/* ------------------------------------------------------------------ HERO */

export const heroDe: typeof hero = {
  image: {
    ...hero.image,
    alt: "Dachterrasse eines Amaan-Projekts bei Sonnenuntergang, mit der Stadt und dem Meer im Hintergrund",
  },
  titulo: "Vertrauen, um zu bauen, was bleibt.",
  tituloDestaque: "was bleibt.",
  texto:
    "Wir schaffen Lebendige Immobilien: Ökosysteme, die sich weiterentwickeln, das Leben leichter machen und noch lange nach der Übergabe Wert schaffen.",
  cta: { label: "Wie wir ein Gebäude denken", href: "#sobre" },
};

/* ------------------------------------------------------------------ SOBRE */

export const sobreDe: typeof sobre = {
  titulo: "DER GEHOBENE STANDARD IST GEALTERT.",
  tituloDestaque: "GEALTERT.",
  lead: "Ausstattung, Design und Freizeitangebote bleiben wichtig. Was den gehobenen Standard von morgen ausmacht, ist «das, was das Gebäude für seine Bewohner leistet».",
  paragrafos: [
    "Dafür braucht es «ein System»: Architektur, Technologie, Nachhaltigkeit, Services, Erlebnisse und Management, von der Planung an miteinander verbunden, jede Ebene trägt die nächste.",
    "Amaan ist ein Projektentwickler aus Santa Catarina, der seine Projekte selbst «konzipiert, entwickelt und betreibt». Die Schlüsselübergabe eröffnet den längsten Zyklus: Dann beginnt das Leben des Gebäudes, und sein Betrieb wird messbar.",
  ],
};

/* ---------------------------------------------------------------- PILARES */

export const pilaresDe: typeof pilares = {
  titulo: "LEBENDIGE IMMOBILIEN.",
  tituloDestaque: "LEBENDIGE",
  texto:
    "Sechs Ebenen, festgelegt vor der ersten Wand und gepflegt bis lange nach dem letzten Schlüssel. Keine davon funktioniert allein.",
  itens: [
    {
      icone: "arquitetura",
      titulo: "Architektur",
      descricao:
        "Wo der Turm steht, wohin die Fenster blicken, wo sich die Wege der Menschen kreuzen. Die einzige Ebene, die niemand mehr ändern kann, sobald der Bau steht.",
    },
    {
      icone: "tecnologia",
      titulo: "Technologie",
      descricao:
        "Der physische Schlüssel hat ausgedient: Biometrie am Eingang, QR-Code für Besucher, Aufzug und Wohnung per Smartphone. Die Bewohner merken es an der Zeit, die sie nicht mehr verlieren.",
    },
    {
      icone: "sustentabilidade",
      titulo: "Nachhaltigkeit",
      descricao:
        "Jede Wohnung misst ihren eigenen Wasser-, Gas- und Stromverbrauch. Am Monatsende zahlen Sie, was Sie verbraucht haben, und nicht mehr.",
    },
    {
      icone: "servicos",
      titulo: "Services",
      descricao:
        "Wäscherei, Minimarkt und Coworking im Gebäude. Die Wohnung ist darauf vorbereitet, an den Tagen, an denen sie leer steht, Einnahmen zu erzielen.",
    },
    {
      icone: "experiencias",
      titulo: "Erlebnisse",
      descricao:
        "Dachterrasse, Gourmet-Lounge und Außenbereich mit Kamin, ausgelegt auf die Nutzung an einem ganz gewöhnlichen Dienstag.",
    },
    {
      icone: "gestao",
      titulo: "Management",
      descricao:
        "Das Gebäude meldet einen drohenden Systemausfall, bevor er eintritt, und die Bewohner verfolgen die Reparatur in der App. Wer vermietet, übergibt den Betrieb an die Verwaltung.",
    },
  ],
};

/* -------------------------------------------------------- EMPREENDIMENTOS */

const [imagemLounge, imagemTorre] = empreendimentos.imagens;

export const empreendimentosDe: typeof empreendimentos = {
  titulo: "PROJEKTE",
  destaque: {
    nome: "Tourmaline Tower",
    meta: "Porto Belo / SC · Kommendes Projekt",
    texto:
      "Einunddreißig Stockwerke im Viertel Vila Nova in Porto Belo (SC), mit einer Dachterrasse am höchsten Punkt der Region.",
  },
  imagens: [
    { ...imagemLounge, alt: "Gourmet-Lounge des Tourmaline Tower mit Panoramablick auf das Meer" },
    { ...imagemTorre, alt: "Beleuchteter Turm in der Abenddämmerung" },
  ],
};

/* ----------------------------------------------------------------- INVEST */

/* Mesmo cuidado do português: nada aqui descreve rentabilidade. */
export const investDe: typeof invest = {
  titulo: "Verfolgen Sie den Stand Ihrer SCP-Investition mit",
  produto: "AMAAN INVEST",
  texto:
    "Einlagen, Ausschüttungen und Ihre Beteiligung am Ergebnis, Monat für Monat, am selben Ort, an dem Sie den Baufortschritt verfolgen.",
  cta: { label: "Amaan Invest öffnen", href: PORTAL },
  mockup: {
    ...invest.mockup,
    alt: "Die App Amaan Invest auf einem Smartphone mit eingezahltem Kapital, erhaltenen Beträgen und der Entwicklung der SCP-Ausschüttungen",
  },
};

/* ----------------------------------------------------------------- RODAPÉ */

export const rodapeDe: typeof rodape = {
  titulo: "AMAAN",
  assinatura: "Lebendige Immobilien",
  frase: "Vertrauen, um zu bauen, was bleibt.",
  cta: { label: "Sprechen Sie mit unserem Team", href: WHATSAPP_DE },
  colunas: [
    {
      titulo: "Unternehmen",
      links: [
        { label: "Die Vision", href: "#sobre" },
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
    "2026. Alle Rechte vorbehalten.",
  ],
};
