import { Playfair, Roboto, Roboto_Serif } from "next/font/google";
import { Inter } from "next/font/google";

export const playfair = Playfair({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-Playfair",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-Inter",
});

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-Roboto",
});

export const roboto_serif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-Roboto-Serif",
  style: "italic",
});
