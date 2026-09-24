"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { ArrowRight, X } from "lucide-react";

import { TRACO } from "../landing/icones";
import type { TextosSucesso } from "./formulario";
import type { OrigemLead } from "./lead";
import { rastrearAbertura } from "./meta-pixel";
import { utmsDaVisita } from "./utms";

/**
 * O formulário só é baixado quando a janela abre.
 *
 * Ele já só *renderizava* depois do clique (`{aberto && …}`), mas o import
 * estático colocava campos, máscaras, validação e a server action no mesmo
 * pacote que a página carrega para pintar o hero — código que a maioria das
 * visitas nunca executa, avaliado no meio da hidratação.
 *
 * `ssr: false` porque não há o que pré-renderizar: no HTML inicial o diálogo
 * está fechado e vazio. O chunk chega no primeiro clique, com a página já
 * ociosa.
 */
const Formulario = dynamic(
  () => import("./formulario").then((m) => m.Formulario),
  { ssr: false }
);

/**
 * O formulário como janela sobre a página.
 *
 * Um diálogo só por LP, no elemento `<dialog>` nativo: com `showModal()` o
 * navegador já entrega a camada por cima de tudo (top layer, acima de
 * qualquer z-index), o fechamento com Esc, o foco preso dentro da janela e o
 * resto da página marcado como inerte. Reimplementar isso à mão é onde
 * modais costumam quebrar para quem navega por teclado.
 *
 * Os botões espalhados pela página abrem esta janela por contexto, então
 * existe um único formulário no documento — e não uma cópia por CTA, cada uma
 * com o seu próprio estado de envio.
 */

type Abrir = () => void;

const ContextoFormulario = createContext<Abrir | null>(null);

function useAbrirFormulario() {
  const abrir = useContext(ContextoFormulario);

  if (!abrir) {
    // Erro de montagem, não de uso: o botão só existe para abrir a janela.
    throw new Error("BotaoFormulario precisa estar dentro de FormularioProvider.");
  }

  return abrir;
}

/* ------------------------------------------------------------------ BOTÃO */

/**
 * CTA que abre a janela.
 *
 * É um `<button>`, e não um link com âncora: o destino não é um lugar da
 * página, é uma ação. `tom` é o do fundo onde o botão está apoiado.
 */
export function BotaoFormulario({
  children,
  tom = "claro",
  className = "",
}: {
  children: React.ReactNode;
  tom?: "claro" | "escuro";
  className?: string;
}) {
  const abrir = useAbrirFormulario();

  const cores =
    tom === "escuro"
      ? "bg-white text-azul-escuro hover:bg-dourado-claro"
      : "bg-azul-escuro text-white hover:bg-azul-profundo";

  return (
    <button
      type="button"
      onClick={abrir}
      /* A tipografia do `tipo-label` está escrita à mão porque só o peso muda:
         `font-bold` sobre a classe dependeria da ordem em que as duas caem na
         folha de estilo, e é o tipo de empate que quebra sem avisar. */
      className={`group inline-flex min-h-[52px] items-center justify-center gap-4 rounded-lg px-9 py-[18px] text-center text-[11px] leading-none font-bold tracking-[0.2em] uppercase transition-colors duration-300 ease-out ${cores} ${className}`}
    >
      {children}
      <ArrowRight
        size={16}
        strokeWidth={TRACO}
        aria-hidden
        className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-[3px]"
      />
    </button>
  );
}

/* --------------------------------------------------------------- PROVIDER */

export function FormularioProvider({
  children,
  origem,
  titulo,
  rotuloEnvio,
  sucesso,
  aviso,
}: {
  children: React.ReactNode;
  origem: OrigemLead;
  /** nome acessível da janela: não aparece na tela, mas é o que o leitor de
      tela anuncia ao abrir */
  titulo: string;
  rotuloEnvio: string;
  sucesso: TextosSucesso;
  aviso?: string;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [aberto, setAberto] = useState(false);
  const idTitulo = useId();

  const abrir = useCallback(() => {
    /* `showModal` é o que coloca o diálogo na top layer. Sem ele, `<dialog>`
       é só uma caixa no fluxo — e nenhum dos comportamentos de modal existe. */
    dialogo.current?.showModal();
    setAberto(true);
    rastrearAbertura(origem);
  }, [origem]);

  const fechar = useCallback(() => {
    dialogo.current?.close();
  }, []);

  /* As UTMs são lidas quando a página monta, não quando a janela abre.
     Aqui a URL do anúncio ainda está na barra; guardá-las na sessão agora é o
     que salva o lead de quem clica no CTA depois de uma navegação interna,
     que teria levado a query embora. O formulário lê o mesmo lugar quando
     abre — esta chamada só garante que já haja o que ler. */
  useEffect(() => {
    utmsDaVisita();
  }, []);

  /* A página atrás não deve rolar enquanto a janela está aberta: no celular é
     o que faz o dedo arrastar o conteúdo de baixo em vez do formulário. */
  useEffect(() => {
    if (!aberto) return;

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = anterior;
    };
  }, [aberto]);

  return (
    <ContextoFormulario.Provider value={abrir}>
      {children}

      <dialog
        ref={dialogo}
        aria-labelledby={idTitulo}
        /* `close` cobre todas as saídas — botão, Esc e clique no fundo —, que
           é o único jeito de o estado não descolar quando o navegador fecha o
           diálogo sozinho. */
        onClose={() => setAberto(false)}
        onClick={(evento) => {
          /* Clique no fundo fecha. O alvo é o próprio `<dialog>` só quando o
             clique cai fora do painel, porque o painel é quem preenche a
             área visível — daí comparar com `currentTarget`. */
          if (evento.target === evento.currentTarget) fechar();
        }}
        /* Desfaz o estilo que o navegador dá a `<dialog>`: margem automática,
           borda, respiro e limites de tamanho. `h-full w-full` é o essencial —
           o UA deixa `<dialog>` com `width/height: fit-content`, e `inset-0`
           sozinho não estica a caixa: ela fica do tamanho do conteúdo e
           encostada à esquerda, com a barra de rolagem do próprio diálogo.
           `overflow-hidden` tira essa barra externa; quem rola é o painel. */
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 backdrop:bg-azul-escuro/70 backdrop:backdrop-blur-[2px]"
      >
        {/* O `<dialog>` ocupa a tela inteira e centraliza o painel em
            qualquer largura; o painel é que rola, quando o formulário não
            couber na altura. O respiro externo é o que deixa o canto
            arredondado aparecer contra o fundo, inclusive no celular. */}
        <div className="flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-azul-escuro px-7 pt-14 pb-10 sm:max-h-[calc(100dvh-3rem)] sm:px-10 sm:pt-16">
            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center text-pedra-claro transition-colors duration-300 hover:text-white"
            >
              <X size={20} strokeWidth={TRACO} aria-hidden />
            </button>

            {/* O nome acessível da janela — `<dialog>` precisa de um, e é ele
                que o leitor de tela anuncia ao abrir. O título que se vê fica
                no formulário, que o esconde na tela de sucesso. */}
            <h2 id={idTitulo} className="sr-only">
              {titulo}
            </h2>

            {/* Remonta a cada abertura: quem fecha depois de um erro de
                validação e volta encontra o formulário limpo, não a tela de
                erro de dez minutos atrás. */}
            {aberto && (
              <Formulario
                origem={origem}
                tom="escuro"
                titulo={titulo}
                rotuloEnvio={rotuloEnvio}
                sucesso={sucesso}
                aviso={aviso}
                onFechar={fechar}
              />
            )}
          </div>
        </div>
      </dialog>
    </ContextoFormulario.Provider>
  );
}
