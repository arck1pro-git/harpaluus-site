import { ImageResponse } from "next/og";

import { marca } from "./components/landing/site-config";

/**
 * Card gerado no build para WhatsApp, LinkedIn, Slack e para a miniatura da
 * busca. Não existia nenhum: sem imagem, o link do site aparecia como texto
 * cru, e o nome que o compartilhador mostrava vinha do domínio — o do nome
 * antigo. Aqui a marca está escrita na própria imagem.
 *
 * É desenhado em vez de ser uma foto do empreendimento porque o problema é de
 * identidade, não de apelo visual: quem vê o card precisa ler "Amaan".
 *
 * O `next/og` renderiza com Satori, que só entende um subconjunto de CSS —
 * daí todo container com mais de um filho trazer `display: flex` explícito, e
 * o espaçamento sair de `letterSpacing`/`margin`, sem grid nem gap herdado.
 */
export const alt = `${marca} — Empreendimentos Vivos`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* A mesma paleta de globals.css, repetida como literal porque o Satori não lê
   as custom properties do site. */
const AZUL_ESCURO = "#111729";
const DOURADO = "#af8951";
const DOURADO_CLARO = "#f0c991";
const CREME = "#f5e7d2";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: AZUL_ESCURO,
          // brilho quente saindo do centro, como o hero do site
          backgroundImage: `radial-gradient(circle at 50% 42%, #1f2e50 0%, ${AZUL_ESCURO} 62%)`,
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 128,
            letterSpacing: 26,
            // o lettering da marca é caixa alta e espaçado
            color: CREME,
            // compensa o letterSpacing sobrando à direita e recentra o bloco
            marginLeft: 26,
          }}
        >
          AMAAN
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 15,
            color: DOURADO_CLARO,
            marginTop: 18,
            marginLeft: 15,
          }}
        >
          INCORPORADORA
        </div>

        {/* filete dourado separando a marca da frase, como nas seções do site */}
        <div
          style={{
            display: "flex",
            width: 140,
            height: 2,
            backgroundColor: DOURADO,
            marginTop: 52,
            marginBottom: 52,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: CREME,
            textAlign: "center",
          }}
        >
          Confiança para construir o que permanece.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            color: DOURADO,
            marginTop: 28,
          }}
        >
          EMPREENDIMENTOS VIVOS
        </div>
      </div>
    ),
    size,
  );
}
