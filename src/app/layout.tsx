import ReactQueryProvider from "../providers/ReactQueryProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DynamicLayoutElements from "@/components/layout/DynamicLayoutElements";
import { Metadata, Viewport } from "next";
import { CartProvider } from "@/context/CartContext";
import { playfair, roboto_serif, roboto } from "@/lib/fonts";
import { UIProvider } from "@/context/UIContext";
import { auth } from "@/auth";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tracystore.com"),
  title: "Tracy Lencería | Ropa Interior y Lencería de lujo en Colombia",
  description:
    "Descubre la colección exclusiva de Tracy Lencería. Ropa interior y accesorios íntimos diseñados para resaltar tu elegancia. Disfruta de nuestros productos para dama, caballero y niña. Envíos en Colombia.",
  keywords:
    "lencería de lujo, ropa interior colombia, accesorios íntimos, tracy lencería, ropa interior femenina, lencería de hombre, ropa interior niña",
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
    title: "Tracy Lencería | Ropa Interior y Lencería de Lujo",
    description:
      "Descubre la colección exclusiva de Tracy Lencería. Ropa interior, lencería y accesorios íntimos diseñados para resaltar tu elegancia.",
    url: "https://tracystore.com",
    siteName: "Tracy Lencería",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Colección exclusiva de Tracy - Ropa Interior y Lencería de Lujo",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="es"
      className={`${playfair.variable} ${roboto_serif.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <ReactQueryProvider>
          <UIProvider>
            <CartProvider>
              <div className="principal__container relative flex flex-col min-h-screen w-full">
                <Header />
                <main className="principal__main grow">{children}</main>
              </div>
              <Analytics />
              <SpeedInsights />
              <Footer />
              <DynamicLayoutElements session={session} />
            </CartProvider>
          </UIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
