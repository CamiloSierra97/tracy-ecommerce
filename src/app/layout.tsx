import ReactQueryProvider from "../providers/ReactQueryProvider";
import { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

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
  maximumScale: 1.0,
  userScalable: false,
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
          <Header></Header>
          {children}
          <Footer></Footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
