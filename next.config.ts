import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Existe um package-lock.json solto em C:\Users\Arck1Pro. Sem esta linha o
    // Turbopack elege a pasta do usuário como raiz do projeto e passa a vigiar
    // a árvore inteira dela — na prática ele perde alterações do globals.css, e
    // o dev server continua servindo o CSS antigo até ser reiniciado.
    root: __dirname,
  },
};

export default nextConfig;
