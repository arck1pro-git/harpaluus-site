"use client";

import {
  useActionState,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

import { TRACO } from "../landing/icones";
import { registrarLead } from "./actions";
import { marcarLeadEnviado, useLeadJaEnviado } from "./ja-enviou";
import {
  ESTADO_INICIAL,
  type CampoLead,
  type EstadoLead,
  type OrigemLead,
} from "./lead";
import { FAIXAS_CAPITAL, PARTICIPOU_SCP } from "./lp-config";
import { rastrearLead } from "./meta-pixel";
import {
  CAMPOS_UTM,
  SEM_INSCRICAO,
  utmsDaVisita,
  utmsNoServidor,
} from "./utms";
import { ERRO_WHATSAPP, normalizarWhatsApp } from "./validar";

/**
 * Formulário das duas LPs do Funil 1.
 *
 * A LP01 pede só Nome, WhatsApp e E-mail — o brief proíbe qualificação
 * naquela página, porque a troca ali é por um material gratuito e cada campo
 * a mais custa cadastro. A LP02 acrescenta os dois campos que o modelo
 * completo define, nesta ordem: faixa de capital disponível e "já participou
 * de SCP?". Lá o custo do campo compensa — quem preenche está pedindo para
 * conhecer uma operação real, e é isso que o Comercial usa para priorizar.
 *
 * É um `<form>` de verdade com uma Server Action por trás, e o que a pessoa
 * digitou volta pelos `defaultValue` quando a validação recusa. A action
 * passa por uma função do cliente, que dispara o Lead do Pixel (ver `acao`).
 * O custo é o envio sem JavaScript: o formulário do hero da LP02 vem no HTML,
 * mas só envia com o JS carregado. Um envio feito antes da hidratação o React
 * guarda e repete assim que ela termina.
 */

/* ----------------------------------------------------------------- CAMPOS */

type Tom = "claro" | "escuro";

/**
 * Caixa com o rótulo dentro: o rótulo ocupa o lugar do texto enquanto o campo
 * está vazio e sobe para o topo da caixa quando ele ganha foco ou conteúdo.
 * O fundo levemente mais claro que o painel é o que diz "aqui se escreve"
 * sem precisar de borda forte.
 */
function estilosCampo(tom: Tom, invalido: boolean) {
  const base =
    "peer block h-[60px] w-full appearance-none rounded-xl border px-4 pt-6 pb-2 text-[16px] font-light outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:ring-4";

  const cor =
    tom === "escuro"
      ? "bg-white/[0.04] text-white placeholder:text-transparent focus:bg-white/[0.07] focus:ring-dourado-claro/10"
      : "bg-white text-azul-escuro placeholder:text-transparent focus:ring-dourado/10";

  const borda = invalido
    ? tom === "escuro"
      ? "border-dourado-claro/70"
      : "border-dourado-escuro"
    : tom === "escuro"
      ? "border-white/15 hover:border-white/30 focus:border-dourado-claro"
      : "border-linha hover:border-cinza focus:border-dourado";

  return `${base} ${cor} ${borda}`;
}

/** O rótulo pequeno, já no topo da caixa. */
const ROTULO_TOPO = "top-[11px] text-[10px] font-medium tracking-[0.18em] uppercase";

function corRotulo(tom: Tom) {
  return tom === "escuro" ? "text-white" : "text-azul-escuro";
}

/**
 * O rótulo flutuante.
 *
 * Depende do `placeholder=" "` no input: é o truque que dá ao CSS o seletor
 * `:placeholder-shown` para saber se o campo está vazio, sem estado em JS.
 * O rótulo continua sendo um `<label>` de verdade — nunca placeholder no
 * lugar de rótulo, que some justamente quando a pessoa vai conferir.
 */
function estilosRotulo(tom: Tom) {
  const focoCor =
    tom === "escuro" ? "peer-focus:text-dourado-claro" : "peer-focus:text-dourado-escuro";

  return `pointer-events-none absolute left-4 ${ROTULO_TOPO} transition-all duration-200 ${corRotulo(tom)} ${focoCor} peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-light peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-[11px] peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-medium peer-focus:tracking-[0.18em] peer-focus:uppercase`;
}

function Erro({ id, mensagem, tom }: { id: string; mensagem?: string; tom: Tom }) {
  if (!mensagem) return null;

  /* No painel escuro o dourado-escuro some contra o fundo: lá vai o claro. */
  return (
    <p
      id={id}
      className={`mt-2 pl-1 text-[13px] font-light ${
        tom === "escuro" ? "text-dourado-claro" : "text-dourado-escuro"
      }`}
    >
      {mensagem}
    </p>
  );
}

function Campo({
  nome,
  rotulo,
  tipo = "text",
  autoComplete,
  inputMode,
  tom,
  estado,
  erroLocal,
  onInput,
  onBlur,
}: {
  nome: CampoLead;
  rotulo: string;
  tipo?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email";
  tom: Tom;
  estado: EstadoLead;
  /** recusa detectada no próprio navegador, sem ida ao servidor */
  erroLocal?: string;
  onInput?: React.FormEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}) {
  const id = useId();
  /* O erro do cliente vem primeiro: é o mais recente. O do servidor é de
     antes da última vez que a pessoa mexeu no campo. */
  const erro = erroLocal ?? estado.erros?.[nome];
  const idErro = `${id}-erro`;

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          name={nome}
          type={tipo}
          inputMode={inputMode}
          autoComplete={autoComplete}
          required
          placeholder=" "
          defaultValue={estado.valores?.[nome] ?? ""}
          onInput={onInput}
          onBlur={onBlur}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? idErro : undefined}
          className={estilosCampo(tom, Boolean(erro))}
        />
        <label htmlFor={id} className={estilosRotulo(tom)}>
          {rotulo}
        </label>
      </div>
      <Erro id={idErro} mensagem={erro} tom={tom} />
    </div>
  );
}

