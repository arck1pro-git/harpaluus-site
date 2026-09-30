"use client";

import { useRef, useState } from "react";

/**
 * Simulador da SCP — a conta do simulador oficial das operações. Mexer nas
 * taxas aqui é mexer no que o investidor lê como retorno: trocar só junto
 * com o comercial.
 */

/** Taxas base mensais por prazo. */
const TAXAS_BASE = {
  18: { mensal: 0.015, bullet: 0.015 },
  24: { mensal: 0.016, bullet: 0.016 },
  36: { mensal: 0.018, bullet: 0.018 },
} as const;

/** Taxa adicional do retorno no vencimento ("Final"), em qualquer faixa. */
const TAXA_ADICIONAL_BULLET = 0.005;

/** Bônus de taxa por faixa de capital investido. */
const TAXAS_EXTRA = [
  { min: 20_000, max: 99_999.99, extra: 0 },
  { min: 100_000, max: 199_999.99, extra: 0.003 },
  { min: 200_000, max: 399_999.99, extra: 0.005 },
  { min: 400_000, max: Infinity, extra: 0.007 },
];

const CAPITAL_MINIMO = 50_000;
const CAPITAL_MAXIMO_SLIDER = 1_000_000;

type Prazo = keyof typeof TAXAS_BASE;
type Modo = "mensal" | "bullet";

const PRAZOS: Prazo[] = [18, 24, 36];

const MODOS: { valor: Modo; rotulo: string; descricao: string }[] = [
  {
    valor: "mensal",
    rotulo: "Mensal",
    descricao: "Você recebe o rendimento todo mês durante o período.",
  },
  {
    valor: "bullet",
    rotulo: "Final",
    descricao: "Capital e rendimento pagos integralmente no vencimento.",
  },
];

function taxaExtra(capital: number) {
  return (
    TAXAS_EXTRA.find((faixa) => capital >= faixa.min && capital <= faixa.max)?.extra ??
    0.007
  );
}

/**
 * Mensal: taxa base + bônus de faixa, só a partir de R$ 100 mil.
 * Final: taxa base + adicional do vencimento + bônus de faixa, sempre.
 */
function calcularTaxa(capital: number, prazo: Prazo, modo: Modo) {
  const base = TAXAS_BASE[prazo][modo];
  const extra = taxaExtra(capital);
  if (modo === "mensal") return base + (capital >= 100_000 ? extra : 0);
  return base + TAXA_ADICIONAL_BULLET + extra;
}

function reais(valor: number) {
  return `R$ ${Math.round(valor).toLocaleString("pt-BR")}`;
}

function comCentavos(valor: number) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** "100.000,00" → 100000 */
function lerMascara(texto: string) {
  return parseFloat((texto || "0").replace(/\./g, "").replace(",", ".")) || 0;
}

/** Os dígitos digitados, lidos como centavos: "1234" → "12,34". */
function aplicarMascara(texto: string) {
  const digitos = texto.replace(/\D/g, "");
  if (!digitos) return "";
  return comCentavos(parseInt(digitos, 10) / 100);
}

