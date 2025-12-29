import { Metadata } from "next";
import { notFound } from "next/navigation";
import Products from "@/components/product/Products";
import WooCommerceService from "@/services/WooCommerceService";

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

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  // Validar categoría para prevenir que URLs aleatorias carguen esta página, retornar 404 si es inválida
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  // Formatear título para mostrar (e.g., "mujer" -> "Mujer")
  const displayTitle = category.charAt(0).toUpperCase() + category.slice(1);

  // 🛑 Pre-carga SSR: Obtener productos iniciales en el servidor para SEO
  let initialData;
  try {
    initialData = await WooCommerceService.getProducts({
      page: 1,
      per_page: 12,
    });
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
      />
    </main>
  );
}
