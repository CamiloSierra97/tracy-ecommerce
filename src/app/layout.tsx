import ReactQueryProvider from "../providers/ReactQueryProvider";
import Header from "@/components/Header";
import { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tracy E-commerce",
  description: "Ropa interior de lujo y accesorios íntimos",
  keywords: "",
  authors: [{ name: "SierraDev" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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
