import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Otimização de imagem.
   *
   * `formats` em AVIF antes de WebP: o AVIF sai ~20% menor com a mesma
   * qualidade percebida, e o Next cai para WebP sozinho em navegador que não
   * o suporta. O custo é a primeira requisição de cada imagem, que leva ~50%
   * mais tempo para codificar — por isso ele anda junto com o
   * `minimumCacheTTL` longo aqui embaixo, que faz esse custo ser pago uma vez.
   *
   * `minimumCacheTTL` de 31 dias no lugar das 4 horas padrão: as fotos do site
   * são estáveis, e revalidar de quatro em quatro horas só devolvia trabalho
   * de codificação sem nenhuma imagem nova para mostrar. Trocar uma foto agora
   * exige publicar com outro nome de arquivo — que é o que a pasta
   * `public/fotos` já favorece.
   */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
  },

  turbopack: {
    // Existe um package-lock.json solto em C:\Users\Arck1Pro. Sem esta linha o
    // Turbopack elege a pasta do usuário como raiz do projeto e passa a vigiar
    // a árvore inteira dela — na prática ele perde alterações do globals.css, e
    // o dev server continua servindo o CSS antigo até ser reiniciado.
    root: __dirname,
  },
};

export default nextConfig;
