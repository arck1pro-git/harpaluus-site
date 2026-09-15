/**
 * Conteúdo das landing pages do Funil 1 — SCP.
 *
 * A copy vem dos briefs — `AMAAN_LP01_Checklist` para a LP01 e
 * `AMAAN_LP2_Modelo_Completo_6_Perguntas` para a LP02 —, transcrita sem
 * reescrita: os textos foram aprovados como copy final, então este arquivo é
 * o lugar de editá-los, e nenhuma página inventa frase própria.
 *
 * As duas páginas são de momentos diferentes do funil, e a diferença mais
 * importante entre elas está no que podem dizer:
 *
 * - A LP01 não cita rentabilidade, aporte, prazo, garantia ou dados de uma
 *   operação específica. Ela vende o critério de análise, não o negócio.
 * - A LP02 apresenta uma operação real e, com ela, o potencial projetado de
 *   até 2,5% ao mês. Esse número tem regras próprias de exibição e uma
 *   validação documental pendente: ver `POTENCIAL`.
 *
 * O que vale para as duas: nenhuma promete segurança, ausência de risco ou
 * resultado, e em nenhuma o risco é letra miúda — ele é parte do argumento.
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
 * Aviso legal da LP01, no fecho.
 *
 * Fica visível no encerramento, não escondido em letra de 10px: o brief pede
 * transparência como construção de confiança.
 *
 * A LP02 não tem mais o equivalente. O risco continua na página, no bloco
 * "O que precisa estar claro antes da decisão" e na nota do potencial
 * projetado (ver `POTENCIAL`), mas o rodapé dela fecha sem aviso jurídico.
 */
export const AVISO_LP1 =
  "Participações em operações de incorporação envolvem riscos. O material possui caráter educacional e não representa promessa de resultado ou oferta específica de investimento.";


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
      "Uma projeção de resultado pode chamar atenção. Mas ela, sozinha, não mostra se uma oportunidade faz sentido. Criamos um Checklist prático para ajudar você a analisar o negócio por trás de um investimento em SCP para ter segurança na sua tomada de decisão.",
  },

  rentabilidade: {
    titulo: "Não comece sua análise pela rentabilidade.",
    paragrafos: [
      "Quando uma oportunidade de participação em uma incorporação chega até você, é natural querer saber: «Quanto pode render?»",
      "Mas existe uma pergunta que deveria vir antes: «De onde precisa vir esse resultado?»",
      "Uma SCP não produz resultado por existir. Por trás dela existe uma atividade econômica real que precisa funcionar: no nosso caso, uma incorporação imobiliária.",
      "Existe um empreendimento que precisa ser viável, uma estratégia que precisa fazer sentido, capital que precisa ser utilizado, uma incorporadora que precisa executar e riscos que precisam ser considerados.",
    ],
    /** a frase que o brief manda destacar visualmente */
    tese: "Antes de perguntar quanto rende, descubra como se produz o resultado.",
  },

  /**
   * As 7 perguntas do material.
   *
   * A página não lista mais as perguntas: entregá-las abertas no site tirava
   * o motivo de baixar o Checklist. O que sobrou aqui é o índice do documento
   * — só o mockup do hero o usa, como capa do material (`curta` é o rótulo
   * gráfico dessa capa; `pergunta` e `texto` são o conteúdo do PDF).
   */
  perguntas: {
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
        pergunta: "Como esses riscos são mitigados, e quais continuam existindo?",
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

  /**
   * Para quem é.
   *
   * Os três tópicos do brief começavam todos por "Para quem" e, empilhados,
   * liam como um parágrafo só. Viraram segunda pessoa: mesma informação, e a
   * pessoa se reconhece na primeira palavra em vez de na quarta.
   */
  paraQuem: {
    titulo: "Para quem criamos este Checklist?",
    itens: [
      "Você já conhece ou começou a pesquisar sobre SCP no mercado imobiliário.",
      "Você recebeu uma oportunidade e quer saber o que deveria analisar.",
      "Você quer conhecer essa forma de participação, mas não quer decidir olhando apenas para uma projeção.",
    ],
    fecho:
      "Você não precisa começar sabendo todas as respostas. Precisa começar fazendo as perguntas certas.",
  },

  /**
   * Por que a incorporadora fez o material.
   *
   * Responde à desconfiança natural do bloco anterior: quem entregou a lista
   * é a mesma parte interessada que vai apresentar uma oportunidade. O
   * argumento é o do bloco "POR QUE AMAAN" do brief da LP02, onde a
   * autoridade nasce da incorporação e não de uma imagem de instituição
   * financeira, aqui reduzido ao que explica a existência do Checklist.
   */
  porQueChecklist: {
    titulo: "Por que uma incorporadora criou um checklist para investidores?",
    paragrafos: [
      "A AMAAN é uma incorporadora. Nosso trabalho começa antes de existir qualquer oportunidade de participação, em decisões sobre «terreno, mercado, produto, viabilidade, arquitetura, estruturação, desenvolvimento e comercialização».",
      "É essa atividade que precisa criar valor. Por isso, quando estruturamos uma oportunidade, queremos que o investidor consiga «olhar além da projeção» e compreender a operação imobiliária que existe por trás dela.",
      "As perguntas deste Checklist são as mesmas que precisamos responder antes de desenvolver uma incorporação. Ele não foi escrito para apresentar uma operação nossa, e sim para que você saiba «o que analisar em qualquer uma».",
    ],
    tese: "Não começamos pelo investimento. Começamos pela incorporação.",
  },

  formulario: {
    titulo: "Receba gratuitamente o Checklist",
    texto: "Preencha seus dados e receba as 7 perguntas por e-mail.",
  },

  fechamento: {
    marca: "AMAAN Incorporadora",
    tese: "Antes de procurar a maior projeção, aprenda a analisar o negócio que precisa produzi-la.",
    aviso: AVISO_LP1,
  },
};

