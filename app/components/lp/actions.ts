"use server";

import { after } from "next/server";

import { enviarAoChroma } from "./chroma";
import type { EstadoLead, OrigemLead } from "./lead";
import { validarLead } from "./validar";

/**
 * Recebimento dos leads das duas LPs do Funil 1.
 *
 * A LP02 tem destino: o CRM Chroma, pela webhook "LPs amaan" — ver
 * `chroma.ts`. A LP01 ainda não, e continua no arranjo anterior: tenta
 * POSTar em `LEAD_WEBHOOK_URL` e, enquanto essa variável não existir,
 * registra o lead no log do servidor. Ligar um destino para ela depois é
 * preencher a env, sem tocar em código.
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

  /* LP02 → CRM Chroma. Em `after()` porque o envio acontece depois da
     resposta: a tela de sucesso não fica esperando o CRM, e as retentativas
     de `enviarAoChroma` cabem sem segurar quem preencheu o formulário. A
     função nunca lança — falha dela vira log, não erro na tela.

     A LP01 fica de fora por ora: o CRM aceitaria o lead dela (só `valor` e
     `scp` viriam vazios), mas levar aquela página junto é decisão do
     Comercial. Quando for, é trocar esta condição por uma chamada direta. */
  const paraOCrm = origem === "lp2-interesse";

  if (paraOCrm) {
    after(() => enviarAoChroma(lead));
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (!webhook) {
    /* Só a LP01 chega aqui sem destino nenhum: fica registrada no log do
       servidor para não perder cadastro antes da integração dela. O lead da
       LP02 já saiu para o CRM acima — repeti-lo aqui seria duplicar dado
       pessoal no log sem nada em troca. */
    if (!paraOCrm) {
      console.info("[lead] webhook não configurado — lead recebido:", lead);
    }
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
