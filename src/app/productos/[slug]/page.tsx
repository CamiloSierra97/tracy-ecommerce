import { Metadata } from "next";
import { notFound } from "next/navigation";
import WooCommerceService from "@/services/WooCommerceService";
import ProductDetails from "@/components/product/ProductDetails";
import ProductReviews from "@/components/product/ProductReviews";

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

  // Eliminar HTML de la descripción para la meta descripción
  const cleanDescription = (
    product.short_description ||
    product.description ||
    ""
  )
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

  const reviews = await WooCommerceService.getProductReviews(product.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((img) => img.src) || [],
    description: (
      product.short_description ||
      product.description ||
      ""
    ).replace(/<[^>]*>?/gm, ""),
    sku: product.id.toString(),
    offers: {
      "@type": "Offer",
      priceCurrency: "COP",
      price: product.price,
      availability:
        product.status === "publish"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://tracylenceria.com/productos/${slug}`,
    },
  };

  return (
    <main className="main-product bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetails product={product} />
      <ProductReviews
        reviews={reviews}
        productId={product.id}
        productName={product.name}
      />
    </main>
  );
}
