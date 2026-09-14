import { lp1 } from "./lp-config";

/**
 * Mockup do Checklist — o "mostrar o material" que o brief da LP01 pede no
 * hero.
 *
 * É desenhado em HTML, não fotografado: uma foto de um PDF que ainda não
 * existe seria uma prova falsa, e o brief é explícito quanto a provas visuais
 * reais. Aqui o desenho não finge ser foto — é a representação do documento,
 * com as sete perguntas que a pessoa vai de fato receber. Quando o PDF
 * diagramado existir, este componente pode virar um `next/image` da capa sem
 * mudar nada em volta.
 *
 * Duas folhas: a de trás inclinada, a da frente reta. É o que dá a leitura de
 * "documento de várias páginas" sem sombra pesada nem perspectiva 3D.
 *
 * `aria-hidden` na peça inteira: as sete perguntas estão escritas em texto de
 * verdade logo abaixo, na seção 03, e repeti-las aqui só faria o leitor de
 * tela ler a lista duas vezes.
 */
export function ChecklistMockup({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative ${className}`}>
      {/* folha de trás: só a borda aparece, insinuando a segunda página */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2.2deg] rounded-[2px] border border-linha bg-fundo" />

      <div className="relative rounded-[2px] border border-linha bg-fundo px-7 py-8 shadow-[0_24px_60px_-32px_rgba(17,23,41,0.35)] sm:px-9 sm:py-10">
        {/* cabeçalho do documento */}
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-dourado" />
          <span className="tipo-label text-dourado-escuro">Amaan Incorporadora</span>
        </div>

        <p className="mt-5 font-[family-name:var(--font-playfair)] text-[19px] leading-[1.25] text-azul-escuro sm:text-[22px]">
          7 perguntas antes de participar de uma SCP imobiliária
        </p>

        <p className="tipo-numero mt-3 text-cinza">Checklist de análise</p>

        <ul className="mt-7 flex flex-col gap-0">
          {lp1.perguntas.itens.map((item, i) => (
            <li
              key={item.curta}
              className="flex items-center gap-4 border-t border-linha py-3 last:border-b"
            >
              {/* caixa de marcar, vazia: o material é para ser preenchido */}
              <span className="h-[13px] w-[13px] shrink-0 border border-cinza" />
              <span className="tipo-numero text-dourado-escuro">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] leading-[1.4] font-light text-azul">
                {item.curta}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
