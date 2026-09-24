"use server";

import { cookies, headers } from "next/headers";
import { after } from "next/server";

import { enviarAoChroma } from "./chroma";
import type { EstadoLead, OrigemLead } from "./lead";
import { enviarAoMeta, type ContextoEvento } from "./meta-capi";
import { idDeEventoValido } from "./meta-eventos";
import { normalizarUtms } from "./utms";
import { validarLead } from "./validar";

/**
 * Recebimento dos leads das duas LPs do Funil 1.
 *
 * As duas vão para o CRM Chroma, cada uma pela sua webhook — a LP01 pela
 * "LPs amaan" e a LP02 pela "LPs amaan - sem doc", que fazem o contato nascer
 * em etapas diferentes do funil. Quem escolhe é `chroma.ts`, pela origem do
 * lead; aqui só se decide *quando* chamar.
 *
 * `LEAD_WEBHOOK_URL` continua como destino genérico e opcional (automação,
 * planilha), e recebe o lead no formato interno (`Lead`, em `validar.ts`).
 * Vazia, esse segundo envio simplesmente não acontece — o CRM já é o destino
 * de verdade.
 *
 * Aqui fica só o transporte: as regras de validação estão em `validar.ts`, e
 * o formato do estado em `lead.ts` — um arquivo `"use server"` só pode
 * exportar funções async, então tipos e constantes não cabem neste arquivo.
 */

function texto(formData: FormData, campo: string) {
  const valor = formData.get(campo);
  return typeof valor === "string" ? valor.trim() : "";
}

/**
 * O que a API de Conversões do Meta usa para ligar o cadastro ao clique no
 * anúncio. Lido aqui, durante a requisição, e não dentro do `after()`.
 */
async function contextoMeta(formData: FormData): Promise<ContextoEvento> {
  const cabecalhos = await headers();
  const biscoitos = await cookies();

  /* A URL da LP, com o `fbclid` de quem chegou pelo anúncio. Vem do campo
     que o navegador preenche no envio; o Referer fica de reserva, porque
     política de referrer, proxy ou extensão de privacidade podem reduzi-lo à
     origem — e aí o Meta registra `amaan.com.br/` sem o `/lp1` ou `/lp2`.
     Só vale URL deste mesmo host: o campo é forjável. */
  const host = cabecalhos.get("host");
  const url = [texto(formData, "event_source_url"), cabecalhos.get("referer")].find(
    (valor) => valor && URL.canParse(valor) && new URL(valor).host === host
  ) || undefined;
  let fbc = biscoitos.get("_fbc")?.value;

  if (!fbc && url) {
    const fbclid = URL.canParse(url) ? new URL(url).searchParams.get("fbclid") : null;
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }

  return {
    idEvento: idDeEventoValido(texto(formData, "event_id")),
    url,
    ip: cabecalhos.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    userAgent: cabecalhos.get("user-agent") ?? undefined,
    fbp: biscoitos.get("_fbp")?.value,
    fbc,
  };
}

/**
 * Ação das duas LPs. A origem chega por `bind` (ver `formulario.tsx`), não
 * por campo oculto: assim o navegador não pode reescrevê-la, e é ela que diz
 * ao Comercial de qual página o lead veio.
 */
export async function registrarLead(
  origem: OrigemLead,
  _anterior: EstadoLead,
  formData: FormData
): Promise<EstadoLead> {
  /* Armadilha de bot: um campo que ninguém vê e, portanto, ninguém preenche.
     Preenchido, respondemos sucesso e descartamos — um erro aqui só ensinaria
     o robô a tentar de novo. */
  if (texto(formData, "empresa")) {
    return { status: "sucesso" };
  }

  const entrada = {
    nome: texto(formData, "nome"),
    whatsapp: texto(formData, "whatsapp"),
    email: texto(formData, "email"),
    experiencia: texto(formData, "experiencia"),
    faixaCapital: texto(formData, "faixaCapital"),
  };

  /* As UTMs chegam por campo oculto, preenchido no navegador a partir da URL
     do anúncio (ver `utms.ts`). Diferente da origem, que viaja por `bind`
     justamente para o navegador não poder reescrevê-la: a campanha só existe
     do lado de lá, então não há de onde tirá-la aqui. É metadado forjável por
     natureza, e por isso passa pela limpeza de `normalizarUtms` antes de
     entrar no lead e nos logs — mas nunca reprova o cadastro. */
  const utms = normalizarUtms((campo) => texto(formData, campo));

  const resultado = validarLead(origem, entrada, utms);

  if (!resultado.ok) {
    /* `valores` devolve o que foi digitado: sem isso, um erro de validação
       esvaziaria o formulário inteiro em navegadores sem JavaScript. */
    return { status: "erro", erros: resultado.erros, valores: entrada };
  }

  const { lead } = resultado;

  /* Em `after()` porque o envio acontece depois da resposta: a tela de
     sucesso não fica esperando o CRM, e as retentativas de `enviarAoChroma`
     cabem sem segurar quem preencheu o formulário. A função nunca lança —
     falha dela vira log, não erro na tela.

     A LP01 não coleta os dois selects, então o lead dela chega ao CRM sem
     `valor` nem `scp`; os campos ficam vazios na ficha, que é o que o CRM
     espera de campo opcional. */
  after(() => enviarAoChroma(lead));

  /* O mesmo cadastro para o Meta, com o `event_id` que o Pixel também mandou
     do navegador — ver `meta-capi.ts`. */
  const contexto = await contextoMeta(formData);
  after(() => enviarAoMeta(lead, contexto));

  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (!webhook) {
    /* Sem destino genérico configurado não há nada a fazer: o lead já saiu
       para o CRM acima, e repeti-lo no log só duplicaria dado pessoal sem
       nada em troca. */
    return { status: "sucesso" };
  }

  try {
    const resposta = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
      /* o lead não pode ficar pendurado numa integração lenta: passou de 10s,
         o cadastro é dado como recebido e o log guarda o payload */
      signal: AbortSignal.timeout(10_000),
    });

    if (!resposta.ok) {
      throw new Error(`webhook respondeu ${resposta.status}`);
    }
  } catch (erro) {
    /* Falha de integração não vira erro na cara de quem se cadastrou: o dado
       está no log e pode ser reenviado. Barrar a tela de sucesso aqui só
       perderia o lead que já converteu. */
    console.error("[lead] falha ao enviar ao webhook:", erro, lead);
  }

  return { status: "sucesso" };
}
