import ReactQueryProvider from "../providers/ReactQueryProvider";
import { Metadata, Viewport } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

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
      <body>
        <ReactQueryProvider>
          <CartProvider>
            <div className="relative flex flex-col min-h-screen w-full">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
            </div>
            <Analytics />
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
