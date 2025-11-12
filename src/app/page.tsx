import Products from "@/components/Products";
import { metadata } from "./layout";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">Productos destacados</h1>
        <Products title={metadata.title as string} basePath="/"></Products>
      </main>
      <Footer></Footer>
    </>
  );
}
