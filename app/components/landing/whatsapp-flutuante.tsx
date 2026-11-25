import { WhatsAppIcon } from "./icones";
import { textos } from "./site-config";

/**
 * Botão dourado do WhatsApp, fixo no canto inferior direito, com um pulso
 * dourado em volta.
 *
 * Aparece onde o rodapé institucional aparece (home, blog e política de
 * privacidade), porque é renderizado pelo próprio `Footer`. As LPs têm rodapé
 * próprio e ficam de fora de propósito: lá a conversão é o formulário, e um
 * atalho para o WhatsApp desviaria o lead.
 *
 * Fica abaixo do header (z-50) e do aviso de cookies (z-60): enquanto o aviso
 * está aberto, ele cobre o botão, e o botão volta assim que o aviso fecha.
 * O ícone sai no azul-escuro, que contrasta com todos os tons do degradê
 * dourado; branco sobre o dourado claro não passaria de 3:1.
 */
export function WhatsAppFlutuante({
  href = textos.whatsapp,
  rotulo = textos.whatsappFlutuante,
}: {
  /** a conversa já com a mensagem de origem, no idioma da página */
  href?: string;
  /** o nome do botão para o leitor de tela */
  rotulo?: string;
} = {}) {
  return (
    <div className="fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 h-14 w-14 md:right-8 md:bottom-8">
      {/* o pulso fica atrás do botão (vem antes no DOM): dois anéis
          defasados para a onda não parar entre um ciclo e outro. Com
          movimento reduzido, somem. Keyframes em globals.css. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-dourado animate-[pulso-whatsapp_2.4s_var(--ease-editorial)_infinite] motion-reduce:hidden"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-dourado animate-[pulso-whatsapp_2.4s_var(--ease-editorial)_1.2s_infinite] motion-reduce:hidden"
      />

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={rotulo}
        className="relative flex h-full w-full items-center justify-center rounded-full text-azul-escuro shadow-[0_12px_32px_-10px_rgb(17_23_41/0.55)] transition-transform duration-300 ease-[var(--ease-editorial)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dourado motion-reduce:transition-none"
        style={{ backgroundImage: "var(--gradiente-dourado)" }}
      >
        <WhatsAppIcon size={26} strokeWidth={1.75} />
      </a>
    </div>
  );
}
