import ReactQueryProvider from "../providers/ReactQueryProvider";
import Header from "@/components/Header";
import { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

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
          {children}
          <Footer></Footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
