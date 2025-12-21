import {
  Inter,
  Meow_Script,
  Playfair_Display,
  Roboto,
  Roboto_Serif,
} from "next/font/google";

// 1. Fuente Serif Principal (Regular y Bold)
// 1. Fuente Serif Principal (Regular, Bold, Italic)
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-Playfair",
  display: "swap",
});

// 3. Fuente Sans-serif Principal
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-Inter",
  display: "swap",
});

// 4. Fuente normal Principal
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Added weights usually needed for Roboto
  variable: "--font-Roboto",
  display: "swap",
});

// 3. Fuente Sans-serif Secundaria
export const roboto_serif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-Roboto-Serif",
  display: "swap",
});

export const meow_script = Meow_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-Meow-Script",
  display: "swap",
});
