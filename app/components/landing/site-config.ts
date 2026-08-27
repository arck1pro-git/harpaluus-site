/**
 * Conteúdo e imagens da home institucional da Amaan Incorporadora.
 * A página fala da empresa; o Tourmaline Tower aparece como o empreendimento
 * em destaque, não como assunto da home — e nunca como oferta: nada de
 * reserva, venda ou chamada para o comercial.
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
 * As âncoras levam `/#`: o mesmo menu funciona a partir de qualquer rota
 * futura (volta para a home e rola). `#contato` fica sem a barra de
 * propósito — o rodapé existe em todas as páginas.
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
    meta: "Porto Belo / SC · Futuro Lançamento",
    texto:
      "Trinta e um pavimentos no bairro Vila Nova em Porto Belo SC, com rooftop no ponto mais alto da região. É o primeiro Empreendimento Vivo da Amaan: um prédio em que a operação foi desenhada junto com a planta.",
    /* nenhuma chamada comercial: o convite é para a conversa, e só */
    cta: { label: "Fale com a Amaan", href: WHATSAPP },
  },
  /** a principal, maior, e a torre ao lado */
  imagens: [
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
  ] satisfies SiteImage[],
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
      links: [{ label: "Tourmaline Tower", href: "/#empreendimentos" }],
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
    "Amaan Incorporadora · CNPJ 50.550.515/0001-33",
    "R. Dorvalino Voltolini, 179 · Perequê, Porto Belo/SC",
    "2026. Todos os direitos reservados.",
  ],
};
