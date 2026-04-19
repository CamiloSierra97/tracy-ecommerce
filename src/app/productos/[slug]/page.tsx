import WooCommerceService from "@/services/WooCommerceService";
import ProductDetails from "@/components/product/ProductDetails";
import ProductReviewsClient from "@/components/product/ProductReviewsClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanitizeProductDescription } from "@/utils/sanitize";
import { MAX_DESCRIPTION_LENGTH } from "@/utils/constants";

// ISR: revalidar cada 5 minutos — los detalles de producto cambian raramente
export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await WooCommerceService.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado | Tracy Lencería",
    };
  }

  // Detectar si es categoría Junior/Infantil basado en el nombre o descripción
  const isJunior = /junior|niña|infantil|niñas/i.test(
    product.name + (product.short_description || ""),
  );

  const seoSuffix = isJunior
    ? "Lencería Junior & Diseño Colombiano"
    : "Lencería de Autor & Diseño Colombiano Premium";

  // Usar utilidad de sanitización con longitud máxima, dejando espacio para keywords SEO
  const baseDescription = sanitizeProductDescription(
    product.short_description || product.description,
    120, // Reducir un poco para dar espacio a los sufijos SEO
  );

  const fullDescription = `${baseDescription}. ${
    isJunior ? "Lencería Junior" : "Lencería de autor"
  } con diseño colombiano premium. Hecho en Colombia con amor por Tracy.`;

  return {
    title: `${product.name} | ${seoSuffix} | Tracy`,
    description: fullDescription,
    keywords: [
      "lencería de autor",
      "diseño colombiano",
      "ropa interior premium",
      isJunior ? "lencería para niñas" : "lencería fina",
      "hecho en colombia",
      product.name.toLowerCase(),
    ],
    openGraph: {
      title: `${product.name} - Tracy Lencería`,
      description: fullDescription,
      images: product.images?.[0]?.src ? [product.images[0].src] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: fullDescription,
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

  // Calcular aggregateRating desde los reviews reales
  const approvedReviews = reviews.filter((r) => r.rating > 0);
  const ratingCount = approvedReviews.length;
  const ratingValue =
    ratingCount > 0
      ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / ratingCount
      : 5; // Valor por defecto cuando aún no hay reviews

  // Crear Schema.org con descripción sanitizada
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images?.map((img) => img.src) || [],
    description: sanitizeProductDescription(
      product.short_description || product.description,
    ),
    sku: product.id.toString(),
    brand: {
      "@type": "Brand",
      name: "Tracy Lencería",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: parseFloat(ratingValue.toFixed(1)),
      reviewCount: ratingCount > 0 ? ratingCount : 1,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "COP",
      price: product.price,
      availability:
        product.status === "publish"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://www.tracystore.com/productos/${slug}`,
      seller: {
        "@type": "Organization",
        name: "Tracy Lencería",
      },
    },
  };

  return (
    <main className="main-product bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetails product={product} />
      <ProductReviewsClient
        reviews={reviews}
        productId={product.id}
        productName={product.name}
      />
    </main>
  );
}