function Selecao({
  nome,
  rotulo,
  opcoes,
  tom,
  estado,
}: {
  nome: CampoLead;
  rotulo: string;
  opcoes: readonly { value: string; label: string }[];
  tom: Tom;
  estado: EstadoLead;
}) {
  const id = useId();
  const erro = estado.erros?.[nome];
  const idErro = `${id}-erro`;

  /* O select não usa o rótulo flutuante: ele nunca fica "vazio" aos olhos do
     CSS — a primeira opção já é um valor —, então o rótulo mora no topo da
     caixa o tempo todo. A seta é desenhada aqui porque `appearance-none`
     remove a nativa. */
  return (
    <div>
      <div className="relative">
        <select
          id={id}
          name={nome}
          required
          defaultValue={estado.valores?.[nome] ?? ""}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? idErro : undefined}
          className={`${estilosCampo(tom, Boolean(erro))} cursor-pointer pr-11`}
        >
          <option value="" disabled>
            Selecione
          </option>
          {opcoes.map((opcao) => (
            <option key={opcao.value} value={opcao.value} className="text-azul-escuro">
              {opcao.label}
            </option>
          ))}
        </select>

        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 ${ROTULO_TOPO} ${corRotulo(tom)}`}
        >
          {rotulo}
        </label>

        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={TRACO}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 ${
            tom === "escuro" ? "text-white" : "text-azul-escuro"
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      <Erro id={idErro} mensagem={erro} tom={tom} />
    </div>
  );
}

/**
 * Poucas opções curtas (Sim / Não) viram botões lado a lado em vez de um
 * select: um toque só, e as duas respostas à vista. Por baixo continuam
 * rádios com o mesmo `name`, então o FormData que chega à action é idêntico
 * ao do select.
 */
function Escolha({
  nome,
  rotulo,
  opcoes,
  tom,
  estado,
}: {
  nome: CampoLead;
  rotulo: string;
  opcoes: readonly { value: string; label: string }[];
  tom: Tom;
  estado: EstadoLead;
}) {
  const id = useId();
  const erro = estado.erros?.[nome];
  const idErro = `${id}-erro`;

  const opcao =
    tom === "escuro"
      ? "bg-white/[0.04] text-white hover:border-white/30 peer-checked:border-dourado-claro peer-checked:bg-dourado-claro/10 peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-dourado-claro/20"
      : "bg-white text-azul-escuro hover:border-cinza peer-checked:border-dourado peer-checked:bg-dourado/10 peer-checked:text-azul-escuro peer-focus-visible:ring-4 peer-focus-visible:ring-dourado/20";

  const borda = erro
    ? tom === "escuro"
      ? "border-dourado-claro/70"
      : "border-dourado-escuro"
    : tom === "escuro"
      ? "border-white/15"
      : "border-linha";

  return (
    <fieldset aria-describedby={erro ? idErro : undefined}>
      <legend
        className={`mb-3 pl-1 text-[10px] font-medium tracking-[0.18em] uppercase ${corRotulo(tom)}`}
      >
        {rotulo}
      </legend>

      <div className="grid grid-cols-2 gap-3">
        {opcoes.map((item) => (
          <label key={item.value} className="relative cursor-pointer">
            <input
              type="radio"
              name={nome}
              value={item.value}
              required
              defaultChecked={estado.valores?.[nome] === item.value}
              className="peer sr-only"
            />
            <span
              className={`flex h-[52px] items-center justify-center rounded-xl border text-[15px] font-light transition-[border-color,background-color,color,box-shadow] duration-300 ${borda} ${opcao}`}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>

      <Erro id={idErro} mensagem={erro} tom={tom} />
    </fieldset>
  );
}

/* --------------------------------------------------------------- MÁSCARA */

/**
 * Formata o WhatsApp enquanto se digita: `(47) 99999-8888`.
 *
 * É enfeite de leitura, não validação — quem valida é a Server Action, que
 * recebe a string formatada e trabalha só com os dígitos. Por isso a máscara
 * pode ser ingênua: escreve no input direto, sem virar estado em React, o que
 * mantém o campo não-controlado e preserva o `defaultValue` de reidratação.
 */
function mascararWhatsApp(valor: string) {
  let digitos = valor.replace(/\D/g, "");

  /* Colar "+55 47 99999-8888" é comum. Sem tirar o 55 aqui, o corte em 11
     dígitos comeria o fim do número e a máscara exibiria outro telefone. */
  if (digitos.length > 11 && digitos.startsWith("55")) digitos = digitos.slice(2);

  const numero = digitos.slice(0, 11);

  if (numero.length <= 2) return numero;
  if (numero.length <= 6) return `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
  if (numero.length <= 10) {
    return `(${numero.slice(0, 2)}) ${numero.slice(2, 6)}-${numero.slice(6)}`;
  }
  return `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7)}`;
}

