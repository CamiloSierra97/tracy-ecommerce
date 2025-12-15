import ReactQueryProvider from "../providers/ReactQueryProvider";
import { Metadata, Viewport } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CookieBanner from "@/components/layout/CookieBanner";
import { playfair, playfair_italic, roboto_serif } from "@/lib/fonts";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Tracy E-commerce",
  description: "Ropa interior de lujo y accesorios íntimos",
  keywords:
    "lencería de lujo, ropa interior, accesorios íntimos, lencería Colombia",
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
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${playfair.variable} ${playfair_italic.variable} ${roboto_serif.variable} font-sans`}>
        <ReactQueryProvider>
          <CartProvider>
            <div className="relative flex flex-col min-h-screen w-full">
              <Header />
              <main className="grow">
                {children}
              </main>
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
