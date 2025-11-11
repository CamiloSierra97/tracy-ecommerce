import type { Metadata } from "next";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Header from "@/components/Header";
import "./globals.css";
import Products from "@/components/Products";

export const metadata: Metadata = {
  title: "Tracy E-commerce",
  description: "Lencería de lujo y accesorios íntimos",
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
          <Products title={metadata.title as string} basePath="/"></Products>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
