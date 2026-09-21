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
 *   até 2,5% ao mês. Esse número continua com validação documental pendente
 *   antes de publicar: ver a nota logo acima de `lp2`.
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
 * A LP02 não tem equivalente: o bloco de risco e a nota do potencial
 * projetado saíram da página a pedido do cliente, e o rodapé dela fecha sem
 * aviso jurídico.
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
   O QUE · ONDE · POR QUE · COMO · QUEM · POR QUE AMAAN · QUANDO · PERFIL ·
   PROVA · CONVERSÃO.

   O bloco RISCO ("O que precisa estar claro antes da decisão") vinha entre
   QUANDO e PERFIL e saiu a pedido do cliente. O que restou de ressalva na
   página é o lado "não faz sentido para quem", em `perfil`.

   Duas regras do modelo mandam em tudo que está aqui dentro:

   1. A AMAAN continua sendo incorporadora. A SCP é uma porta para participar
      economicamente de determinadas operações — nunca um produto financeiro,
      e a página nunca fala como banco, gestora ou fintech.
   2. O potencial de até 2,5% ao mês é dado/projeção da operação específica,
      sujeito a premissas, prazo, riscos e documentos. Nunca promessa
      institucional.

   Convenção herdada da home: o que vier entre « » sai em dourado.
   ===================================================================== */