export function SimuladorScp() {
  /* O campo de capital é não-controlado: a máscara
     reescreve o texto e reposiciona o cursor na mão, coisa que um input
     controlado desfaria a cada tecla, mandando o cursor para o fim. */
  const campoCapital = useRef<HTMLInputElement>(null);

  const [capitalDigitado, setCapitalDigitado] = useState(100_000);
  const [abaixoDoMinimo, setAbaixoDoMinimo] = useState(false);
  const [prazo, setPrazo] = useState<Prazo>(24);
  const [modo, setModo] = useState<Modo>("mensal");

  const capital = Math.max(CAPITAL_MINIMO, capitalDigitado || CAPITAL_MINIMO);
  const taxa = calcularTaxa(capital, prazo, modo);
  const retornoTotal = capital * taxa * prazo;
  const acumulado = capital + retornoTotal;
  const ganho = ((retornoTotal / capital) * 100).toFixed(1).replace(".", ",");

  const descricaoModo = MODOS.find((item) => item.valor === modo)?.descricao;

  return (
    <div className="sim-box">
      {/* Controles */}
      <div className="sim-controls">
        {/* Capital */}
        <div className="sim-field">
          <label className="sim-field-label" htmlFor="inp-capital">
            Capital a investir
          </label>
          <div className="sim-capital-wrap">
            <span className="sim-capital-prefix" aria-hidden>
              R$
            </span>
            <input
              ref={campoCapital}
              className="sim-capital-input"
              type="text"
              inputMode="numeric"
              id="inp-capital"
              defaultValue="100.000,00"
              aria-label="Capital a investir em reais"
              onInput={(evento) => {
                const campo = evento.currentTarget;
                const cursor = campo.selectionStart ?? campo.value.length;
                const tamanhoAntes = campo.value.length;

                campo.value = aplicarMascara(campo.value);

                const deslocamento = campo.value.length - tamanhoAntes;
                campo.setSelectionRange(cursor + deslocamento, cursor + deslocamento);

                const valor = lerMascara(campo.value);
                setAbaixoDoMinimo(campo.value !== "" && valor < CAPITAL_MINIMO);
                setCapitalDigitado(valor);
              }}
            />
          </div>
          <p className="sim-min-warning" hidden={!abaixoDoMinimo}>
            O valor mínimo para investimento é R$&nbsp;50.000
          </p>
          <label htmlFor="sl-capital" className="sr-only">
            Ajuste o capital com o controle deslizante
          </label>
          <input
            type="range"
            id="sl-capital"
            min={CAPITAL_MINIMO}
            max={CAPITAL_MAXIMO_SLIDER}
            step={5000}
            value={Math.min(capital, CAPITAL_MAXIMO_SLIDER)}
            aria-label="Controle deslizante de capital"
            onChange={(evento) => {
              const valor = parseFloat(evento.currentTarget.value);
              if (campoCapital.current) campoCapital.current.value = comCentavos(valor);
              setAbaixoDoMinimo(false);
              setCapitalDigitado(valor);
            }}
          />
          <div className="sim-range-ticks" aria-hidden>
            <span className="sim-range-tick">R$ 50k</span>
            <span className="sim-range-tick">R$ 500k</span>
            <span className="sim-range-tick">R$ 1M</span>
          </div>
        </div>

        {/* Prazo */}
        <div className="sim-field">
          <span className="sim-field-label" id="label-prazo">
            Prazo
          </span>
          <div className="sim-toggle-group" role="group" aria-labelledby="label-prazo">
            {PRAZOS.map((opcao) => (
              <button
                key={opcao}
                type="button"
                className={`sim-toggle${opcao === prazo ? " active" : ""}`}
                aria-pressed={opcao === prazo}
                onClick={() => setPrazo(opcao)}
              >
                {opcao} meses
              </button>
            ))}
          </div>
        </div>

        {/* Forma de retorno */}
        <div className="sim-field">
          <span className="sim-field-label" id="label-modo">
            Forma de retorno
          </span>
          <div className="sim-toggle-group" role="group" aria-labelledby="label-modo">
            {MODOS.map((opcao) => (
              <button
                key={opcao.valor}
                type="button"
                className={`sim-toggle${opcao.valor === modo ? " active" : ""}`}
                aria-pressed={opcao.valor === modo}
                onClick={() => setModo(opcao.valor)}
              >
                {opcao.rotulo}
              </button>
            ))}
          </div>
          <p className="sim-modo-desc">{descricaoModo}</p>
        </div>
      </div>

      {/* Resultados */}
      <div className="sim-results" aria-live="polite" aria-atomic="true">
        <div className="sim-taxa-badge">
          <span className="sim-taxa-badge-label">Taxa aplicada</span>
          <span className="sim-taxa-badge-value">
            {(taxa * 100).toFixed(2).replace(".", ",")}% a.m.
          </span>
        </div>

        <div className="sim-main-result">
          <div className="sim-main-label">
            {modo === "mensal" ? "Renda mensal" : "Você recebe no vencimento"}
          </div>
          <div className="sim-main-value">
            {modo === "mensal" ? reais(capital * taxa) : reais(acumulado)}
          </div>
          <div className="sim-main-sub">isento de Imposto de Renda</div>
        </div>

        <div className="sim-rows">
          <div className="sim-row">
            <span className="sim-row-label">Retorno total no período</span>
            <span className="sim-row-value hi">{reais(retornoTotal)}</span>
          </div>
          <div className="sim-row">
            <span className="sim-row-label">Capital + retorno</span>
            <span className="sim-row-value">{reais(acumulado)}</span>
          </div>
          <div className="sim-row">
            <span className="sim-row-label">Ganho sobre o capital</span>
            <span className="sim-row-value">+{ganho}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
