import { Raleway } from "next/font/google";

/**
 * A Raleway existe só para esta rota.
 *
 * `/home` é o rascunho antigo, `noindex` e fora da navegação, e é a única
 * página que escreve em Raleway. Enquanto a fonte era declarada no layout
 * raiz, o `next/font` colocava os quatro pesos dela no preload de todas as
 * rotas — inclusive da home pública e das duas LPs, que nunca a usam.
 *
 * Declarada aqui, ela continua chegando exatamente onde é usada e some do
 * resto do site. O `variable` precisa de um elemento para pendurar: como
 * layout aninhado não renderiza `<html>`, ele vai num `<div>` que embrulha a
 * página — o `--font-raleway` herda dali para dentro.
 */
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={raleway.variable}>{children}</div>;
}
