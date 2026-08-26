/**
 * Conteúdo e imagens da home institucional da Amaan Incorporadora.
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

/** Chave do ícone de cada camada; o mapa vive em `pilares-section.tsx`. */
export type PilarIcone =
  | "arquitetura"
  | "tecnologia"
  | "sustentabilidade"
  | "servicos"
  | "experiencias"
  | "gestao";

export type SiteImage = {
  src: string;
  alt: string;
  /** object-position do recorte, ex.: "center 55%" */
  position: string;
};

export const marca = "Amaan Incorporadora";

export const WHATSAPP = "https://wa.me/554792399626";
/** Portal onde o investidor da SCP acompanha o próprio capital. */
export const PORTAL = "https://meuari.vercel.app";
/** Handle ainda no nome antigo: trocar quando o perfil da Amaan existir. */
export const INSTAGRAM = "https://www.instagram.com/harpaluus/";

/**
 * Lettering da Amaan, nas duas versões, já sem as margens vazias do arquivo
 * original — o alfa é o do próprio PNG, então nenhum fundo mostra retângulo.
 *
 * `logo` é o azul-escuro, para a barra branca; `logoClaro` é o creme com o
 * "INCORPORADORA" em dourado, para quando o header está transparente sobre a
 * foto. Os dois têm exatamente as mesmas medidas, o que permite empilhá-los e
 * fazer a troca em cross-fade.
 */
export const logo = {
  src: "/logo-amaan-name-03.png",
  alt: marca,
  width: 1410,
  height: 352,
};

export const logoClaro = {
  src: "/logo-amaan-name-01.png",
  alt: marca,
  width: 1410,
  height: 352,
};

/**
 * As âncoras da home levam `/#`: assim o mesmo menu funciona na home (rola
 * até a seção) e em /empreendimentos (volta para a home e rola). `#contato`
 * fica sem a barra de propósito — o rodapé existe em todas as páginas.
 */
export const nav: NavItem[] = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Empreendimentos", href: "/#empreendimentos" },
  { label: "Contato", href: "#contato" },
  {
    label: "Portal do Investidor",
    href: PORTAL,
    externo: true,
  },
];

/* ------------------------------------------------------------------ HERO */

export const hero = {
  image: {
    src: "/tourmaline4.png",
    alt: "Rooftop de empreendimento da Amaan ao pôr do sol, com a cidade e o mar ao fundo",
    position: "center 55%",
  } satisfies SiteImage,
  titulo: "Confiança para construir o que permanece.",
  texto:
    "Criamos Empreendimentos Vivos: ecossistemas imobiliários que continuam evoluindo, facilitando a vida e produzindo valor muito depois da entrega.",
  cta: { label: "Como pensamos um prédio", href: "#sobre" },
};

/* ------------------------------------------------------------------ SOBRE */

/**
 * A seção da ruptura: abre com a ideia forte, explica a tese e fecha no
 * território. É o "provocar → explicar → provar" do livro da marca.
 */
export const sobre = {
  titulo: "O ALTO PADRÃO ENVELHECEU.",
  /* O que vier entre « » sai em dourado (ver `ComDestaque`, em
     sobre-section.tsx). Um trecho por parágrafo: o dourado marca a virada de
     cada um, e deixa de marcar se estiver em toda linha. */
  lead: "Acabamento, design e lazer continuam importantes. O que define o próximo alto padrão é «o que o prédio faz por quem mora nele».",
  paragrafos: [
    "Isso exige «um sistema»: arquitetura, tecnologia, sustentabilidade, serviços, experiências e gestão conectadas desde o projeto, cada uma sustentando a seguinte.",
    "A Amaan é uma incorporadora catarinense que «concebe, desenvolve e opera» os próprios empreendimentos. A entrega das chaves abre o ciclo mais longo: é quando a vida do prédio começa e a operação passa a ser medida.",
  ],
};

/* ---------------------------------------------------------------- PILARES */

/**
 * As seis camadas do Empreendimento Vivo. O export continua chamado `pilares`
 * (e a âncora continua sendo #pilares) porque é o que os links do rodapé e o
 * observador do header já apontam — o conteúdo é que mudou.
 *
 * Cada descrição responde à pergunta-chave da marca: que consequência real
 * isso gera? Camada nenhuma entra por lista de diferenciais.
 *
 * O `icone` é decorativo: entra na lista com aria-hidden, porque o nome da
 * camada já está escrito ao lado.
 */
