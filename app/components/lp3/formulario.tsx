"use client";

import { useActionState, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { registrarLead } from "../lp/actions";
import { ESTADO_INICIAL, type CampoLead, type EstadoLead } from "../lp/lead";
import {
  FAIXAS_CAPITAL_LP3,
  MODALIDADES_LP3,
  PRAZOS_DECISAO_LP3,
  ROTA_LP3,
} from "../lp/lp-config";
import { rastrearLead } from "../lp/meta-pixel";
import { CAMPOS_UTM, SEM_INSCRICAO, utmsDaVisita, utmsNoServidor } from "../lp/utms";
import { normalizarWhatsApp } from "../lp/validar";

/**
 * Formulário da LP03 (investimento em SCP).
 *
 * Por baixo é o mesmo caminho das outras LPs: a Server Action
 * `registrarLead`, que valida de novo no servidor, manda ao CRM e à API de
 * Conversões; e o Lead do Pixel sai aqui, com o mesmo `event_id`, só com o
 * cadastro aceito. A diferença de desenho em relação a `lp/formulario.tsx` é
 * de propósito — rótulo em cima, caixa reta, a validação nativa do navegador
 * — e é o que impede reaproveitar aquele componente.
 *
 * Aceito o cadastro, a pessoa vai para `/lp3/obrigado`.
 */

const ORIGEM = "lp3-scp";
const ROTULO_ENVIO = "Quero investir em SCP";
const ERRO_ENVIO = "Não conseguimos enviar agora. Tente de novo em instantes.";

/* ---------------------------------------------------------------- TELEFONE */

/** (XX) XXXXX-XXXX, parando onde a pessoa parou de digitar. */
function mascararTelefone(digitos: string) {
  if (!digitos) return "";
  if (digitos.length <= 2) return `(${digitos}`;
  if (digitos.length <= 7) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

/** Posição logo depois do n-ésimo dígito — sem isso o cursor pula para o fim. */
function posicaoAposDigito(mascarado: string, n: number) {
  if (n <= 0) return 0;
  let vistos = 0;
  for (let i = 0; i < mascarado.length; i++) {
    if (/\d/.test(mascarado[i]) && ++vistos === n) return i + 1;
  }
  return mascarado.length;
}

/**
 * Uma recusa por motivo, cada uma dizendo o que corrigir. A regra final
 * é a de `normalizarWhatsApp` — a mesma que o servidor aplica —, então nada
 * que passe aqui volta recusado de lá.
 */
function erroTelefone(valor: string) {
  const digitos = valor.replace(/\D/g, "");
  if (!digitos) return "Informe seu WhatsApp.";
  if (digitos.length !== 11) {
    return "O número precisa ter 11 dígitos: DDD + 9 dígitos. Ex.: (47) 99999-9999";
  }
  if (digitos[2] !== "9") {
    return "Informe um celular com WhatsApp: depois do DDD, o número começa com 9.";
  }
  if (/^(\d)\1+$/.test(digitos.slice(2))) {
    return "Número inválido. Confira o seu celular com WhatsApp.";
  }
  if (!normalizarWhatsApp(digitos)) return "DDD inválido. Confira os dois primeiros dígitos.";
  return "";
}

/* ------------------------------------------------------------------ CAMPOS */

function ErroCampo({ id, mensagem }: { id: string; mensagem?: string }) {
  if (!mensagem) return null;
  return (
    <p className="form-error" id={id} role="alert">
      {mensagem}
    </p>
  );
}

function Selecao({
  nome,
  id,
  rotulo,
  vazio,
  opcoes,
  estado,
}: {
  nome: CampoLead;
  id: string;
  rotulo: string;
  vazio: string;
  opcoes: readonly { value: string; label: string }[];
  estado: EstadoLead;
}) {
  const erro = estado.erros?.[nome];

  return (
    <div className="form-row">
      <label className="form-label" htmlFor={id}>
        {rotulo}
      </label>
      <select
        className={`form-select${erro ? " form-input--err" : ""}`}
        id={id}
        name={nome}
        required
        defaultValue={estado.valores?.[nome] ?? ""}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? `${id}-erro` : undefined}
      >
        <option value="" disabled>
          {vazio}
        </option>
        {opcoes.map((opcao) => (
          <option key={opcao.value} value={opcao.value}>
            {opcao.label}
          </option>
        ))}
      </select>
      <ErroCampo id={`${id}-erro`} mensagem={erro} />
    </div>
  );
}

/* -------------------------------------------------------------- FORMULÁRIO */

export function FormularioLp3() {
  const router = useRouter();

  const acao = useMemo(() => {
    const registrar = registrarLead.bind(null, ORIGEM);

    return async (anterior: EstadoLead, formData: FormData): Promise<EstadoLead> => {
      let estado: EstadoLead;
      try {
        estado = await registrar(anterior, formData);
      } catch {
        /* Rede caiu ou o servidor falhou: a mensagem de erro geral, e o que
           foi digitado continua nos campos. */
        return {
          status: "erro",
          mensagem: ERRO_ENVIO,
          valores: Object.fromEntries(
            [...formData.entries()].filter(([, v]) => typeof v === "string")
          ) as EstadoLead["valores"],
        };
      }

      /* A armadilha de bot também responde sucesso — e também vai para a tela
         de obrigado, para o robô não descobrir que foi barrado —, mas não
         dispara o Lead. */
      if (estado.status === "sucesso") {
        if (!formData.get("empresa")) {
          const campo = (nome: string) => String(formData.get(nome) ?? "") || undefined;
          rastrearLead(ORIGEM, {
            idEvento: campo("event_id"),
            faixaCapital: campo("faixaCapital"),
          });
        }
        router.push(`${ROTA_LP3}/obrigado`);
      }

      return estado;
    };
  }, [router]);

  const [estado, enviar, pendente] = useActionState(acao, ESTADO_INICIAL);

  const utms = useSyncExternalStore(SEM_INSCRICAO, utmsDaVisita, utmsNoServidor);

  const campoTelefone = useRef<HTMLInputElement>(null);
  const campoIdEvento = useRef<HTMLInputElement>(null);
  const campoPagina = useRef<HTMLInputElement>(null);

  /* O erro do telefone aparece no blur e some enquanto se digita; o do
     servidor só vale até a pessoa mexer no campo. */
  const [erroTel, setErroTel] = useState("");
  const erroTelVisivel = erroTel || estado.erros?.whatsapp;

  /* Sincroniza com a validação nativa: assim o `reportValidity()` do envio
     também barra o número e leva o foco até ele. */
  function validarTelefone(mostrar: boolean) {
    const campo = campoTelefone.current;
    if (!campo) return true;
    const erro = erroTelefone(campo.value);
    campo.setCustomValidity(erro);
    if (mostrar) setErroTel(erro);
    return erro === "";
  }

  const erroServidor = (nome: CampoLead) => estado.erros?.[nome];

  return (
    <form
      className="cta-form"
      action={enviar}
      noValidate
      onSubmit={(evento) => {
        /* O erro do telefone entra na validação nativa antes da checagem, e
           o `reportValidity()` leva o foco ao primeiro campo inválido na
           ordem do formulário — o telefone, só se nada antes dele falhar.
           `preventDefault` num `onSubmit` também cancela a action do React. */
        validarTelefone(true);
        if (!evento.currentTarget.reportValidity()) {
          evento.preventDefault();
          return;
        }

        /* Um id novo por tentativa, escrito antes de o React montar o
           FormData: é o mesmo que sobe para o servidor e que o Pixel usa. */
        if (campoIdEvento.current) campoIdEvento.current.value = crypto.randomUUID();
        if (campoPagina.current) campoPagina.current.value = window.location.href;
      }}
    >
      <input ref={campoIdEvento} type="hidden" name="event_id" defaultValue="" />
      <input ref={campoPagina} type="hidden" name="event_source_url" defaultValue="" />
      {CAMPOS_UTM.map((campo) =>
        utms[campo] ? (
          <input key={campo} type="hidden" name={campo} value={utms[campo]} readOnly />
        ) : null
      )}

      <div className="form-row">
        <label className="form-label" htmlFor="nome">
          Nome completo
        </label>
        <input
          className={`form-input${erroServidor("nome") ? " form-input--err" : ""}`}
          type="text"
          id="nome"
          name="nome"
          required
          placeholder="Seu nome completo"
          autoComplete="name"
          defaultValue={estado.valores?.nome ?? ""}
          aria-invalid={erroServidor("nome") ? true : undefined}
          aria-describedby={erroServidor("nome") ? "nome-erro" : undefined}
        />
        <ErroCampo id="nome-erro" mensagem={erroServidor("nome")} />
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="tel">
          WhatsApp com DDD
        </label>
        <input
          ref={campoTelefone}
          className={`form-input${erroTelVisivel ? " form-input--err" : ""}`}
          type="tel"
          id="tel"
          name="whatsapp"
          required
          maxLength={15}
          inputMode="numeric"
          placeholder="(47) 99999-9999"
          autoComplete="tel-national"
          defaultValue={estado.valores?.whatsapp ?? ""}
          aria-invalid={erroTelVisivel ? true : undefined}
          aria-describedby="tel-erro"
          onInput={(evento) => {
            const campo = evento.currentTarget;
            const digitosAntes = campo.value
              .slice(0, campo.selectionStart ?? campo.value.length)
              .replace(/\D/g, "").length;

            let digitos = campo.value.replace(/\D/g, "");
            /* Colar "+55 47 99999-8888" é comum: sem tirar o 55, o corte em 11
               dígitos comeria o fim do número. */
            if (digitos.length > 11 && digitos.startsWith("55")) digitos = digitos.slice(2);

            const mascarado = mascararTelefone(digitos.slice(0, 11));
            campo.value = mascarado;
            try {
              const posicao = posicaoAposDigito(mascarado, digitosAntes);
              campo.setSelectionRange(posicao, posicao);
            } catch {
              /* navegador sem suporte a seleção em input tel */
            }

            /* Enquanto digita, o erro antigo sai de cena; a checagem volta no blur. */
            setErroTel("");
            validarTelefone(false);
          }}
          onChange={() => validarTelefone(true)}
          onBlur={() => validarTelefone(true)}
        />
        <p className="form-error" id="tel-erro" role="alert" aria-live="polite" hidden={!erroTelVisivel}>
          {erroTelVisivel}
        </p>
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="email">
          E-mail
        </label>
        <input
          className={`form-input${erroServidor("email") ? " form-input--err" : ""}`}
          type="email"
          id="email"
          name="email"
          required
          placeholder="seu@email.com"
          autoComplete="email"
          defaultValue={estado.valores?.email ?? ""}
          aria-invalid={erroServidor("email") ? true : undefined}
          aria-describedby={erroServidor("email") ? "email-erro" : undefined}
        />
        <ErroCampo id="email-erro" mensagem={erroServidor("email")} />
      </div>

      <Selecao
        nome="faixaCapital"
        id="capital-form"
        rotulo="Quanto pretende investir?"
        vazio="Selecione uma faixa"
        opcoes={FAIXAS_CAPITAL_LP3}
        estado={estado}
      />

      <Selecao
        nome="modalidade"
        id="modalidade"
        rotulo="Onde você investe hoje?"
        vazio="Selecione"
        opcoes={MODALIDADES_LP3}
        estado={estado}
      />

      <Selecao
        nome="prazoDecisao"
        id="prazo-decisao"
        rotulo="Em quanto tempo pretende investir?"
        vazio="Selecione"
        opcoes={PRAZOS_DECISAO_LP3}
        estado={estado}
      />

      <div className="form-row">
        <label className="form-label" htmlFor="profissao">
          Profissão
        </label>
        <input
          className={`form-input${erroServidor("profissao") ? " form-input--err" : ""}`}
          type="text"
          id="profissao"
          name="profissao"
          required
          placeholder="Ex.: empresário, médica, engenheiro"
          autoComplete="organization-title"
          defaultValue={estado.valores?.profissao ?? ""}
          aria-invalid={erroServidor("profissao") ? true : undefined}
          aria-describedby={erroServidor("profissao") ? "profissao-erro" : undefined}
        />
        <ErroCampo id="profissao-erro" mensagem={erroServidor("profissao")} />
      </div>

      {/* Armadilha de bot: fora da tela, fora do Tab e do leitor de tela.
          O nome `empresa` é o que `registrarLead` confere. */}
      <div className="form-hp" aria-hidden>
        <label htmlFor="site-empresa">Empresa</label>
        <input type="text" id="site-empresa" name="empresa" tabIndex={-1} autoComplete="off" />
      </div>

      {(estado.mensagem || estado.status === "sucesso") && (
        <div
          className={`form-feedback ${
            estado.status === "sucesso" ? "form-feedback--ok" : "form-feedback--err"
          }`}
          role="alert"
          aria-live="polite"
        >
          {estado.status === "sucesso" ? "Cadastro recebido! Um instante…" : estado.mensagem}
        </div>
      )}

      <button type="submit" className="btn form-submit" disabled={pendente || estado.status === "sucesso"}>
        {pendente ? "Enviando…" : ROTULO_ENVIO}
      </button>
    </form>
  );
}