/* ========================================================================
   LP 02 — PARTICIPAÇÃO EM INCORPORAÇÃO VIA SCP

   Copy do modelo completo (`AMAAN_LP2_Modelo_Completo_6_Perguntas`), que
   substituiu o brief educacional anterior. A página existe para levar um
   investidor já minimamente consciente a querer conhecer uma operação real
   da AMAAN — ela vende a oportunidade de analisar e participar de uma
   incorporação, não uma aula sobre o que é SCP.

   A estrutura responde, nesta ordem, às seis perguntas do modelo:
   O QUE · ONDE · POR QUE · COMO · QUEM · POR QUE AMAAN · QUANDO · RISCO ·
   PERFIL · PROVA · CONVERSÃO.

   Duas regras do modelo mandam em tudo que está aqui dentro:

   1. A AMAAN continua sendo incorporadora. A SCP é uma porta para participar
      economicamente de determinadas operações — nunca um produto financeiro,
      e a página nunca fala como banco, gestora ou fintech.
   2. O potencial de até 2,5% ao mês é dado/projeção da operação específica,
      sujeito a premissas, prazo, riscos e documentos. Nunca promessa
      institucional, nunca número solto. Ver `POTENCIAL`, logo abaixo.

   Convenção herdada da home: o que vier entre « » sai em dourado.
   ===================================================================== */

/**
 * O número da operação — e as três coisas que o modelo obriga a manter
 * grudadas nele.
 *
 * Regra 3 das orientações ao designer: "sempre manter «até» + potencial/
 * projetado + asterisco/disclaimer visualmente próximo; nunca isolar o
 * número como se fosse taxa contratada". Regra 9: no celular, número,
 * qualificador e disclaimer precisam permanecer juntos. Por isso o
 * qualificador e o disclaimer sobem na tela por uma peça só, `Potencial` em
 * `lp-ui.tsx`, encostada no título do hero, onde o número está escrito.
 *
 * O "box obrigatório" que o modelo pedia no bloco COMO ("até 2,5% a.m. é
 * potencial, não taxa fixa nem renda garantida") foi retirado da página. A
 * nota do hero é, agora, o único lugar em que o número aparece qualificado.
 *
 * ⚠️ VALIDAÇÃO DOCUMENTAL PENDENTE ANTES DE PUBLICAR. O modelo condiciona a
 * publicação a validar: memória de cálculo dos 2,5% a.m., período
 * considerado, forma de distribuição/realização do resultado, prazo da
 * operação, disponibilidade real de participação e demais condições
 * contratuais.
 *
 * Trocar o número exige editar `valor` aqui e as três frases em que ele está
 * escrito por extenso: `lp2.hero.titulo`, `lp2.como.tese` e
 * `lp2.formulario.texto`.
 */
