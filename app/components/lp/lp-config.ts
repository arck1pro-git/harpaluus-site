/**
 * Conteúdo das landing pages do Funil 1 — SCP.
 *
 * A copy é a dos briefs `AMAAN_LP01_Checklist` e `AMAAN_LP02_Educacao_SCP`,
 * transcrita sem reescrita: os textos foram aprovados como copy final, então
 * este arquivo é o lugar de editá-los, e nenhuma página inventa frase própria.
 *
 * Duas regras dos briefs valem para tudo aqui dentro e explicam ausências que
 * poderiam parecer esquecimento:
 *
 * 1. Nenhuma das páginas cita rentabilidade, aporte, prazo, garantia ou dados
 *    de uma operação específica — nem o Tourmaline. O funil vende o critério
 *    de análise, não o empreendimento.
 * 2. Nenhuma promete segurança, ausência de risco ou resultado. O bloco de
 *    risco é parte do argumento, não letra miúda.
 *
 * Convenção herdada da home: o que vier entre « » sai em dourado (ver
 * `ComDestaque`, em `../landing/com-destaque.tsx`). Um trecho por parágrafo —
 * o dourado marca a virada, e deixa de marcar se estiver em toda linha.
 */

import { marca, SITE_URL } from "../landing/site-config";

export { marca, SITE_URL };

/** Rotas das duas páginas, num lugar só: metadata, sitemap e links leem daqui. */
export const ROTA_LP1 = "/lp1";
export const ROTA_LP2 = "/lp2";

/**
 * Aviso legal de cada página, no fecho.
 *
 * Fica visível no encerramento, não escondido em letra de 10px: os briefs
 * pedem transparência como construção de confiança.
 */
export const AVISO_LP1 =
  "Participações em operações de incorporação envolvem riscos. O material possui caráter educacional e não representa promessa de resultado ou oferta específica de investimento.";

export const AVISO_LP2 =
  "Participações em operações de incorporação envolvem riscos. Projeções, quando apresentadas, dependem das premissas e do desempenho de cada operação e não constituem garantia de resultado. Condições, direitos, obrigações e riscos específicos devem ser avaliados conforme a documentação da oportunidade apresentada.";

/* ========================================================================
   LP 01 — CHECKLIST
   Conversão: cadastro para receber o Checklist. Atrito mínimo, sem
   perguntas de qualificação (orientação explícita do brief).
   ===================================================================== */

