import { Playfair_Display, Roboto, Roboto_Serif } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-Playfair",
  display: "swap",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-Roboto",
  display: "swap",
});

export const roboto_serif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-Roboto-Serif",
  display: "swap",
});
