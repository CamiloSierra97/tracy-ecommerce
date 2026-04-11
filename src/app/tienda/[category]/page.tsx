import WooCommerceService from "@/services/WooCommerceService";
import Products from "@/components/product/Products";
import PageHero from "@/components/ui/PageHero";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS_PER_PAGE } from "@/utils/constants";

// Generación estática de rutas para todas las categorías
export async function generateStaticParams() {
  const categories = await WooCommerceService.getProductCategories();

  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Metadata dinámica para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categories = await WooCommerceService.getProductCategories();
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return {
      title: "Categoría no encontrada | Tracy Lencería",
    };
  }

  return {
    title: `${category.name} | Tracy Lencería - Ropa Interior de Lujo`,
    description:
      category.description ||
      `Explora nuestra exquisita colección de ${category.name}. Lencería colombiana de lujo con diseños exclusivos y materiales premium.`,
    openGraph: {
      title: `${category.name} | Tracy Lencería`,
      description: category.description || `Colección ${category.name}`,
      images: category.image ? [category.image.src] : [],
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category: categorySlug } = await params;
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;

  // Obtener categoría actual
  const categories = await WooCommerceService.getProductCategories();
  const category = categories.find((c) => c.slug === categorySlug);

  // Redirigir a 404 si la categoría no existe
  if (!category) notFound();

  // Obtener productos de esta categoría
  const { products, totalPages } = await WooCommerceService.getProducts({
    category: categorySlug,
    per_page: PRODUCTS_PER_PAGE,
    page,
  });

  return (
    <>
      {/* Hero con imagen de categoría si está disponible */}
      <PageHero
        title={category.name}
        subtitle={category.description}
        image={category.image?.src}
      />

      {/* Grid de productos con SEO breadcrumbs */}
      <Products
        initialData={{ products, totalPages }}
        title={`Productos en ${category.name}`}
        basePath={`/tienda/${categorySlug}`}
        initialPage={page}
      />
    </>
  );
}