export const pilares = {
  titulo: "EMPREENDIMENTOS VIVOS.",
  texto:
    "Seis camadas decididas antes da primeira parede e mantidas muito depois da última chave. Nenhuma delas funciona sozinha.",
  itens: [
    {
      icone: "arquitetura",
      titulo: "Arquitetura",
      descricao:
        "Onde a torre se implanta, para onde as janelas olham, por onde as pessoas se cruzam. É a única camada que ninguém refaz depois que a obra sobe.",
    },
    {
      icone: "tecnologia",
      titulo: "Tecnologia",
      descricao:
        "A chave física sai de cena: biometria na entrada, QR para a visita, elevador e apartamento no celular. O morador percebe pelo tempo que deixa de perder.",
    },
    {
      icone: "sustentabilidade",
      titulo: "Sustentabilidade",
      descricao:
        "Cada apartamento mede a própria água, o próprio gás e a própria energia. No fim do mês, o rateio cobra o que você gastou, e só.",
    },
    {
      icone: "servicos",
      titulo: "Serviços",
      descricao:
        "Lavanderia, minimarket e coworking dentro do prédio. O apartamento fica preparado para render nos dias em que estiver vazio.",
    },
    {
      icone: "experiencias",
      titulo: "Experiências",
      descricao:
        "Rooftop, lounge gourmet e área externa com lareira, dimensionados para o uso de uma terça-feira comum.",
    },
    {
      icone: "gestao",
      titulo: "Gestão",
      descricao:
        "O prédio avisa que um sistema vai falhar antes de ele falhar, e o morador acompanha o reparo pelo aplicativo. Quem aluga entrega a operação para a gestão.",
    },
  ] satisfies { icone: PilarIcone; titulo: string; descricao: string }[],
  /** fecha a lista — é a consequência que amarra as seis camadas */
  fecho: "Dez anos depois da entrega, são elas que mantêm o prédio funcionando e o valor em pé.",
};

/* ----------------------------------------------------------------- INVEST */

/**
 * Participação em incorporação é uma relação específica, com regras próprias:
 * prazos, custos, garantias, tributação e riscos vivem no contrato de cada
 * SCP. Nada nesta seção descreve rentabilidade.
 */
