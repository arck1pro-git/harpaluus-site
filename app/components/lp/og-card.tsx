/**
 * Card de compartilhamento das landing pages.
 *
 * As duas LPs têm o mesmo desenho e mudam só o texto, então o layout mora
 * aqui e cada rota entrega o seu conteúdo. É o mesmo card da home — marca
 * escrita por extenso sobre o azul da paleta —, porque quem recebe o link no
 * WhatsApp precisa ler "Amaan" antes de qualquer outra coisa.
 *
 * O `next/og` renderiza com Satori, que entende um subconjunto de CSS: todo
 * container com mais de um filho traz `display: flex` explícito, e não há
 * grid, gap herdado nem custom property — daí a paleta aparecer como literal,
 * repetindo os valores de `globals.css`.
 */

export const TAMANHO_OG = { width: 1200, height: 630 };

const AZUL_ESCURO = "#111729";
const DOURADO = "#af8951";
const DOURADO_CLARO = "#f0c991";
const CREME = "#f5e7d2";
const PEDRA_CLARO = "#aeb7c7";

export function CartaoOg({
  etiqueta,
  titulo,
  apoio,
}: {
  /** linha curta em caixa alta, acima do filete */
  etiqueta: string;
  /** a promessa da página, em duas ou três linhas */
  titulo: string;
  /** rodapé do card */
  apoio: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: AZUL_ESCURO,
        backgroundImage: `radial-gradient(circle at 22% 18%, #1f2e50 0%, ${AZUL_ESCURO} 68%)`,
        padding: "72px 80px",
      }}
    >
      {/* marca */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 14, color: CREME }}>
          AMAAN
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 17,
            letterSpacing: 9,
            color: DOURADO,
            marginTop: 10,
          }}
        >
          INCORPORADORA
        </div>
      </div>

      {/* promessa */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 7, color: DOURADO_CLARO }}>
          {etiqueta.toUpperCase()}
        </div>

        <div
          style={{
            display: "flex",
            width: 120,
            height: 2,
            backgroundColor: DOURADO,
            marginTop: 28,
            marginBottom: 34,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 52,
            lineHeight: 1.18,
            color: "#ffffff",
            maxWidth: 980,
          }}
        >
          {titulo}
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 22, color: PEDRA_CLARO }}>{apoio}</div>
    </div>
  );
}