export const lp1 = {
  /** repetido em toda a página: o brief pede CTA principal consistente */
  cta: "Quero receber o checklist",
  /** âncora única para onde todos os CTAs apontam */
  ancora: "#receber",

  hero: {
    titulo:
      "Antes de participar de uma SCP imobiliária, existem 7 perguntas que você deveria saber responder.",
    texto:
      "Uma projeção de resultado pode chamar atenção. Mas ela, sozinha, não mostra se uma oportunidade faz sentido. Criamos um Checklist prático para ajudar você a analisar o negócio por trás da SCP, quem executa, para onde vai o capital, quais são os riscos e como funciona a participação.",
    /** duas etiquetas curtas, separadas por filete */
    apoio: ["Material gratuito", "Leitura rápida"],
  },

  rentabilidade: {
    titulo: "Não comece sua análise pela rentabilidade.",
    paragrafos: [
      "Quando uma oportunidade de participação em uma incorporação chega até você, é natural querer saber: «Quanto pode render?»",
      "Mas existe uma pergunta que deveria vir antes: «De onde precisa vir esse resultado?»",
      "Uma SCP não produz resultado simplesmente por existir. Por trás dela existe uma atividade econômica real que precisa funcionar. No nosso caso, uma incorporação imobiliária.",
      "Existe um empreendimento que precisa ser viável, uma estratégia que precisa fazer sentido, capital que precisa ser utilizado, uma incorporadora que precisa executar e riscos que precisam ser considerados.",
    ],
    /** a frase que o brief manda destacar visualmente */
    tese: "Antes de perguntar quanto rende, descubra quem produz o resultado.",
  },

  perguntas: {
    titulo: "As 7 perguntas",
    texto:
      "O que o Checklist pede que você responda antes de decidir participar de uma operação.",
    /** `curta` é o rótulo gráfico: só o mockup do material usa. */
    itens: [
      {
        pergunta: "Qual negócio deverá produzir o resultado?",
        curta: "O negócio",
        texto: "Entenda de onde deverá surgir o resultado econômico da operação.",
      },
      {
        pergunta: "Quem desenvolve e executa?",
        curta: "Quem executa",
        texto: "Uma projeção está no papel. Alguém precisa transformá-la em realidade.",
      },
      {
        pergunta: "A incorporação é economicamente viável?",
        curta: "A viabilidade",
        texto: "Entenda quais premissas sustentam o negócio.",
      },
      {
        pergunta: "Para onde vai o capital?",
        curta: "O destino do capital",
        texto: "Saiba qual é a função do dinheiro dentro da operação.",
      },
      {
        pergunta: "Quais são os principais riscos?",
        curta: "Os riscos",
        texto:
          "Toda incorporação possui riscos. Eles precisam ser identificados antes da decisão.",
      },
      {
        pergunta: "Como esses riscos são mitigados — e quais continuam existindo?",
        curta: "As mitigações",
        texto: "Mitigação não significa ausência de risco.",
      },
      {
        pergunta: "Quais são exatamente as regras da participação?",
        curta: "As regras da participação",
        texto:
          "Prazo, condições, forma de participação, liquidez, documentação e demais características precisam ser compreendidos em cada operação.",
      },
    ],
  },

  paraQuem: {
    titulo: "Para quem criamos este Checklist?",
    itens: [
      "Para quem já conhece ou começou a pesquisar sobre SCP no mercado imobiliário.",
      "Para quem recebeu uma oportunidade e quer saber o que deveria analisar.",
      "E para quem quer conhecer essa forma de participação, mas não quer tomar uma decisão olhando apenas para uma projeção.",
    ],
    fecho:
      "Você não precisa começar sabendo todas as respostas. Precisa começar fazendo as perguntas certas.",
  },

  formulario: {
    titulo: "Receba gratuitamente o Checklist",
    subtitulo: "7 perguntas antes de participar de uma SCP imobiliária",
    texto: "Preencha seus dados e receba o material.",
  },

  fechamento: {
    marca: "AMAAN Incorporadora",
    tese: "Antes de procurar a maior projeção, aprenda a analisar melhor o negócio que precisa produzi-la.",
    aviso: AVISO_LP1,
  },
};

/* ========================================================================
   LP 02 — EDUCAÇÃO SCP + INTERESSE
   Conversão: manifestação de interesse em conhecer uma oportunidade. O
   formulário qualifica (experiência e faixa de capital); a oferta não
   aparece na página.
   ===================================================================== */

