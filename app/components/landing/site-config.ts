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
export const INSTAGRAM = "https://www.instagram.com/harpaluus/";

/**
 * `logo.png` vem com fundo chapado #f5f4f0. `logo-transparente.png` é o mesmo
 * arquivo com o alfa reconstruído a partir do cinza — é ele que permite o
 * header translúcido no scroll sem o retângulo do PNG aparecer como mancha.
 */
export const logo = {
  src: "/logo-transparente.png",
  alt: marca,
  width: 357,
  height: 123,
};

/**
 * As âncoras da home levam `/#`: assim o mesmo menu funciona na home (rola
 * até a seção) e em /empreendimentos (volta para a home e rola). `#contato`
 * fica sem a barra de propósito — o rodapé existe em todas as páginas.
 */
export const nav: NavItem[] = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Empreendimentos", href: "/empreendimentos" },
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

/* --------------------------------------------- PÁGINA DO EMPREENDIMENTO */

/**
 * Conteúdo da página /empreendimentos.
 *
 * Os números e as listas vêm do material do próprio projeto (os mesmos que
 * alimentam `app/components/pilares.tsx`): 31 pavimentos, unidades de 42 a
 * 64 m², rooftop, implantação em cota elevada. Nada aqui é estimado — se um
 * dado novo entrar (preço, prazo, número de unidades), ele precisa vir do
 * material comercial, não deste arquivo.
 */
