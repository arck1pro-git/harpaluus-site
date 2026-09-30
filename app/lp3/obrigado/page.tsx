import type { Metadata } from "next";
import Link from "next/link";

import { ROTA_LP3 } from "../../components/lp/lp-config";
import { RodapeLp3 } from "../../components/lp3/rodape";

/**
 * Confirmação depois do cadastro na LP03. Só se chega aqui pelo formulário
 * (ver `components/lp3/formulario.tsx`); o Lead já saiu antes da navegação,
 * então esta página não dispara evento nenhum além do PageView padrão.
 */

export const metadata: Metadata = {
  title: "Cadastro recebido",
  /* página de fim de funil: nada a indexar, e nada a seguir */
  robots: { index: false, follow: false },
};

const PASSOS = [
  {
    titulo: "Entendemos o seu perfil",
    texto: "Olhamos o capital disponível e o que você espera do investimento.",
  },
  {
    titulo: "Conversa com um especialista",
    texto: "Tiramos suas dúvidas sobre a SCP e sobre o momento de cada operação.",
  },
  {
    titulo: "Apresentação da operação",
    texto: "Você recebe os detalhes da SCP: contrato, garantias, prazos e projeções.",
  },
];

export default function Lp3Obrigado() {
  return (
    <>
      <main className="obrigado-main">
        <section className="obrigado-section">
          <div className="section-inner">
            {/* Selo de confirmação */}
            <div className="obrigado-badge" aria-hidden>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                focusable="false"
              >
                <path d="M4 12.5l5.2 5.2L20 7" />
              </svg>
            </div>

            <div className="section-eyebrow eyebrow-center" aria-hidden>
              <span className="eyebrow-line" />
              Cadastro recebido
              <span className="eyebrow-line" />
            </div>

            <h1 className="section-h2 obrigado-h1">
              Obrigado pelo <span className="accent">interesse</span>
            </h1>

            <p className="cta-sub obrigado-lead">
              Um especialista da AMAAN vai falar com você pelo WhatsApp informado em{" "}
              <strong>até 24 horas úteis</strong>.
            </p>

            {/* Próximos passos */}
            <ol className="obrigado-steps">
              {PASSOS.map((passo, i) => (
                <li key={passo.titulo} className="obrigado-step">
                  <span className="obrigado-step-num" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="obrigado-step-title">{passo.titulo}</h2>
                  <p className="obrigado-step-text">{passo.texto}</p>
                </li>
              ))}
            </ol>

            <div className="obrigado-actions">
              <Link href={ROTA_LP3} className="btn">
                Voltar para a página
              </Link>
            </div>
          </div>
        </section>
      </main>

      <RodapeLp3 />
    </>
  );
}