export const lp2 = {
  cta: "Quero conhecer uma oportunidade",
  /** o CTA do hero é outro de propósito: ali ainda não se pede contato */
  ctaHero: "Quero entender como funciona",
  ancora: "#interesse",

  hero: {
    titulo:
      "Existe uma forma de participar do mercado imobiliário sem precisar comprar um apartamento.",
    texto:
      "Em vez de comprar somente o produto final, existem estruturas que permitem ao investidor participar economicamente de uma operação de incorporação. Mas, para entender essa possibilidade, você precisa primeiro entender de onde vem o resultado, quem precisa produzi-lo e quais riscos existem no caminho.",
    apoio:
      "E, ao final, se fizer sentido para você, poderá solicitar conhecer uma oportunidade estruturada pela AMAAN.",
  },

  modeloConhecido: {
    titulo: "O mercado imobiliário que você conhece começa pelo imóvel.",
    paragrafos: [
      "Quando pensamos em investir no mercado imobiliário, normalmente pensamos em comprar um imóvel: comprar na planta, esperar a obra avançar, acompanhar a valorização e depois vender, alugar ou manter.",
      "Nesse caso, você está comprando aquilo que uma incorporadora produziu.",
    ],
    tese: "É uma forma de participar do mercado imobiliário. Mas não é a única.",
    /** a jornada de quem compra o produto pronto */
    jornada: ["Compra na planta", "Obra avança", "Valorização", "Vender, alugar ou manter"],
  },

  outroLado: {
    titulo:
      "Antes de existir um apartamento para comprar, existe uma incorporação para desenvolver.",
    /** peça central da página: horizontal no desktop, vertical no mobile */
    etapas: [
      "Terreno",
      "Viabilidade",
      "Projeto e produto",
      "Estruturação e capital",
      "Desenvolvimento",
      "Comercialização",
      "Resultado da incorporação",
    ],
    paragrafos: [
      "É desse lado que está a incorporadora. Ela precisa identificar a oportunidade, entender o mercado, desenvolver o produto, estruturar a operação, controlar custos, executar e comercializar.",
      "E existem estruturas que permitem que outras pessoas participem economicamente de determinadas operações de incorporação.",
    ],
  },

  doisLados: {
    titulo: "Os dois lados da mesa",
    lados: [
      {
        titulo: "Comprar o imóvel",
        texto:
          "Você compra o produto desenvolvido pela incorporadora. Sua análise tende a olhar para apartamento, preço, localização, valorização, aluguel, custos e liquidez.",
      },
      {
        titulo: "Participar da incorporação",
        texto:
          "Você participa economicamente de uma operação empresarial. Por isso, precisa olhar também para viabilidade, execução, utilização do capital, vendas, custos, prazo e riscos.",
      },
    ],
    tese: "O empreendimento pode ser o mesmo. O lado da mesa é diferente.",
  },

  ondeEntraScp: {
    titulo: "E onde entra a SCP?",
    paragrafos: [
      "Uma das estruturas utilizadas para organizar esse tipo de participação é a «Sociedade em Conta de Participação — SCP».",
      "Mas entender apenas a sigla não é suficiente. As condições econômicas, regras, prazos, riscos e direitos dependem da estrutura e da documentação de cada operação.",
      "Por isso, quando a AMAAN apresenta uma oportunidade, nossa análise não começa pela sigla. «Começa pela incorporação.»",
    ],
  },

  origemResultado: {
    titulo: "Antes de perguntar quanto rende, descubra quem produz o resultado.",
    abertura:
      "Uma SCP não é uma máquina que transforma capital automaticamente em uma determinada rentabilidade. Existe um negócio por trás.",
    /** a cadeia que o brief manda destacar como maior peça visual da LP */
    cadeia: [
      "Capital",
      "Operação de incorporação",
      "Desenvolvimento do empreendimento",
      "Comercialização",
      "Resultado econômico da operação",
      "Participação conforme as regras estabelecidas",
    ],
    fecho:
      "Portanto, uma projeção de resultado precisa estar sustentada por premissas sobre uma operação que ainda precisa ser executada.",
    tese: "O número é consequência. Primeiro precisamos entender o negócio que deverá produzi-lo.",
  },

  analisar: {
    titulo: "O que analisar",
    texto: "O framework que usamos antes de qualquer conversa sobre número.",
    itens: [
      { chave: "O negócio", pergunta: "Por que aquela incorporação faz sentido?" },
      {
        chave: "A viabilidade",
        pergunta: "Quais premissas sustentam economicamente o empreendimento?",
      },
      { chave: "Quem executa", pergunta: "Qual incorporadora está por trás da operação?" },
      { chave: "O capital", pergunta: "Quanto é necessário, por quê e para onde ele vai?" },
      {
        chave: "O prazo e as regras",
        pergunta: "Como funciona aquela participação especificamente?",
      },
      { chave: "Os riscos", pergunta: "O que pode acontecer diferente do cenário projetado?" },
      {
        chave: "As mitigações",
        pergunta: "O que foi feito para reduzir esses riscos e quais continuam existindo?",
      },
    ],
  },

  risco: {
    titulo: "Toda incorporação possui riscos.",
    texto:
      "Custos podem variar. O mercado pode mudar. As vendas podem ocorrer em velocidade diferente da projetada. Prazos podem sofrer alterações. A execução pode impactar o resultado.",
    introLogica: "Por isso, uma análise responsável deveria seguir esta lógica:",
    logica: ["Risco", "Consequência", "Mitigação", "Risco residual"],
    tese: "Mitigar risco não significa eliminar risco.",
    complemento: "E nenhuma projeção deveria ser interpretada como garantia de resultado.",
  },

  porQueAmaan: {
    titulo: "Então por que a AMAAN está falando sobre investimento?",
    tese: "Porque nós não começamos pelo investimento. Começamos pela incorporação.",
    paragrafos: [
      "A AMAAN é uma incorporadora. Nosso trabalho começa antes da captação de uma oportunidade. Começa em decisões sobre terreno, mercado, produto, viabilidade, arquitetura, estruturação, desenvolvimento e comercialização.",
      "É essa atividade que precisa criar valor. Por isso, quando estruturamos uma oportunidade de participação, queremos que o investidor consiga olhar além da projeção e compreender a operação imobiliária que existe por trás dela.",
    ],
    contraste: {
      antes: "Não queremos que você simplesmente pergunte: Quanto pode render?",
      depois:
        "Queremos que também saiba perguntar: O que precisa acontecer para produzir esse resultado?",
    },
  },

  transicao: {
    titulo: "Agora você pode analisar uma oportunidade de outra forma.",
    abertura:
      "Conhecer uma oportunidade não deveria significar receber apenas aporte + prazo + projeção.",
    /** o brief traz isto como uma frase única com ponto e vírgula; a lista
        é a mesma frase, quebrada para leitura no celular */
    itens: [
      "O que está sendo desenvolvido",
      "Por que o negócio existe",
      "Quem executa",
      "Onde o capital será utilizado",
      "Como a operação pretende produzir resultado",
      "Quais são os riscos",
      "Como estão sendo mitigados",
      "Quais são as regras daquela participação",
    ],
    tese: "Só depois faz sentido decidir se vale a pena continuar a análise.",
  },

  formulario: {
    titulo: "Quer conhecer uma oportunidade de participação em uma incorporação da AMAAN?",
    paragrafos: [
      "A AMAAN possui operações próprias de incorporação e pode estruturar oportunidades de participação vinculadas a essas operações.",
      "Se você tem interesse, deixe seus dados. Nosso time poderá entender seu momento e, havendo compatibilidade, apresentar uma oportunidade para que você conheça sua estrutura, empreendimento, condições, riscos e documentação antes de tomar qualquer decisão.",
    ],
    aviso:
      "O preenchimento do formulário representa apenas manifestação de interesse e não implica compromisso de participação.",
  },

  fechamento: {
    marca: "AMAAN INCORPORADORA",
    tese: "Antes de perguntar quanto rende, descubra quem produz o resultado.",
    aviso: AVISO_LP2,
  },
};

