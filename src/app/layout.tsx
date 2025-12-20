import { Metadata, Viewport } from "next";
import { CartProvider } from "@/context/CartContext";
import { playfair, playfair_italic, roboto_serif } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CookieBanner from "@/components/layout/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tracy Lencería | Ropa Interior de Lujo y Batas en Colombia",
  description:
    "Descubre la colección exclusiva de Tracy Lencería. Ropa interior, batas de seda y accesorios íntimos diseñados para resaltar tu elegancia. Disfruta de nuestros productos para dama, caballero y niña. Envíos en Colombia.",
  keywords:
    "lencería de lujo, ropa interior colombia, batas de seda, accesorios íntimos, tracy lencería, ropa interior femenina, lencería de hombre, ropa interior niña",
  authors: [{ name: "SierraDev" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${playfair_italic.variable} ${roboto_serif.variable} font-sans`}
      >
        <ReactQueryProvider>
          <CartProvider>
            <div className="principal__container relative flex flex-col min-h-screen w-full">
              <Header />
              <main className="principal__main grow">{children}</main>
            </div>
            <Analytics />
            <SpeedInsights />
            <Footer />
            <CartDrawer />
            <CookieBanner />
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