/* -------------------------------------------------------------- SUCESSO */

function Sucesso({
  titulo,
  paragrafos,
  tom,
  onFechar,
}: {
  titulo: string;
  paragrafos: readonly string[];
  tom: Tom;
  onFechar?: () => void;
}) {
  return (
    <div
      /* `alert` porque a confirmação substitui o formulário: sem isso, quem
         usa leitor de tela envia e não recebe notícia nenhuma de volta */
      role="alert"
      className={`flex flex-col items-center py-6 text-center ${
        tom === "escuro" ? "text-white" : "text-azul-escuro"
      }`}
    >
      <span
        aria-hidden
        className={`flex h-16 w-16 items-center justify-center rounded-full border ${
          tom === "escuro"
            ? "border-dourado-claro/40 bg-dourado-claro/10 text-dourado-claro"
            : "border-dourado/40 bg-dourado/10 text-dourado"
        }`}
      >
        <Check size={28} strokeWidth={TRACO} />
      </span>

      <p className="mt-7 text-[30px] leading-[1.15]">
        {titulo}
      </p>

      <div
        className={`mt-4 flex max-w-[36ch] flex-col gap-3 text-[16px] leading-[1.6] font-light ${
          tom === "escuro" ? "text-white" : "text-azul-escuro"
        }`}
      >
        {paragrafos.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
      </div>

      {onFechar && (
        <button
          type="button"
          onClick={onFechar}
          className={`mt-9 inline-flex min-h-[52px] w-full items-center justify-center rounded-xl px-8 py-[18px] text-[11px] leading-none font-bold tracking-[0.2em] uppercase transition-colors duration-300 ease-out ${
            tom === "escuro"
              ? "bg-white text-azul-escuro hover:bg-dourado-claro"
              : "bg-azul-escuro text-white hover:bg-azul-profundo"
          }`}
        >
          Fechar
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------- ENVIO EM CURSO */

/**
 * Um envio por vez na página, valendo para todas as cópias do formulário.
 *
 * O `pendente` do `useActionState` desativa o botão, mas só a partir da
 * renderização seguinte: um duplo clique ou um Enter repetido antes dela
 * enfileiram um segundo envio — outro cadastro no CRM e outro Lead, com
 * outro `event_id`, que o Meta não deduplica. A trava é marcada no próprio
 * `onSubmit`, sem esperar renderização, e fecha essa janela.
 *
 * Mora no módulo, e não num `useRef`, porque a janela remonta o formulário a
 * cada abertura (ver `form-modal.tsx`): quem fecha durante o "Enviando…" e
 * reabre encontraria um formulário novo, livre para mandar tudo de novo. É
 * lida por `useSyncExternalStore` para que esse formulário novo já nasça
 * mostrando o envio em curso.
 */
let envioEmCurso = false;
const ouvintesEnvio = new Set<() => void>();

function marcarEnvio(valor: boolean) {
  envioEmCurso = valor;
  ouvintesEnvio.forEach((avisar) => avisar());
}

function inscreverEnvio(avisar: () => void) {
  ouvintesEnvio.add(avisar);
  return () => {
    ouvintesEnvio.delete(avisar);
  };
}

const lerEnvio = () => envioEmCurso;
const lerEnvioNoServidor = () => false;

/* ------------------------------------------------------------ FORMULÁRIO */

/**
 * A confirmação depois do envio: um título e um parágrafo por item. Em
 * `jaEnviado`, o que fica no lugar do formulário para quem volta à LP depois
 * de já ter mandado o cadastro (ver `ja-enviou.ts`) — texto à parte porque o
 * da hora do envio fala em "em instantes", e quem volta pode estar voltando
 * dias depois.
 */
export type TextosSucesso = {
  titulo: string;
  paragrafos: readonly string[];
  jaEnviado: { titulo: string; paragrafos: readonly string[] };
};

export function Formulario({
  origem,
  tom = "claro",
  titulo,
  rotuloEnvio,
  sucesso,
  aviso,
  onFechar,
  className = "",
}: {
  origem: OrigemLead;
  tom?: Tom;
  /** título visível acima dos campos; some na tela de sucesso */
  titulo?: string;
  /** o botão "Fechar" da tela de sucesso; sem ele, o botão não aparece */
  onFechar?: () => void;
  /** o mesmo texto do CTA da página: os briefs pedem CTA consistente */
  rotuloEnvio: string;
  sucesso: TextosSucesso;
  /** linha jurídica abaixo do botão (a LP02 tem uma; a LP01, não) */
  aviso?: string;
  className?: string;
}) {
  /* A origem viaja por `bind`, não por campo oculto: campo oculto vai no HTML
     e pode ser reescrito antes do envio, e é ele que diz ao Comercial de qual
     página o lead veio. */
  const acao = useMemo(() => {
    const registrar = registrarLead.bind(null, origem);

    /* O Lead do Pixel sai aqui, quando a resposta do servidor chega, e não de
       um efeito do componente: quem fecha a janela durante o "Enviando…"
       desmonta o formulário, o efeito nunca rodava e o cadastro chegava ao
       Meta só pelo servidor. Esta função termina com ou sem formulário na
       tela. */
    return async (anterior: EstadoLead, formData: FormData) => {
      try {
        const estado = await registrar(anterior, formData);

        /* Só com o cadastro aceito — não no clique, que ainda pode voltar com
           campo a corrigir.

           O id é o mesmo campo oculto que subiu para o servidor, e as
           respostas de qualificação só existem na LP02 — na LP01 os campos
           nem estão no formulário. */
        if (estado.status === "sucesso") {
          marcarLeadEnviado(origem);
          const campo = (nome: string) => String(formData.get(nome) ?? "") || undefined;
          rastrearLead(origem, {
            idEvento: campo("event_id"),
            faixaCapital: campo("faixaCapital"),
            experiencia: campo("experiencia"),
          });
        }

        return estado;
      } finally {
        /* Solta a trava em qualquer desfecho: no sucesso a confirmação já
           toma o lugar do formulário, e no erro a pessoa precisa poder
           corrigir e reenviar. */
        marcarEnvio(false);
      }
    };
  }, [origem]);
  const [estado, enviar, pendente] = useActionState(acao, ESTADO_INICIAL);

  /* O botão fica em "Enviando…" desde o clique até a resposta — inclusive
     num formulário que acabou de montar enquanto outro envio está saindo. */
  const enviando = useSyncExternalStore(inscreverEnvio, lerEnvio, lerEnvioNoServidor);
  const ocupado = pendente || enviando;

  const jaEnviou = useLeadJaEnviado(origem);

  /* A recusa do WhatsApp vive no cliente porque é a única que dá para dar na
     hora: as outras dependem de regra que só o servidor conhece. */
  const [erroWhatsapp, setErroWhatsapp] = useState<string>();

  /* A campanha que trouxe a visita, para viajar junto com o lead.
     `useSyncExternalStore` porque a URL e o `sessionStorage` são exatamente
     o que ele existe para ler: um valor que mora fora do React. Ler direto na
     renderização quebraria no dia em que este formulário voltar a ser
     renderizado no servidor, e um `useEffect` com `setState` compraria uma
     renderização em cascata para um dado que nunca muda.

     Os três argumentos moram em `utms.ts` e são estáveis de propósito — ver
     a nota do memo por lá. */
  const utms = useSyncExternalStore(SEM_INSCRICAO, utmsDaVisita, utmsNoServidor);

  const qualifica = origem === "lp2-interesse";

  const campoIdEvento = useRef<HTMLInputElement>(null);
  const campoPagina = useRef<HTMLInputElement>(null);

  if (estado.status === "sucesso") {
    return (
      <div className={className}>
        <Sucesso
          titulo={sucesso.titulo}
          paragrafos={sucesso.paragrafos}
          tom={tom}
          onFechar={onFechar}
        />
      </div>
    );
  }

  /* Quem volta depois de já ter mandado. Nunca durante um envio: a marca é
     gravada antes de a resposta virar estado, e o formulário em "Enviando…"
     não pode piscar para o "já enviou" antes da confirmação de agora. */
  if (jaEnviou && !ocupado) {
    return (
      <div className={className}>
        <Sucesso
          titulo={sucesso.jaEnviado.titulo}
          paragrafos={sucesso.jaEnviado.paragrafos}
          tom={tom}
          onFechar={onFechar}
        />
      </div>
    );
  }

  const botao =
    tom === "escuro"
      ? "bg-white text-azul-escuro hover:bg-dourado-claro"
      : "bg-azul-escuro text-white hover:bg-azul-profundo";

  return (
    <form
      action={enviar}
      noValidate
      /* O envio não sai do navegador com o número fora do padrão brasileiro.
         A Server Action valida de novo do outro lado — este gate existe para
         responder na hora, não para substituir aquela. */
      onSubmit={(evento) => {
        /* Já tem um envio saindo: este clique (ou Enter) não vira outro. */
        if (envioEmCurso) {
          evento.preventDefault();
          return;
        }

        const campo = evento.currentTarget.elements.namedItem(
          "whatsapp"
        ) as HTMLInputElement | null;

        if (campo && !normalizarWhatsApp(campo.value)) {
          /* `preventDefault` num `onSubmit` também cancela a action do React:
             é o que segura o envio sem duplicar a regra em outro lugar. */
          evento.preventDefault();
          setErroWhatsapp(ERRO_WHATSAPP);
          campo.focus();
          return;
        }

        /* Escrito direto no campo oculto: o React monta o FormData da action
           depois deste handler, então o valor já sobe neste envio — e é desse
           mesmo FormData que o Pixel lê o id, lá em `acao`. Um id novo por
           tentativa — um reenvio depois de erro é outro evento. */
        marcarEnvio(true);
        if (campoIdEvento.current) campoIdEvento.current.value = crypto.randomUUID();
        if (campoPagina.current) campoPagina.current.value = window.location.href;
      }}
      className={`flex flex-col ${className}`}
    >
      {/* Só visual: o nome acessível da janela já é o `<h2>` de
          `form-modal.tsx`, e repeti-lo aqui faria o leitor de tela ler duas
          vezes. */}
      {titulo && (
        <div aria-hidden className="mb-8">
          <span className="block h-px w-10 bg-dourado-claro/70" />
          <p
            className={`mt-5 text-[26px] leading-[1.2] ${
              tom === "escuro" ? "text-white" : "text-azul-escuro"
            }`}
          >
            {titulo}
          </p>
        </div>
      )}


      {/* As UTMs da visita, uma por campo oculto.
          Campo oculto e não `bind` como a origem: a origem o servidor sabe
          sozinho, porque é ele que monta a página; a campanha só existe do
          lado do navegador, na URL com que a pessoa chegou. Chegam forjáveis
          por natureza, e quem as limpa é `normalizarUtms`, na Server Action.

          Só sobe campo que tenha valor: um `utm_term=` vazio no corpo seria
          indistinguível de uma campanha sem termo. */}
      {/* O id do evento do Meta, preenchido no `onSubmit`. */}
      <input ref={campoIdEvento} type="hidden" name="event_id" defaultValue="" />
      {/* A URL da LP para a API de Conversões, também do `onSubmit` — ver
          `contextoMeta`, em `actions.ts`. */}
      <input ref={campoPagina} type="hidden" name="event_source_url" defaultValue="" />

      {CAMPOS_UTM.map((campo) =>
        utms[campo] ? (
          <input key={campo} type="hidden" name={campo} value={utms[campo]} readOnly />
        ) : null
      )}

      <div className="flex flex-col gap-4">
        <Campo
          nome="nome"
          rotulo="Nome completo"
          autoComplete="name"
          tom={tom}
          estado={estado}
        />

        <Campo
          nome="whatsapp"
          rotulo="WhatsApp com DDD"
          tipo="tel"
          inputMode="tel"
          autoComplete="tel-national"
          tom={tom}
          estado={estado}
          erroLocal={erroWhatsapp}
          onInput={(evento) => {
            evento.currentTarget.value = mascararWhatsApp(evento.currentTarget.value);
            /* Some assim que a pessoa mexe no campo: manter o aviso enquanto
               ela corrige é acusar um erro que já pode não existir. */
            if (erroWhatsapp) setErroWhatsapp(undefined);
          }}
          onBlur={(evento) => {
            const valor = evento.currentTarget.value.trim();
            /* Campo vazio não é erro de formato — quem só passou por ele
               ainda não digitou nada que possa estar errado. */
            setErroWhatsapp(
              valor && !normalizarWhatsApp(valor) ? ERRO_WHATSAPP : undefined
            );
          }}
        />

        <Campo
          nome="email"
          rotulo="E-mail"
          tipo="email"
          inputMode="email"
          autoComplete="email"
          tom={tom}
          estado={estado}
        />

        {qualifica && (
          <>
            <Selecao
              nome="faixaCapital"
              rotulo="Faixa de capital disponível"
              opcoes={FAIXAS_CAPITAL}
              tom={tom}
              estado={estado}
            />

            <Escolha
              nome="experiencia"
              rotulo="Já participou de SCP?"
              opcoes={PARTICIPOU_SCP}
              tom={tom}
              estado={estado}
            />
          </>
        )}
      </div>

      {/* Erro geral (falha de rede/servidor). `aria-live` para chegar a quem
          não está olhando para esta região da tela. */}
      <p aria-live="polite" className="sr-only">
        {estado.status === "erro" ? "O formulário contém campos a corrigir." : ""}
      </p>

      {estado.mensagem && (
        <p
          className={`mt-6 text-[13px] font-light ${
            tom === "escuro" ? "text-dourado-claro" : "text-dourado-escuro"
          }`}
        >
          {estado.mensagem}
        </p>
      )}

      <button
        type="submit"
        disabled={ocupado}
        /* Mesma forma e mesmo peso do CTA que abriu a janela — ver
           `BotaoFormulario`, inclusive sobre escrever a tipografia à mão. */
        className={`group mt-8 inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl px-8 py-[18px] text-center text-[11px] leading-none font-bold tracking-[0.2em] uppercase transition-colors duration-300 ease-out disabled:cursor-wait disabled:opacity-80 ${botao}`}
      >
        {ocupado ? (
          <>
            <LoaderCircle size={16} strokeWidth={TRACO} aria-hidden className="animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            {rotuloEnvio}
            <ArrowRight
              size={16}
              strokeWidth={TRACO}
              aria-hidden
              className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-[3px]"
            />
          </>
        )}
      </button>

      {aviso && (
        <p
          className={`mt-5 text-center text-[12px] leading-[1.65] font-light ${
            tom === "escuro" ? "text-white" : "text-azul-escuro"
          }`}
        >
          {aviso}
        </p>
      )}
    </form>
  );
}
