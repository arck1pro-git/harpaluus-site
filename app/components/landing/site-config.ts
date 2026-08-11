/**
 * Conteúdo e imagens da home institucional da Harpaluus Incorporadora.
 * A página fala da empresa; o Tourmaline Tower aparece como o empreendimento
 * em destaque, não como assunto da home.
 *
 * Todas as imagens ficam concentradas aqui: para trocar qualquer foto basta
 * alterar `src` (arquivo em /public) e, se necessário, `position`, que define
 * o enquadramento do recorte (CSS object-position).
 */

export type NavItem = {
  label: string;
  href: string;
  /** abre em nova aba (destinos fora do site) */
  externo?: boolean;
};

export type SiteImage = {
  src: string;
  alt: string;
  /** object-position do recorte, ex.: "center 55%" */
  position: string;
};

export const marca = "Harpaluus Incorporadora";

export const WHATSAPP = "https://wa.me/554792399626";

export const logo = {
  src: "/logo.png",
  alt: marca,
  width: 357,
  height: 123,
};

export const nav: NavItem[] = [
  { label: "Sobre", href: "#sobre" },
  { label: "Empreendimentos", href: "#empreendimentos" },
  { label: "Contato", href: "#contato" },
  {
    label: "Portal do Investidor",
    href: "https://meuari.vercel.app",
    externo: true,
  },
];

/* ------------------------------------------------------------------ HERO */

export const hero = {
  image: {
    src: "/tourmaline4.png",
    alt: "Rooftop de empreendimento da Harpaluus ao pôr do sol, com a cidade e o mar ao fundo",
    position: "center 55%",
  } satisfies SiteImage,
  titulo: "A arquitetura na era da inteligência.",
  texto:
    "Incorporamos empreendimentos de alta performance no litoral catarinense, onde arquitetura, tecnologia e eficiência operacional nascem da mesma decisão de projeto.",
  cta: { label: "Conheça a incorporadora", href: "#sobre" },
};

/* ------------------------------------------------------------------ SOBRE */

export const sobre = {
  titulo: "A SOBERANIA DA EFICIÊNCIA",
  lead: "Precisão em cada decisão.",
  paragrafos: [
    "Em um mercado de commodities, a verdadeira soberania não nasce do volume, mas da precisão técnica e da preservação patrimonial.",
    "A Harpaluus incorpora ativos imobiliários concebidos para atravessar ciclos: edifícios em que a governança predial, a tipologia e a experiência são decididas antes da forma — e não depois dela.",
  ],
};

/* ---------------------------------------------------------------- PILARES */

export const pilares = {
  titulo: "QUATRO PILARES.",
  texto:
    "Cada empreendimento nasce da mesma estrutura de decisão — infraestrutura, tipologia, operação e percepção. Nesta ordem, e nunca isoladamente.",
  itens: [
    {
      titulo: "Sistema Operacional Predial",
      descricao:
        "Infraestrutura inteligente que reduz risco e custo ao longo do tempo.",
    },
    {
      titulo: "Engenharia de Performance",
      descricao: "Tipologia desenhada para eficiência de capital.",
    },
    {
      titulo: "Máquina de Yield Integrada",
      descricao: "Infraestrutura física ativada por sistema operacional.",
    },
    {
      titulo: "Experiência e Percepção de Valor",
      descricao: "Percepção premium é o que protege preço no longo prazo.",
    },
  ],
};

/* -------------------------------------------------------- EMPREENDIMENTOS */

export const empreendimentos = {
  titulo: "EMPREENDIMENTOS",
  destaque: {
    nome: "Tourmaline Tower",
    meta: "Porto Belo / SC · Em lançamento",
    /** coordenadas de Porto Belo/SC (-27.1578, -48.5528) */
    coordenadas: "27°09′S 48°33′W",
    texto:
      "Trinta e um pavimentos na Vila Nova, com rooftop no ponto mais alto da região. O primeiro ativo de Porto Belo totalmente ativado por um sistema operacional predial.",
    cta: { label: "Falar com o time comercial", href: WHATSAPP },
  },
  /** A primeira imagem é a grande; as outras três formam a coluna menor. */
  galeria: [
    {
      src: "/tourmaline2.png",
      alt: "Lounge gourmet do Tourmaline Tower, com vista panorâmica para o mar",
      position: "38% center",
    },
    {
      src: "/tourmaline perspectiva.png",
      alt: "Fachada em pele de vidro com elementos metálicos dourados",
      position: "68% 60%",
    },
    {
      src: "/tourmaline3.png",
      alt: "Torre iluminada ao entardecer",
      position: "center 40%",
    },
    {
      src: "/tourmaline5.png",
      alt: "Área de convivência externa com lareira e pergolado",
      position: "70% center",
    },
  ] satisfies SiteImage[],
};

/* ----------------------------------------------------------------- RODAPÉ */

export const rodape = {
  titulo: "HARPALUUS",
  frase: "Arquitetura, tecnologia e eficiência no litoral catarinense.",
  cta: { label: "Falar com o time comercial", href: WHATSAPP },
  colunas: [
    {
      titulo: "Incorporadora",
      links: [
        { label: "Sobre", href: "#sobre" },
        { label: "Pilares", href: "#pilares" },
      ],
    },
    {
      titulo: "Empreendimentos",
      links: [{ label: "Tourmaline Tower", href: "#empreendimentos" }],
    },
    {
      titulo: "Contato",
      /** `icone` é a chave do mapa em footer.tsx */
      links: [
        { label: "WhatsApp", href: WHATSAPP, icone: "whatsapp" },
        {
          label: "Instagram",
          href: "https://www.instagram.com/",
          icone: "instagram",
        },
        {
          label: "Localização",
          href: "https://www.google.com/maps/search/?api=1&query=R.+Dorvalino+Voltolini,+179+-+Perequ%C3%AA,+Porto+Belo+-+SC",
          icone: "local",
        },
      ],
    },
  ],
  legais: [
    "Incorporadora Harpaluus · CNPJ 50.550.515/0001-33",
    "R. Dorvalino Voltolini, 179 — Perequê, Porto Belo/SC",
    "2026. Todos os direitos reservados.",
  ],
  social: {
    instagram: "https://www.instagram.com/",
    whatsapp: WHATSAPP,
    linkedin: "https://www.linkedin.com/",
    localizacao:
      "https://www.google.com/maps/search/?api=1&query=R.+Dorvalino+Voltolini,+179+-+Perequ%C3%AA,+Porto+Belo+-+SC",
  },
};