/*
 * O NÚMERO DA OPERAÇÃO — onde ele está e o que ainda falta validar.
 *
 * O qualificador ("Potencial projetado da operação apresentada") e o
 * disclaimer que o acompanhavam no hero foram retirados a pedido do cliente,
 * junto com o asterisco do título que aterrissava neles. Sobrou o "até"
 * colado ao número — o único qualificador que ainda impede a leitura de taxa
 * contratada —, escrito por extenso em três frases: `lp2.hero.titulo`,
 * `lp2.como.tese` e `lp2.formulario.texto`. Trocar o número exige editar as
 * três.
 *
 * ⚠️ VALIDAÇÃO DOCUMENTAL PENDENTE ANTES DE PUBLICAR. O modelo condiciona a
 * publicação a validar: memória de cálculo dos 2,5% a.m., período
 * considerado, forma de distribuição/realização do resultado, prazo da
 * operação, disponibilidade real de participação e demais condições
 * contratuais.
 */

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
     O QUE + ONDE + o potencial projetado, as três coisas que o modelo manda
     aparecer sem ambiguidade no primeiro scroll. */
  hero: {
    titulo:
      "Participe economicamente de uma incorporação no litoral catarinense, com potencial projetado de resultado de até 2,5% ao mês.",
    texto:
      "Conheça uma operação da AMAAN estruturada para quem quer acessar o mercado imobiliário «pelo lado de quem desenvolve o empreendimento», não pelo lado de quem compra a unidade pronta.",
    /* Sem `imagem`: a foto do hero saiu daqui quando virou o fundo do bloco,
       e agora é a mesma da home, lida de `hero.image` no `site-config` (ver
       `FundoHero`, em lp-ui.tsx). A regra que escolhia esta foto continua
       valendo para a de lá: render oficial de empreendimento real, nunca o
       repertório visual de banco, bolsa ou fintech, e — se a operação for a
       Tourmaline — só imagem oficial, sem recriação por IA. */
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
      "Na AMAAN, a participação é formalizada por contrato que estabelece as condições específicas de cada operação, incluindo «prazos de entrada e saída, percentuais de lucro, garantias aplicáveis» e demais regras da participação.",
  },

  /* -------------------------------------------------------------- 03 ONDE */
  onde: {
    titulo: "Por que o litoral catarinense?",
    tese: "Não basta escolher participar de uma incorporação. Importa onde essa incorporação acontece.",
    abertura:
      "A AMAAN atua no litoral de Santa Catarina, região que concentra «algumas das praças imobiliárias de maior valor do Brasil». A força imobiliária se conecta a turismo, mobilidade e atratividade regional.",
    /**
     * O lugar, filmado, no fundo do bloco que fala dele.
     *
     * Substituiu a foto `/fotos/site4.jpg`, que ocupava um painel na coluna
     * direita: é a mesma leitura, aérea da orla verticalizada encontrando o
     * mar, com o movimento que a foto parada não tinha. Continua valendo a
     * regra que escolheu a foto — o modelo pede repertório de lugar real, e
     * uma filmagem genérica de praia diria "litoral" sem dizer "este
     * litoral".
     *
     * `poster` é um quadro do próprio arquivo, extraído em 0,5s. É o que a
     * seção mostra antes de o vídeo chegar e para quem pediu menos
     * movimento, então precisa ser deste vídeo e não de outra imagem.
     *
     * ⚠️ O arquivo está num bucket do Supabase que responde
     * `Cache-Control: no-cache`, ou seja, o navegador revalida a cada visita
     * em vez de reusar o que já baixou. Se o vídeo for ficar, vale servi-lo
     * de `/public` ou ajustar o cache do bucket.
     */
    video: {
      src: "https://vlxejpotqiodxdlmmqel.supabase.co/storage/v1/object/public/videos/hero.mp4",
      poster: "/fotos/onde-video-poster.jpg",
    },
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
    /* Dois parágrafos e nenhuma tese: o texto aprovado pelo cliente abre no
       potencial e fecha na qualificação do perfil, e promover qualquer uma
       das duas metades a tese desequilibraria o par. */
    paragrafos: [
      "A incorporação está justamente na etapa do mercado imobiliário «em que o valor é criado»: transformar terreno, projeto, capital e execução em um empreendimento comercializável. Participar dessa operação permite ao investidor acessar diretamente esse potencial econômico, com possibilidade de resultados mais elevados do que alternativas imobiliárias tradicionais.",
      "Investir em uma incorporação pode não ser a escolha ideal para todos os perfis. Mas, para muitos investidores, pode representar uma nova alternativa para diversificar o patrimônio e acessar o mercado imobiliário por outro ângulo: «participando economicamente da operação que desenvolve o empreendimento», e não apenas adquirindo o imóvel pronto.",
    ],
  },

  /* -------------------------------------------------------------- 05 COMO */
  como: {
    titulo: "De onde vem o resultado?",
    tese: "Uma projeção de até 2,5% ao mês só faz sentido quando você entende o que precisa acontecer para produzi-la.",
    /** a tabela ETAPA × LÓGICA do modelo, na ordem em que o dinheiro anda */
    etapas: [
      {
        etapa: "Capital",
        logica: "O investidor aporta conforme as regras contratuais.",
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

  /* -------------------------------------------------------- 07 POR QUE AMAAN
     O bloco inteiro virou uma frase só. O título anterior, os parágrafos de
     apoio, o fecho e o CTA saíram a pedido do cliente: sobrou a declaração
     do que a AMAAN faz, centralizada, ocupando a seção como título dela. */
  porQueAmaan: {
    titulo:
      "A atividade central da AMAAN é identificar oportunidades, desenvolver produtos imobiliários, estruturar e executar incorporações e criar «Empreendimentos Vivos», pensados para continuar servindo as pessoas, produzindo valor e permanecendo relevantes depois da entrega.",
  },

  /* ------------------------------------------------------------ 08 QUANDO */
  quando: {
    titulo: "Por que analisar agora?",
    tese: "Uma oportunidade de incorporação tem janela.",
    paragrafos: [
      "Seu investimento está vinculado a uma operação específica, com «necessidade de capital, cronograma, regras e disponibilidade próprios». Conhecer uma oportunidade hoje não significa que a mesma condição estará disponível depois.",
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

  /* --------------------------------------------------------- 12 CONVERSÃO */
  formulario: {
    titulo: "Analise uma operação real da AMAAN",
    recap:
      "Você já sabe «o que é a oportunidade, quem está por trás dela, onde atuamos, como a participação funciona e por que uma operação tem janela própria».",
    texto:
      "Para entender as premissas que sustentam o potencial projetado de até 2,5% ao mês, deixe seus dados.",
  },

  /* -------------------------------------------------------- 13 FECHAMENTO
     Sem tese: a frase que fechava a página ("A participação via SCP é uma
     porta adicional. A AMAAN permanece incorporadora.") saiu a pedido do
     cliente, e o rodapé fecha só com a assinatura e a pessoa jurídica. */
  fechamento: {
    marca: "AMAAN INCORPORADORA",
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