export const invest = {
  /* O título termina no nome do produto, que sai em dourado — daí a frase
     vir partida em dois campos em vez de uma string só. */
  titulo: "Acompanhe o andamento do seu investimento em SCP com o",
  produto: "AMAAN INVEST",
  texto:
    "Aportes, distribuições e a sua participação nos resultados, mês a mês, no mesmo lugar em que você acompanha o avanço da obra.",
  cta: { label: "Acessar o Amaan Invest", href: PORTAL },
  mockup: {
    src: "/amaan-invest-mockup.webp",
    alt: "Aplicativo Amaan Invest em um celular, mostrando capital aportado, total recebido e a evolução das distribuições da SCP",
  },
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
      "Trinta e um pavimentos na Vila Nova, com rooftop no ponto mais alto da região. É o primeiro Empreendimento Vivo da Amaan: um prédio em que a operação foi desenhada junto com a planta.",
    cta: { label: "Conheça o empreendimento", href: "/empreendimentos" },
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
    "O primeiro Empreendimento Vivo da Amaan: um prédio pensado para funcionar bem no dia em que estiver cheio.",

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
    titulo: "PROJETADA DE TRÁS PARA FRENTE.",
    lead: "A operação foi decidida antes da forma.",
    paragrafos: [
      "Antes de desenhar a fachada, decidimos como a torre seria acessada, medida, mantida e operada. A planta veio atender essas decisões.",
      "As unidades entre 42 e 64 m² servem a públicos bem diferentes: executivo, agro, tecnologia, sucessão. A demanda fica distribuída entre eles, e essa é a ideia.",
      "A implantação em cota elevada, a uma distância equilibrada da praia, segue a mesma lógica. Vista e relação com a orla não se corrigem depois que a obra sobe.",
    ],
    imagem: {
      src: "/tourmaline perspectiva.png",
      alt: "Perspectiva do Tourmaline Tower: torre de pele de vidro com elementos metálicos dourados vista de baixo, contra o céu",
      position: "center",
    } satisfies SiteImage,
  },

  /**
   * As seis camadas do Empreendimento Vivo, materializadas neste edifício.
   *
   * Só entra aqui o que é decisão de projeto tomada ou contratada. Claims de
   * mercado (absorção, liquidez, taxa de ocupação) saíram: são projeção, não
   * fato, e o livro da marca pede fato e projeção separados.
   */
  dimensoes: {
    titulo: "AS SEIS CAMADAS, APLICADAS.",
    texto:
      "Camada por camada, o que já está decidido dentro do Tourmaline Tower.",
    itens: [
      {
        titulo: "Arquitetura",
        grupos: [
          {
            titulo: "Implantação",
            itens: [
              "Implantação em cota elevada",
              "Distância equilibrada da praia",
              "Torre de 31 pavimentos na Vila Nova",
            ],
          },
          {
            titulo: "Tipologia",
            itens: [
              "Unidades entre 42 m² e 64 m²",
              "Público amplo: executivo, agro, tecnologia e sucessão",
              "Flexibilidade de uso",
            ],
          },
          {
            titulo: "Neuroarquitetura aplicada",
            itens: [
              "Design biofílico",
              "Iluminação estratégica",
              "Integração com a paisagem e áreas de descompressão",
            ],
          },
        ],
      },
      {
        titulo: "Tecnologia",
        grupos: [
          {
            titulo: "Acesso sem chave",
            itens: [
              "Biometria facial e QR Code dinâmico",
              "Eliminação da chave física",
              "Gestão remota de acesso",
            ],
          },
          {
            titulo: "Infraestrutura integrada",
            itens: [
              "Controle inteligente de elevadores",
              "Infraestrutura tecnológica integrada às áreas comuns",
              "Controle do apartamento por aplicativo",
            ],
          },
        ],
      },
      {
        titulo: "Sustentabilidade",
        grupos: [
          {
            titulo: "Medição individual",
            itens: [
              "Telemetria individual de água, gás e energia",
              "Redução de desperdício e justiça no rateio",
            ],
          },
          {
            titulo: "Menos manutenção",
            itens: [
              "Gestão preventiva de sistemas hidráulicos e elétricos",
              "Manutenção programada por sistema",
            ],
          },
        ],
      },
      {
        titulo: "Serviços",
        grupos: [
          {
            titulo: "Rotina resolvida no edifício",
            itens: ["Lavanderia inteligente", "Minimarket interno"],
          },
          {
            titulo: "Trabalho e estadia",
            itens: [
              "Coworking integrado",
              "Preparado para short stay e locação executiva",
            ],
          },
        ],
      },
      {
        titulo: "Experiências",
        grupos: [
          {
            titulo: "Rooftop",
            itens: [
              "Rooftop panorâmico no ponto mais alto da região",
              "Presença vertical dominante na Vila Nova",
            ],
          },
          {
            titulo: "Convivência",
            itens: [
              "Lounge gourmet com vista para o mar",
              "Área externa com lareira e pergolado",
              "Áreas comuns dimensionadas para uso frequente",
            ],
          },
        ],
      },
      {
        titulo: "Gestão",
        grupos: [
          {
            titulo: "Operação monitorada",
            itens: [
              "Monitoramento técnico contínuo",
              "Alertas automatizados de manutenção",
              "Transparência operacional via aplicativo",
            ],
          },
          {
            titulo: "Patrimônio produtivo",
            itens: [
              "Gestão das plataformas de locação",
              "Precificação dinâmica e otimização de ocupação",
              "Hospedagem operada pela gestão do edifício",
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
    label: "Fale com nosso time",
    href: WHATSAPP,
  },
};

/* ----------------------------------------------------------------- RODAPÉ */

export const rodape = {
  titulo: "AMAAN",
  /** assinatura da marca, logo abaixo do nome */
  assinatura: "Empreendimentos Vivos",
  frase: "Confiança para construir o que permanece.",
  cta: { label: "Fale com nosso time", href: WHATSAPP },
  colunas: [
    {
      titulo: "Incorporadora",
      links: [
        { label: "A visão", href: "/#sobre" },
        { label: "Empreendimentos Vivos", href: "/#pilares" },
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
    "Incorporadora Amaan · CNPJ 50.550.515/0001-33",
    "R. Dorvalino Voltolini, 179 · Perequê, Porto Belo/SC",
    "2026. Todos os direitos reservados.",
  ],
};
