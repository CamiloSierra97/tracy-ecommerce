import { Metadata } from "next";
import { notFound } from "next/navigation";
import WooCommerceService from "@/services/WooCommerceService";
import ProductDetails from "@/components/product/ProductDetails";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = await WooCommerceService.getProductBySlug(slug);

    if (!product) {
        return {
            title: "Producto no encontrado",
        };
    }

    // Strip HTML from description for meta description
    const cleanDescription = (product.short_description || product.description || "")
        .replace(/<[^>]*>?/gm, "")
        .slice(0, 160);

    return {
        title: `${product.name} - Tracy Lencería`,
        description: cleanDescription,
        openGraph: {
            images: product.images?.[0]?.src ? [product.images[0].src] : [],
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = await WooCommerceService.getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="main-product bg-white min-h-screen">
            <ProductDetails product={product} />
        </main>
    );
}