export const tourmaline = {
  nome: "Tourmaline Tower",
  local: "Porto Belo / SC",
  status: "Em lançamento",
  /** coordenadas de Porto Belo/SC (-27.1578, -48.5528) */
  coordenadas: "27°09′S 48°33′W",
  chamada:
    "O primeiro ativo de Porto Belo totalmente ativado por um sistema operacional predial.",

  capa: {
    src: "/tourmaline.png",
    alt: "Rooftop do Tourmaline Tower ao pôr do sol: piscina, pérgola iluminada e o emblema dourado da marca sobre a orla de Porto Belo",
    position: "center 58%",
  } satisfies SiteImage,

  /** faixa de dados logo abaixo da capa */
  ficha: [
    { valor: "31", rotulo: "pavimentos" },
    { valor: "42–64", rotulo: "m² por unidade" },
    { valor: "Rooftop", rotulo: "no ponto mais alto da região" },
    { valor: "Vila Nova", rotulo: "Porto Belo / SC" },
  ],

  apresentacao: {
    titulo: "UMA TORRE PROJETADA COMO ATIVO",
    lead: "A operação foi decidida antes da forma.",
    paragrafos: [
      "Antes da fachada, definimos como a torre seria medida, acessada, mantida e ocupada. A arquitetura veio depois — respondendo a essas decisões, e não o contrário.",
      "A tipologia entre 42 e 64 m² existe por liquidez: unidades que atravessam ciclos porque servem a públicos distintos — executivo, agro, tecnologia, sucessão — sem depender de nenhum deles em particular.",
      "A implantação em cota elevada, a uma distância equilibrada da praia, faz parte da mesma lógica. Protege a vista, protege o ativo e sustenta a percepção de valor no longo prazo.",
    ],
    imagem: {
      src: "/tourmaline perspectiva.png",
      alt: "Perspectiva do Tourmaline Tower: torre de pele de vidro com elementos metálicos dourados vista de baixo, contra o céu",
      position: "center",
    } satisfies SiteImage,
  },

  /** os quatro pilares da incorporadora, materializados neste edifício */
  dimensoes: {
    titulo: "OS PILARES, APLICADOS.",
    texto:
      "O método da Harpaluus não fica no discurso. Abaixo, o que cada pilar significa em decisão de projeto dentro do Tourmaline Tower.",
    itens: [
      {
        titulo: "Sistema Operacional Predial",
        grupos: [
          {
            titulo: "Monitoramento e prevenção",
            itens: [
              "Gestão preventiva de sistemas hidráulicos e elétricos",
              "Monitoramento técnico contínuo",
              "Controle inteligente de elevadores",
              "Alertas automatizados de manutenção",
            ],
          },
          {
            titulo: "Eficiência condominial",
            itens: [
              "Telemetria individual de água, gás e energia",
              "Redução de desperdício e justiça no rateio",
              "Transparência operacional via aplicativo",
            ],
          },
          {
            titulo: "Acesso e segurança",
            itens: [
              "Biometria facial e QR Code dinâmico",
              "Eliminação da chave física",
              "Gestão remota de acesso",
            ],
          },
        ],
      },
      {
        titulo: "Engenharia de Performance",
        grupos: [
          {
            titulo: "Ticket inteligente",
            itens: [
              "Unidades entre 42 m² e 64 m²",
              "Ticket de entrada otimizado",
              "Alta absorção de mercado",
            ],
          },
          {
            titulo: "Giro e rotatividade",
            itens: [
              "Maior taxa de ocupação",
              "Preparado para short stay e locação executiva",
              "Flexibilidade de uso",
            ],
          },
          {
            titulo: "Resiliência de ciclo",
            itens: [
              "Público amplo: agro, tecnologia, executivo, sucessão",
              "Alta liquidez secundária",
              "Estruturado para atravessar ciclos econômicos",
            ],
          },
        ],
      },
      {
        titulo: "Máquina de Yield Integrada",
        grupos: [
          {
            titulo: "Infraestrutura monetizável",
            itens: [
              "Rooftop panorâmico",
              "Coworking integrado",
              "Lavanderia inteligente e minimarket interno",
            ],
          },
          {
            titulo: "Gestão de performance",
            itens: [
              "Precificação dinâmica",
              "Gestão de plataformas",
              "Otimização de ocupação",
            ],
          },
          {
            titulo: "Arquitetura landmark",
            itens: [
              "Torre com 31 pavimentos",
              "Rooftop no ponto mais alto da região",
              "Presença vertical dominante na Vila Nova",
            ],
          },
        ],
      },
      {
        titulo: "Experiência e Percepção de Valor",
        grupos: [
          {
            titulo: "Neuroarquitetura aplicada",
            itens: [
              "Design biofílico",
              "Iluminação estratégica",
              "Integração com a paisagem e áreas de descompressão",
            ],
          },
          {
            titulo: "Percepção de modernidade",
            itens: [
              "Biometria facial e controle por aplicativo",
              "Infraestrutura tecnológica integrada",
              "Comunicação visual sofisticada",
            ],
          },
          {
            titulo: "Topografia estratégica",
            itens: [
              "Implantação em cota elevada",
              "Distância equilibrada da praia",
              "Localização pensada para proteção patrimonial",
            ],
          },
        ],
      },
    ],
  },

  galeria: [
    {
      src: "/tourmaline2.png",
      alt: "Lounge gourmet do Tourmaline Tower, com vista panorâmica para o mar",
      position: "38% center",
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
    {
      src: "/tourmaline4.png",
      alt: "Rooftop com a cidade e o mar ao fundo, ao pôr do sol",
      position: "center 55%",
    },
  ] satisfies SiteImage[],

  cta: {
    titulo: "Vamos falar sobre o Tourmaline.",
    texto:
      "O time comercial apresenta a tipologia, a operação e as condições do lançamento.",
    label: "Falar com o time comercial",
    href: WHATSAPP,
  },
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
        { label: "Sobre", href: "/#sobre" },
        { label: "Pilares", href: "/#pilares" },
      ],
    },
    {
      titulo: "Empreendimentos",
      links: [{ label: "Tourmaline Tower", href: "/empreendimentos" }],
    },
    {
      titulo: "Contato",
      /** `icone` é a chave do mapa em footer.tsx */
      links: [
        { label: "WhatsApp", href: WHATSAPP, icone: "whatsapp" },
        { label: "Instagram", href: INSTAGRAM, icone: "instagram" },
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
};
