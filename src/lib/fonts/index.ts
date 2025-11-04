import { Playfair } from "next/font/google";
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
