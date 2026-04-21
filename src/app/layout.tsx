import ReactQueryProvider from "../providers/ReactQueryProvider";
import TransitionProvider from "@/components/shared/layout/TransitionProvider";
import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";
import DynamicLayoutElements from "@/components/shared/layout/DynamicLayoutElements";
import Script from "next/script";
import { Metadata, Viewport } from "next";
import { CartProvider } from "@/context/CartContext";
import { playfair, roboto_serif, roboto } from "@/lib/fonts";
import { UIProvider } from "@/context/UIContext";
import { auth } from "@/auth";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tracystore.com"),
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
    url: "https://www.tracystore.com",
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
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K373Q56D');
          `,
        }}
      />

      <body className="font-sans">
        <ReactQueryProvider>
          <UIProvider>
            <CartProvider>
              <div className="principal__container relative flex flex-col min-h-screen w-full">
                <Header />
                <main className="principal__main grow">
                  <TransitionProvider>{children}</TransitionProvider>
                </main>
              </div>
              <Analytics />
              <SpeedInsights />
              <Footer />
              <DynamicLayoutElements session={session} />
            </CartProvider>
          </UIProvider>
        </ReactQueryProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X4Q479N49V"
          strategy="lazyOnload"
        />
        <Script id="ga-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X4Q479N49V');
          `}
        </Script>
      </body>
    </html>
  );
}
