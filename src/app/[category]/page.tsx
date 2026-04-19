import Products from "@/components/product/Products";
import WooCommerceService from "@/services/WooCommerceService";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS_PER_PAGE } from "@/utils/constants";

// ISR: revalidar catálogo cada 2 minutos
export const revalidate = 120;

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
      title: "Página no encontrada | Tracy Lencería",
    };
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const isJunior = category === "nina";

  const title = isJunior
    ? `Lencería Junior | Diseño Colombiano Premium para Niñas | Tracy`
    : `${categoryName} | Lencería de Autor & Diseño Colombiano | Tracy`;

  const description = isJunior
    ? `Descubre nuestra exclusiva colección de lencería junior para niñas. Diseño colombiano premium, telas suaves y confort excepcional. Hecho en Colombia por Tracy.`
    : `Explora la colección de lencería de autor y diseño colombiano premium para ${categoryName}. Conjuntos exclusivos, calidad superior y elegancia en cada detalle.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.tracystore.com/${category}`,
    },
    keywords: [
      "lencería de autor",
      "diseño colombiano",
      isJunior ? "lencería junior" : "lencería premium",
      categoryName.toLowerCase(),
      "hecho en colombia",
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
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
