import { Metadata } from "next";
import { notFound } from "next/navigation";
import Products from "@/components/product/Products";
import WooCommerceService from "@/services/WooCommerceService";
import { PRODUCTS_PER_PAGE } from "@/utils/constants";

// Definir las categorías válidas para coincidir con los enlaces estáticos
const VALID_CATEGORIES = ["mujer", "hombre", "nina", "promociones"];

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Generar metadatos dinámicos para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category)) {
    return {
      title: "Página no encontrada",
    };
  }

  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${title} - Tracy E-commerce`,
    description: `Explora nuestra colección exclusiva de lencería y ropa interior para ${category}.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;

  // Validar categoría para prevenir que URLs aleatorias carguen esta página, retornar 404 si es inválida
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  // Formatear título para mostrar (e.g., "mujer" -> "Mujer")
  const displayTitle = category.charAt(0).toUpperCase() + category.slice(1);

  // 🛑 Pre-carga SSR: Obtener productos iniciales en el servidor para SEO
  // Primero necesitamos el ID de la categoría, ya que la API de productos filtra por ID, no por slug
  let initialData;
  let categoryId: number | null = null;

  try {
    categoryId = await WooCommerceService.getCategoryIdBySlug(category);

    if (categoryId) {
      initialData = await WooCommerceService.getProducts({
        page,
        per_page: PRODUCTS_PER_PAGE,
        category: String(categoryId), // Pasar ID convertido a string
      });
    } else {
      console.warn(`Category ID not found for slug: ${category}`);
      // Fallback: load w/o category or handle blank
    }
  } catch (error) {
    console.error("Failed to prefetch products:", error);
    // No bloqueamos la página, solo dejamos que el cliente intente obtener (o mostrar estado de error)
  }

  return (
    <main className="main-category">
      <Products
        title={displayTitle}
        basePath={`/${category}`}
        initialData={initialData}
        initialPage={page}
        categoryId={categoryId ?? undefined}
        // Pasamos props adicionales si Products necesita saber el ID para filtros futuros,
        // aunque por ahora Products usa initialData
      />
    </main>
  );
}
