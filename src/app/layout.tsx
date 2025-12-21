import { Metadata, Viewport } from "next";
import { CartProvider } from "@/context/CartContext";
import { playfair, roboto_serif, roboto } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DynamicLayoutElements from "@/components/layout/DynamicLayoutElements";
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
  openGraph: {
    title: "Tracy Lencería | Ropa Interior de Lujo y Batas en Colombia",
    description:
      "Descubre la colección exclusiva de Tracy Lencería. Ropa interior, batas de seda y accesorios íntimos diseñados para resaltar tu elegancia.",
    url: "https://tracylenceria.com",
    siteName: "Tracy Lencería",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Tracy Lencería Colección",
      },
    ],
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
    <html
      lang="es"
      className={`${playfair.variable} ${roboto_serif.variable} ${roboto.variable}`}
    >
      <body className="font-sans">
        <ReactQueryProvider>
          <CartProvider>
            <div className="principal__container relative flex flex-col min-h-screen w-full">
              <Header />
              <main className="principal__main grow">{children}</main>
            </div>
            <Analytics />
            <SpeedInsights />
            <Footer />
            <DynamicLayoutElements />
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
