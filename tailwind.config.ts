/** @type { import('tailwindcss').Config } */
// import type { Config } from "tailwindcss";

module.exports = {
  // 1. Archivos que Tailwind debe escanear para generar las clases
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/fonts/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // 2. Extensión del tema
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-Inter)", "sans-serif"],
        playfair: ["var(--font-Playfair)"],
      },
    },
  },

  plugins: [],
};