/* ------------------------------------------------------------------ FORM */

/**
 * Opções de "já conhece ou participou de uma SCP?".
 *
 * O `value` é o que chega no webhook; o `label`, o que o lead lê. São
 * strings estáveis de propósito — o comercial filtra por elas no CRM.
 */
export const EXPERIENCIA_SCP = [
  { value: "nunca-ouvi", label: "É a primeira vez que ouço falar" },
  { value: "conheco-nao-participei", label: "Já conheço, mas nunca participei" },
  { value: "ja-participei", label: "Já participei de uma SCP" },
  { value: "participo-hoje", label: "Participo de uma ou mais hoje" },
] as const;

/**
 * Faixas de capital.
 *
 * O brief é explícito: "as faixas de capital devem ser definidas pelo
 * comercial conforme a operação vigente". As de baixo são um ponto de
 * partida usual de mercado, para a página não subir sem o campo — trocar
 * aqui é o suficiente, nenhuma outra parte do código lista faixas.
 */
export const FAIXAS_CAPITAL = [
  { value: "ate-100k", label: "Até R$ 100 mil" },
  { value: "100k-300k", label: "De R$ 100 mil a R$ 300 mil" },
  { value: "300k-500k", label: "De R$ 300 mil a R$ 500 mil" },
  { value: "500k-1m", label: "De R$ 500 mil a R$ 1 milhão" },
  { value: "acima-1m", label: "Acima de R$ 1 milhão" },
  { value: "prefiro-conversar", label: "Prefiro avaliar conversando" },
] as const;
