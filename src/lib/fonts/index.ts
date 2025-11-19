import { Inter, Meow_Script, Playfair_Display, Roboto, Roboto_Serif } from "next/font/google";

// 1. Fuente Serif Principal (Regular y Bold)
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-Playfair",
});

// 2. Fuente Serif Cursiva (Italic)
export const playfair_italic = Playfair_Display({
  subsets: ["latin"],
  weight: "700",
  style: "italic",
  variable: "--font-Playfair-italic",
})

// 3. Fuente Sans-serif Principal
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-Inter",
});

// 4. Fuente normal Principal
export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-Roboto",
});

// 3. Fuente Sans-serif Secundaria
export const roboto_serif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-Roboto-Serif",
});

export const meow_script = Meow_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-Meow-Script"
})




