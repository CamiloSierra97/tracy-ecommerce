import Products from "@/components/product/Products";
import WooCommerceService from "@/services/WooCommerceService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda | Tracy Lencería",
  description:
    "Explora toda nuestra colección de lencería de lujo y ropa interior femenina, caballero y niña.",
};

import { PRODUCTS_PER_PAGE } from "@/utils/constants";

// ISR: revalidar catálogo cada 2 minutos
export const revalidate = 120;


// ...

interface Props {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;

  // Pre-carga SSR para la página de Tienda
  let initialData;
  try {
    initialData = await WooCommerceService.getProducts({
      page,
      per_page: PRODUCTS_PER_PAGE,
    });
  } catch (error) {
    console.error("Failed to prefetch shop products:", error);
  }

  return (
    <main id="main-content" className="principal__main">
      <Products
        title="Tienda"
        basePath="/tienda"
        initialData={initialData}
        headingLevel="h1"
        initialPage={page}
      />
    </main>
  );
}