export const POTENCIAL = {
  /** sempre com o "até" colado: é o qualificador que impede a leitura de taxa */
  valor: "até 2,5% ao mês",
  qualificador: "Potencial projetado da operação apresentada",
  disclaimer:
    "Potencial/projeção da operação específica, sujeito à realização das premissas econômicas, comerciais e operacionais. Não constitui garantia de rentabilidade ou resultado.",
};

/** Foto de uma pessoa do bloco QUEM. `null` enquanto não houver imagem real. */
type Retrato = { src: string; alt: string } | null;

/** Depoimento do bloco de prova social. */
type Depoimento = {
  nome: string;
  /** o vínculo verdadeiro com a AMAAN, como o modelo exige */
  contexto: string;
  texto: string;
  foto: Retrato;
};

export const lp2 = {
  /**
   * "CTA dominante: QUERO CONHECER A OPORTUNIDADE. Repetir em pontos de
   * decisão sem multiplicar objetivos." Um rótulo só na página inteira — o
   * CTA mais macio que o hero usava ("quero entender como funciona") saiu
   * junto com o modelo educacional: aqui o primeiro clique já é o pedido.
   */
  cta: "Quero conhecer a oportunidade",
  ancora: "#interesse",

  /* ------------------------------------------------------------- 01 HERO
     O QUE + ONDE + POTENCIAL, as três coisas que o modelo manda aparecer
     sem ambiguidade no primeiro scroll. */
  hero: {
    titulo:
      "Participe economicamente de uma incorporação no litoral catarinense, com potencial projetado de resultado de até 2,5% ao mês.*",
    texto:
      "Conheça uma operação da AMAAN estruturada para quem quer acessar o mercado imobiliário «pelo lado de quem desenvolve o empreendimento», não pelo lado de quem compra a unidade pronta.",
    /**
     * Render oficial, do mesmo banco de imagens que a home usa. O modelo é
     * explícito nos dois sentidos: usar arquitetura/empreendimento real e
     * nunca códigos visuais de banco, bolsa ou fintech — e, se a operação
     * for a Tourmaline, somente imagens oficiais, sem recriação por IA.
     */
    imagem: {
      src: "/tourmaline4.png",
      alt: "Rooftop de empreendimento da Amaan ao pôr do sol, com a cidade e o mar ao fundo",
    },
  },

  /* ------------------------------------------------------------- 02 O QUE */
  oQue: {
    titulo: "O outro lado do mercado imobiliário",
    abertura:
      "Você provavelmente já conhece uma forma de investir no mercado imobiliário: «comprar o produto».",
    paragrafos: [
      "Mas antes de existir um apartamento pronto para ser comprado, existe uma operação que precisa encontrar o terreno, estudar viabilidade, desenvolver o produto, estruturar capital, aprovar, construir e comercializar.",
    ],
    tese: "A oportunidade aqui é participar economicamente da incorporação que produz o empreendimento.",
    fecho:
      "Na AMAAN, essa participação pode ocorrer por meio de uma «Sociedade em Conta de Participação (SCP)», conforme as regras específicas de cada operação.",
  },

  /* -------------------------------------------------------------- 03 ONDE */
  onde: {
    titulo: "Por que o litoral catarinense?",
    tese: "Não basta escolher participar de uma incorporação. Importa onde essa incorporação acontece.",
    abertura:
      "A AMAAN atua no litoral de Santa Catarina, região que concentra «algumas das praças imobiliárias de maior valor do Brasil». A força imobiliária se conecta a turismo, mobilidade e atratividade regional.",
    /**
     * Regra 4 do modelo: o dado precisa de fonte e data. Por isso cada item
     * carrega a própria fonte, e ela sobe na tela junto com o número.
     *
     * A ressalva que vinha depois da lista ("esses indicadores não garantem
     * valorização nem resultado") foi retirada da página. O que sustenta a
     * leitura de contexto, e não de promessa, é o `fecho` logo abaixo.
     *
     * ⚠️ "Validar novamente os dados no momento da publicação", diz a última
     * página do modelo.
     */
    indicadores: [
      {
        dado: "4 das 5",
        texto:
          "cidades com maior preço médio do metro quadrado residencial do país estavam em Santa Catarina: Itapema, Balneário Camboriú, Florianópolis e Itajaí.",
        fonte: "Índice FipeZAP, divulgado pelo CRECI-SC · maio de 2026",
      },
      {
        dado: "8,5 milhões",
        texto: "de passageiros aéreos passaram por Santa Catarina no ano.",
        fonte: "Secretaria de Portos, Aeroportos e Ferrovias de SC · 2025",
      },
      {
        dado: "526.703",
        texto:
          "turistas estrangeiros foram recebidos pelo estado no primeiro semestre.",
        fonte: "Secretaria de Estado do Turismo de SC · 1º semestre de 2025",
      },
    ],
    fecho:
      "Participar de uma incorporação no litoral catarinense é analisar uma operação inserida em um mercado de relevância nacional, em que «terreno, produto, preço, viabilidade e execução continuam determinantes».",
  },

  /* ----------------------------------------------------------- 04 POR QUE */
  porQue: {
    titulo: "Por que participar da incorporação?",
    abertura:
      "Quem compra uma unidade se relaciona economicamente com o ativo adquirido. Quem participa de uma SCP «se expõe ao resultado da própria operação de incorporação», conforme as regras contratadas.",
    tese: "É por assumir prazo, risco empresarial e variáveis de execução que uma operação de incorporação pode apresentar um potencial de resultado diferente de alternativas tradicionais.",
    fecho:
      "Isso não torna a SCP melhor para todos. Torna a análise diferente: você precisa compreender «qual negócio produzirá o resultado, quem executa, para onde vai o capital, quais riscos existem e quais premissas sustentam a projeção».",
  },

  /* -------------------------------------------------------------- 05 COMO */
  como: {
    titulo: "De onde pode vir o resultado?",
    tese: "Uma projeção de até 2,5% ao mês só faz sentido quando você entende o que precisa acontecer para produzi-la.",
    /** a tabela ETAPA × LÓGICA do modelo, na ordem em que o dinheiro anda */
    etapas: [
      {
        etapa: "Capital",
        logica: "O investidor aporta conforme as regras da SCP.",
      },
      {
        etapa: "Incorporação",
        logica:
          "O capital é utilizado na operação conforme finalidade e documentos específicos.",
      },
      {
        etapa: "Desenvolvimento",
        logica:
          "Terreno, projeto, aprovações, produto, obra e gestão avançam conforme o plano.",
      },
      {
        etapa: "Comercialização",
        logica: "O empreendimento precisa transformar produto em receita.",
      },
      {
        etapa: "Resultado",
        logica:
          "Receitas, custos, prazo e demais premissas determinam o resultado econômico efetivo.",
      },
      {
        etapa: "Participação",
        logica:
          "O investidor participa do resultado conforme as regras contratuais da operação.",
      },
    ],
  },

  /* -------------------------------------------------------------- 06 QUEM */
  quem: {
    titulo: "Quem está por trás da operação?",
    tese: "Em uma SCP de incorporação, você não analisa apenas um projeto. Analisa quem tomará as decisões que transformam a tese em empreendimento e a projeção em resultado.",
    incorporadora: {
      nome: "AMAAN Incorporadora",
      texto:
        "A AMAAN transforma oportunidades imobiliárias em patrimônio por meio de uma visão integrada de incorporação. Antes de construir, constrói uma tese: «por que este lugar, para quem, com qual proposta de valor, com qual lógica econômica e com qual capacidade de permanecer relevante».",
    },
    /**
     * `foto` fica `null` até existir imagem real de cada um em contexto de
     * trabalho. O modelo pede exatamente isso e proíbe qualquer enquadramento
     * que diminua a autoridade institucional, o que inclui ilustração
     * genérica ou retrato de banco de imagens no lugar da pessoa. Sem foto, o
     * cartão sobe tipográfico; com foto, ela entra sem mexer em mais nada.
     */
    pessoas: [
      {
        nome: "Fabrício Pavesi",
        papel: "Arquiteto, incorporador e empresário",
        texto:
          "Traz o olhar que conecta arquitetura, mercado imobiliário, negócios e patrimônio, enxergando terreno, viabilidade, produto, arquitetura, estratégia, execução e capacidade de geração de valor como partes da mesma decisão.",
        foto: null as Retrato,
      },
      {
        nome: "Patrícia",
        papel: "Empresária e estrategista, sócia da AMAAN",
        texto:
          "Traz experiência na construção e gestão de negócios, conectando estratégia, comercial, posicionamento, processos e execução para transformar visão em operação.",
        foto: null as Retrato,
      },
    ],
    fecho:
      "Dois olhares complementares, com a mesma responsabilidade: transformar uma boa oportunidade imobiliária em um empreendimento capaz de produzir valor.",
  },

  /* -------------------------------------------------------- 07 POR QUE AMAAN */
  porQueAmaan: {
    titulo: "A incorporadora antes do investimento",
    paragrafos: [
      "A atividade central da AMAAN é identificar oportunidades, desenvolver produtos imobiliários, estruturar e executar incorporações e criar «Empreendimentos Vivos», pensados para continuar servindo as pessoas, produzindo valor e permanecendo relevantes depois da entrega.",
      "A participação via SCP é uma porta adicional para investidores que desejam exposição econômica a determinadas operações. «A AMAAN permanece incorporadora.»",
    ],
    fecho:
      "Por isso, a pergunta central não é apenas «quanto pode render?». É se aquela incorporação faz sentido e se quem está por trás dela consegue executá-la.",
    tese: "Não começamos pelo investimento. Começamos pela incorporação.",
  },

  /* ------------------------------------------------------------ 08 QUANDO */
  quando: {
    titulo: "Por que analisar agora?",
    tese: "Uma oportunidade de incorporação tem janela.",
    paragrafos: [
      "Uma SCP está vinculada a uma operação específica, com «necessidade de capital, cronograma, regras e disponibilidade próprios». Conhecer uma oportunidade hoje não significa que a mesma condição estará disponível depois.",
    ],
    fecho:
      "O primeiro passo não é decidir investir. É «entender a operação enquanto existe a possibilidade real de participar dela».",
    /**
     * Bloco dinâmico obrigatório do modelo — e a razão de ele estar vazio.
     *
     * "Exibir somente informações reais, documentadas e atualizadas. Não usar
     * cronômetro, últimas vagas, encerra hoje ou escassez se a operação não
     * sustentar factual e documentalmente essa comunicação."
     *
     * Enquanto qualquer `valor` estiver em branco, a página inteira não
     * renderiza o bloco (ver `lp2/page.tsx`): nada de urgência artificial, e
     * nada de placeholder indo ao ar como se fosse dado. Preencher os três
     * com informação documentada é o que liga o bloco.
     */
    janela: {
      titulo: "Situação atual desta operação",
      itens: [
        { rotulo: "Participações disponíveis nesta operação", valor: "" },
        { rotulo: "Janela prevista para análise ou captação", valor: "" },
        { rotulo: "Prazo da operação", valor: "" },
      ],
    },
  },

  /* ------------------------------------------------------------- 09 RISCO */
  risco: {
    titulo: "O que precisa estar claro antes da decisão",
    abertura:
      "Se uma oportunidade apresenta potencial relevante, você também precisa entender «o que pode impedir o cenário projetado de acontecer». Mercado, vendas, custos, cronograma, aprovações e execução podem se comportar de forma diferente das premissas.",
    introSeparar: "Por isso, a apresentação de uma operação deve separar:",
    separar: ["Fato", "Premissa", "Projeção", "Mitigador", "Risco residual"],
    complemento: "Mitigação reduz risco. Não significa ausência de risco.",
    tese: "A transparência não enfraquece a venda. Ela mostra que a AMAAN espera que você compreenda a operação antes de participar.",
  },

  /* ------------------------------------------------------------ 10 PERFIL */
  perfil: {
    titulo: "Quem deve avançar",
    abertura:
      "Esta oportunidade pode fazer sentido para quem já construiu patrimônio e quer avaliar «outras formas de se relacionar economicamente com o mercado imobiliário».",
    /** os dois lados têm o mesmo peso: o modelo qualifica, não persuade */
    lados: [
      {
        titulo: "Faz sentido para quem",
        texto:
          "Aceita prazo e risco empresarial, consegue manter parte do capital alocada pelo período da operação, quer entender de onde vem o resultado e valoriza acesso a uma operação real de incorporação.",
      },
      {
        titulo: "Não faz sentido para quem",
        texto:
          "Precisa de liquidez imediata, procura retorno garantido, ausência de risco ou pretende decidir apenas pela maior taxa anunciada.",
      },
    ],
    tese: "Se você quer saber onde seu capital estará, quem tomará as decisões e qual negócio precisa funcionar para produzir o resultado projetado, faz sentido conhecer a operação.",
  },

  /* ------------------------------------------------------- 11 PROVA SOCIAL */
  prova: {
    titulo: "O que investidores que já conhecem a AMAAN perceberam na prática",
    /**
     * Vazio de propósito, e a seção inteira não sobe enquanto estiver assim.
     *
     * O modelo pede três depoimentos reais, "cada um com nome, foto/vídeo
     * real e contexto verdadeiro da relação com a AMAAN", e proíbe
     * transformar experiência individual em promessa de rentabilidade.
     * Depoimento inventado para segurar o layout é exatamente o que essa
     * regra existe para impedir — então o layout fica sem a seção até
     * existirem os três.
     */
    depoimentos: [] as Depoimento[],
  },

  /* --------------------------------------------------------- 12 CONVERSÃO */
  formulario: {
    titulo: "Analise uma operação real da AMAAN",
    recap:
      "Você já sabe «o que é a oportunidade, quem está por trás dela, onde atuamos, como a participação funciona e por que uma operação tem janela própria».",
    texto:
      "Para entender as premissas que sustentam o potencial projetado de até 2,5% ao mês, deixe seus dados.",
  },

  /* -------------------------------------------------------- 13 FECHAMENTO */
  fechamento: {
    marca: "AMAAN INCORPORADORA",
    tese: "A participação via SCP é uma porta adicional. A AMAAN permanece incorporadora.",
  },
};

/* ------------------------------------------------------------------ FORM */

/**
 * Opções de "já participou de SCP?".
 *
 * ⚠️ O modelo completo da LP02 reduziu esta pergunta a "Sim / Não", e as
 * quatro opções graduadas do brief anterior ("é a primeira vez que ouço
 * falar", "já conheço mas nunca participei", …) saíram com ele. Os `value`
 * antigos ficaram para trás: leads captados antes desta mudança chegaram ao
 * CRM com aquelas strings, então qualquer filtro salvo lá precisa ser
 * refeito para `sim`/`nao`.
 *
 * O `value` é o que chega no webhook; o `label`, o que o lead lê. São
 * strings estáveis de propósito — o comercial filtra por elas no CRM.
 */
export const PARTICIPOU_SCP = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
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
