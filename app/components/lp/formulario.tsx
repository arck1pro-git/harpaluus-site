"use client";

import { useActionState, useId, useMemo, useState } from "react";
import { Check } from "lucide-react";

import { TRACO } from "../landing/icones";
import { registrarLead } from "./actions";
import {
  ESTADO_INICIAL,
  type CampoLead,
  type EstadoLead,
  type OrigemLead,
} from "./lead";
import { EXPERIENCIA_SCP, FAIXAS_CAPITAL } from "./lp-config";
import { ERRO_WHATSAPP, normalizarWhatsApp } from "./validar";

/**
 * Formulário das duas LPs do Funil 1.
 *
 * A LP01 pede só Nome, WhatsApp e E-mail — o brief proíbe qualificação
 * naquela página, porque a troca ali é por um material gratuito e cada campo
 * a mais custa cadastro. A LP02 acrescenta experiência em SCP e faixa de
 * capital, que é o que o Comercial precisa para priorizar o contato.
 *
 * Funciona sem JavaScript: é um `<form>` de verdade apontando para uma Server
 * Action, e o que a pessoa digitou volta pelos `defaultValue` quando a
 * validação recusa. Com JS, ganha estado de envio e mensagens por campo.
 */

/* ----------------------------------------------------------------- CAMPOS */

type Tom = "claro" | "escuro";

/**
 * Filete embaixo em vez de caixa fechada: mantém o campo na mesma família
 * gráfica dos filetes que abrem as seções, e é menos peso visual do que seis
 * retângulos empilhados.
 */
function estilosCampo(tom: Tom, invalido: boolean) {
  const base =
    "peer w-full appearance-none border-0 border-b bg-transparent px-0 pt-6 pb-2 text-[16px] font-light outline-none transition-colors duration-300";

  const cor =
    tom === "escuro"
      ? "text-white placeholder:text-transparent"
      : "text-azul-escuro placeholder:text-transparent";

  const filete = invalido
    ? "border-dourado-escuro"
    : tom === "escuro"
      ? "border-white/25 hover:border-white/45 focus:border-dourado-claro"
      : "border-linha hover:border-cinza focus:border-dourado";

  return `${base} ${cor} ${filete}`;
}

/**
 * O rótulo sobe para cima do campo quando ele tem conteúdo ou foco.
 *
 * Depende do `placeholder=" "` no input: é o truque que dá ao CSS o seletor
 * `:placeholder-shown` para saber se o campo está vazio, sem estado em JS.
 * O rótulo continua sendo um `<label>` de verdade — nunca placeholder no
 * lugar de rótulo, que some justamente quando a pessoa vai conferir.
 */
function estilosRotulo(tom: Tom) {
  const cor = tom === "escuro" ? "text-pedra-claro" : "text-pedra";
  const focoCor = tom === "escuro" ? "peer-focus:text-dourado-claro" : "peer-focus:text-dourado-escuro";

  return `tipo-label pointer-events-none absolute top-0 left-0 origin-left transition-all duration-300 ${cor} ${focoCor} peer-placeholder-shown:top-6 peer-placeholder-shown:text-[15px] peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:text-[11px] peer-focus:tracking-[0.2em] peer-focus:uppercase`;
}

