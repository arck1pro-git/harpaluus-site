"use server";

import type { EstadoLead, OrigemLead } from "./lead";
import { validarLead } from "./validar";

/**
 * Recebimento dos leads das duas LPs do Funil 1.
 *
 * O destino final ainda não existe (CRM/automação entram depois). Em vez de
 * deixar um TODO, a action já está inteira: valida, normaliza e tenta POSTar
 * em `LEAD_WEBHOOK_URL`. Enquanto essa variável não estiver definida, o lead
 * é registrado no log do servidor e a página segue para a tela de sucesso —
 * então ligar o webhook depois é só preencher a env, sem tocar em código.
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

  const resultado = validarLead(origem, entrada);

  if (!resultado.ok) {
    /* `valores` devolve o que foi digitado: sem isso, um erro de validação
       esvaziaria o formulário inteiro em navegadores sem JavaScript. */
    return { status: "erro", erros: resultado.erros, valores: entrada };
  }

  const { lead } = resultado;
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (!webhook) {
    // Etapa atual: o destino ainda não foi definido. Fica registrado no log do
    // servidor para não perder nenhum cadastro de teste antes da integração.
    console.info("[lead] webhook não configurado — lead recebido:", lead);
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
