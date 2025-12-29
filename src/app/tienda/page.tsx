import Products from "@/components/product/Products";
import WooCommerceService from "@/services/WooCommerceService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda | Tracy Lencería",
  description:
    "Explora toda nuestra colección de lencería de lujo y ropa interior femenina, caballero y niña.",
};

export default async function ShopPage() {
  // SSR Prefetching for Shop Page
  let initialData;
  try {
    initialData = await WooCommerceService.getProducts({
      page: 1,
      per_page: 12,
    });
  } catch (error) {
    console.error("Failed to prefetch shop products:", error);
  }

  return (
    <main className="principal__main">
      <Products
        title="Tienda"
        basePath="/tienda"
        initialData={initialData}
        headingLevel="h1"
      />
    </main>
  );
}