function Erro({ id, mensagem }: { id: string; mensagem?: string }) {
  if (!mensagem) return null;

  return (
    <p id={id} className="mt-2 text-[13px] font-light text-dourado-escuro">
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
    <div className="relative pt-6">
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
      <Erro id={idErro} mensagem={erro} />
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
     CSS — a primeira opção já é um valor —, então o rótulo mora acima o tempo
     todo. A seta é desenhada aqui porque `appearance-none` remove a nativa. */
  return (
    <div className="relative pt-6">
      <label
        htmlFor={id}
        className={`tipo-label absolute top-0 left-0 ${tom === "escuro" ? "text-pedra-claro" : "text-pedra"}`}
      >
        {rotulo}
      </label>

      <div className="relative">
        <select
          id={id}
          name={nome}
          required
          defaultValue={estado.valores?.[nome] ?? ""}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? idErro : undefined}
          className={`${estilosCampo(tom, Boolean(erro))} cursor-pointer pr-8`}
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

        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={TRACO}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`pointer-events-none absolute right-0 bottom-[14px] h-4 w-4 ${
            tom === "escuro" ? "text-pedra-claro" : "text-pedra"
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      <Erro id={idErro} mensagem={erro} />
    </div>
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
  texto,
  tom,
}: {
  titulo: string;
  texto: string;
  tom: Tom;
}) {
  return (
    <div
      /* `alert` porque a confirmação substitui o formulário: sem isso, quem
         usa leitor de tela envia e não recebe notícia nenhuma de volta */
      role="alert"
      className={`flex flex-col items-start ${tom === "escuro" ? "text-white" : "text-azul-escuro"}`}
    >
      <span
        aria-hidden
        className="flex h-11 w-11 items-center justify-center rounded-full border border-dourado/50 text-dourado"
      >
        <Check size={20} strokeWidth={TRACO} />
      </span>

      <p className="tipo-lead mt-6 font-[family-name:var(--font-playfair)]">{titulo}</p>

      <p
        className={`tipo-corpo mt-4 ${tom === "escuro" ? "text-pedra-claro" : "text-pedra"}`}
      >
        {texto}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------ FORMULÁRIO */

export type TextosSucesso = { titulo: string; texto: string };

export function Formulario({
  origem,
  tom = "claro",
  rotuloEnvio,
  sucesso,
  aviso,
  className = "",
}: {
  origem: OrigemLead;
  tom?: Tom;
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
  const acao = useMemo(() => registrarLead.bind(null, origem), [origem]);
  const [estado, enviar, pendente] = useActionState(acao, ESTADO_INICIAL);

  /* A LP01 renderiza este formulário duas vezes (hero e fim da página), então
     nenhum `id` daqui pode ser derivado da origem: seriam dois elementos com
     o mesmo id no documento, e o `for` do rótulo passaria a apontar sempre
     para o primeiro. `useId` dá um valor único por instância. */
  const idArmadilha = useId();

  /* A recusa do WhatsApp vive no cliente porque é a única que dá para dar na
     hora: as outras dependem de regra que só o servidor conhece. */
  const [erroWhatsapp, setErroWhatsapp] = useState<string>();

  const qualifica = origem === "lp2-interesse";

  if (estado.status === "sucesso") {
    return (
      <div className={className}>
        <Sucesso titulo={sucesso.titulo} texto={sucesso.texto} tom={tom} />
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
        const campo = evento.currentTarget.elements.namedItem(
          "whatsapp"
        ) as HTMLInputElement | null;

        if (campo && !normalizarWhatsApp(campo.value)) {
          /* `preventDefault` num `onSubmit` também cancela a action do React:
             é o que segura o envio sem duplicar a regra em outro lugar. */
          evento.preventDefault();
          setErroWhatsapp(ERRO_WHATSAPP);
          campo.focus();
        }
      }}
      className={`flex flex-col ${className}`}
    >
      {/* Armadilha de bot. `tabIndex={-1}` e `aria-hidden` mantêm o campo fora
          do caminho de quem navega por teclado ou leitor de tela; ele é
          invisível por posição, não por `display:none` — que boa parte dos
          robôs já sabe ignorar. */}
      <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={idArmadilha}>Empresa</label>
        <input
          id={idArmadilha}
          name="empresa"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-7">
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
              nome="experiencia"
              rotulo="Já conhece ou participou de uma SCP?"
              opcoes={EXPERIENCIA_SCP}
              tom={tom}
              estado={estado}
            />

            <Selecao
              nome="faixaCapital"
              rotulo="Faixa de capital que considera"
              opcoes={FAIXAS_CAPITAL}
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
        <p className="mt-6 text-[13px] font-light text-dourado-escuro">{estado.mensagem}</p>
      )}

      <button
        type="submit"
        disabled={pendente}
        /* Mesma forma e mesmo peso do CTA que abriu a janela — ver
           `BotaoFormulario`, inclusive sobre escrever a tipografia à mão. */
        className={`mt-10 inline-flex min-h-[52px] items-center justify-center rounded-lg px-8 py-[18px] text-[11px] leading-none font-bold tracking-[0.2em] uppercase transition-colors duration-300 ease-out disabled:cursor-wait disabled:opacity-70 ${botao}`}
      >
        {pendente ? "Enviando…" : rotuloEnvio}
      </button>

      {aviso && (
        <p
          className={`mt-5 text-[13px] leading-[1.65] font-light ${
            tom === "escuro" ? "text-pedra-claro" : "text-pedra"
          }`}
        >
          {aviso}
        </p>
      )}
    </form>
  );
}
