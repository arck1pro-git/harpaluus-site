import Image from "next/image";
import Link from "next/link";

import {
  CNPJ,
  INSTAGRAM,
  logoClaro,
  marca,
  ROTA_PRIVACIDADE,
  WHATSAPP,
} from "../landing/site-config";

/**
 * Rodapé da LP03 e da página de obrigado dela.
 *
 * O par de logos é o da Amaan — o símbolo dourado e o lettering —, e os dois
 * ícones levam aos canais da Amaan, os mesmos do rodapé da home. A linha
 * jurídica identifica a pessoa jurídica, como no rodapé das outras LPs.
 */
export function RodapeLp3() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand-block">
          <div className="footer-logos">
            <Image
              src="/logo-amaan-simbolo-dourado.png"
              alt=""
              width={256}
              height={256}
              sizes="40px"
              className="footer-logo-simbolo"
            />
            <span className="footer-logos-sep" aria-hidden />
            <Image
              src={logoClaro.src}
              alt={marca}
              width={logoClaro.width}
              height={logoClaro.height}
              sizes="128px"
              className="footer-logo-nome"
            />
          </div>

          <nav className="footer-social" aria-label="Redes sociais">
            <a
              href={WHATSAPP}
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Amaan"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                focusable="false"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.526 5.845L.057 23.535a.5.5 0 0 0 .608.608l5.699-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 0 1-5.007-1.374l-.36-.214-3.724.957.983-3.607-.235-.372A9.785 9.785 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
            </a>
            <a
              href={INSTAGRAM}
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @amaanincorporadora"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                focusable="false"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </nav>
        </div>

        <p className="footer-legal">
          {marca} · CNPJ {CNPJ} <br />
          © {new Date().getFullYear()} {marca}. Todos os direitos reservados. <br />
          <Link href={ROTA_PRIVACIDADE} className="footer-legal-link">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </footer>
  );
}
