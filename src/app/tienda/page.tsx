import { Metadata } from "next";
import Products from "@/components/product/Products";
import WooCommerceService from "@/services/WooCommerceService";

export const metadata: Metadata = {
    title: "Tienda | Tracy Lencería",
    description: "Explora toda nuestra colección de lencería de lujo y ropa interior femenina.",
};

export default async function ShopPage() {
    // SSR Prefetching for Shop Page
    let initialData;
    try {
        initialData = await WooCommerceService.getProducts({ page: 1, per_page: 12 });
    } catch (error) {
        console.error("Failed to prefetch shop products:", error);
    }

    return (
        <main className="main-shop">
            <Products
                title="Tienda"
                basePath="/tienda"
                initialData={initialData}
            />
        </main>
    );
}
