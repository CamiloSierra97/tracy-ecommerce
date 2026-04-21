import WooCommerceService from "@/services/WooCommerceService";
import ProductDetails from "@/components/product/ProductDetails";
import ProductReviewsClient from "@/components/product/ProductReviewsClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanitizeProductDescription } from "@/utils/sanitize";

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
      title: "Producto no encontrado | Tracy Store",
    };
  }

  // Detectar categoría a partir de product.categories, o nombre/descripción
  const categoryNames = product.categories?.map((c) => c.name.toLowerCase()) || [];
  const searchString = (product.name + " " + (product.short_description || "")).toLowerCase();
  
  const isHombreLenceria = categoryNames.some(c => c.includes('hombre') || c.includes('masculin')) || searchString.includes('hombre');
  const isMujerLenceria = categoryNames.some(c => (c.includes('mujer') || c.includes('femenin')) && c.includes('lencer')) || (searchString.includes('mujer') && searchString.includes('lencer'));
  const isMujerRopaInterior = categoryNames.some(c => (c.includes('mujer') || c.includes('femenin')) && c.includes('ropa interior')) || (searchString.includes('mujer') && searchString.includes('ropa interior'));
  const isJunior = categoryNames.some(c => c.includes('junior') || c.includes('infantil') || c.includes('niña')) || /junior|niña|infantil|niñas/i.test(searchString);

  let seoSuffix = "Lencería de Autor & Diseño Colombiano Premium";
  let seoType = "Ropa Interior de Autor";
  let seoKeyword = "ropa interior fina";

  if (isHombreLenceria) {
    seoSuffix = "Lencería Masculina & Diseño Colombiano";
    seoType = "Lencería para Hombre";
    seoKeyword = "lencería masculina";
  } else if (isMujerLenceria) {
    seoSuffix = "Lencería Femenina de Autor & Diseño Colombiano";
    seoType = "Lencería Femenina";
    seoKeyword = "lencería para mujer";
  } else if (isMujerRopaInterior) {
    seoSuffix = "Ropa Interior Femenina & Diseño Colombiano";
    seoType = "Ropa Interior para Mujer";
    seoKeyword = "ropa interior femenina";
  } else if (isJunior) {
    seoSuffix = "Lencería Junior & Diseño Colombiano";
    seoType = "Ropa Interior Junior";
    seoKeyword = "ropa interior para niñas";
  }

  // Usar utilidad de sanitización con longitud máxima, dejando espacio para keywords SEO
  const baseDescription = sanitizeProductDescription(
    product.short_description || product.description,
    120, // Reducir un poco para dar espacio a los sufijos SEO
  );

  const fullDescription = `${baseDescription}. ${seoType} con diseño colombiano premium. Hecho en Colombia con amor por Tracy.`;

  return {
    title: `${product.name} | ${seoSuffix} | Tracy Store`,
    description: fullDescription,
    keywords: [
      "ropa interior de autor",
      "diseño colombiano",
      "ropa interior premium",
      seoKeyword,
      "hecho en colombia",
      product.name.toLowerCase(),
    ],
    alternates: {
      canonical: `https://www.tracystore.com/productos/${slug}`, // Mejora SEO: Evita contenido duplicado
    },
    openGraph: {
      title: `${product.name} - Tracy Store`,
      description: fullDescription,
      images: product.images?.[0]?.src ? [product.images[0].src] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${seoSuffix} | Tracy Store`,
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
      : 0;

  // Crear Schema.org con descripción sanitizada
  const jsonLd: any = {
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
      name: "Tracy",
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
      itemCondition: "https://schema.org/NewCondition", // Mejora SEO: Condición del ítem
      seller: {
        "@type": "Organization",
        name: "Tracy",
      },
    },
  };

  // Mejora SEO (Console): Solo añadir aggregateRating si hay reseñas reales (evita penalizaciones por "fake reviews")
  if (ratingCount > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: parseFloat(ratingValue.toFixed(1)),
      reviewCount: ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

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
