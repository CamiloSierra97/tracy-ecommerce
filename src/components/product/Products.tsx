"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductsGrid from "./ProductsGrid";
import ThreeRingLoader from "@/components/ui/ThreeRingLoader";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { ProductsPage, Category } from "@/services/WooCommerceService";
// import { INFINITE_SCROLL_ROOT_MARGIN } from "@/utils/constants";

// 🛑 TS CORRECCIÓN: Definimos las props requeridas para la reutilización.
interface ProductsProps {
  title: string;
  basePath: string;
  initialData?: ProductsPage;
  headingLevel?: "h1" | "h2"; // Permitir nivel de encabezado dinámico
  categories?: Category[]; // Categorías para filtros
  initialPage?: number; // Página inicial para SSR
  categoryId?: number; // ID de categoría para filtrado
}

export default function Products({
  title,
  basePath,
  initialData,
  headingLevel = "h2", // Por defecto h2
  categories = [], // Por defecto array vacío
  initialPage = 1,
  categoryId,
}: ProductsProps) {
  const searchParams = useSearchParams();
  // Obtener página actual de la URL o usar la prop inicial.
  // Esto asegura que el cliente reaccione a cambios de URL incluso en soft navigation.
  const pageFromUrl = Number(searchParams.get("page")) || initialPage;

  // Construir la estructura de consulta infinita inicial si se proporcionan datos iniciales
  const infiniteInitialData = initialData
    ? {
        pages: [initialData],
        pageParams: [pageFromUrl],
      }
    : undefined;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts({
    initialData: infiniteInitialData,
    page: pageFromUrl,
    categoryId, // Pass categoryId to the hook
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Al usar paginación basada en URL, 'data.pages' solo debería tener 1 página (la actual)
  // gracias a que cambiamos la queryKey en useProducts.
  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];
  const totalPages = data?.pages[0]?.totalPages ?? 1;

  // Calcular página actual
  const currentPage = pageFromUrl;

  // Detectar dirección de cambio de página para animación
  const prevPageRef = useRef(pageFromUrl);
  // eslint-disable-next-line react-hooks/refs
  const direction = pageFromUrl > prevPageRef.current ? 1 : -1;
  const isFirstRender = useRef(true);

  useEffect(() => {
    prevPageRef.current = pageFromUrl;
    // El usuario solicitó eliminar el scroll automático, solo se mantiene la lógica de refs para la dirección de la animación
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [pageFromUrl]);

  // Variantes de animación para slide
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (isLoading)
    return (
      <div className="page-products__status text-center py-10 flex flex-col items-center justify-center gap-3">
        <span>
          <ThreeRingLoader />
        </span>
        <span>Cargando productos...</span>
      </div>
    );
  if (isError)
    return (
      <div className="page-products__status--error text-center py-10 text-red-500">
        Error al cargar productos
      </div>
    );

  const HeadingTag = headingLevel;

  return (
    <article className="page-products" id="products-visual">
      <div className="page-products__content min-h-screen bg-transparent overflow-hidden">
        {/* 🛑 OPTIMIZACIÓN SEO 1: H1 DINÁMICO. Único y relevante para la página. */}
        <div className="page-products__header flex flex-col items-center py-8 px-4">
          <HeadingTag className="page-products__title text-2xl lg:text-4xl font-serif font-semibold lg:font-bold text-burgundy text-center mb-3 tracking-wide drop-shadow-sm">
            {title}
          </HeadingTag>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="page-products__divider w-24 h-1 bg-golden rounded-full origin-center"
          ></motion.div>
        </div>

        <div className="page-products__grid-container relative overflow-hidden min-h-[400px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={pageFromUrl}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full"
            >
              <ProductsGrid products={allProducts} categories={categories} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Loader del Scroll Infinito (UX) - Mantener oculto si infinite scroll está desactivado logicamente */}
        <div
          ref={loadMoreRef}
          className="page-products__infinite-loader-wrapper justify-center py-8 hidden"
        >
          {/* ... */}
        </div>

        {/* 🛑 OPTIMIZACIÓN SEO 2: FALLBACK DE PAGINACIÓN RASTREABLE 🛑 */}
        {totalPages > 1 && (
          <nav
            aria-label="Paginación de productos"
            className="page-products__pagination py-6 flex justify-center space-x-2"
          >
            {[...Array(totalPages)].map((product, index) => {
              const pageNum = index + 1;
              const pageLink = `${basePath}?page=${pageNum}`;
              const isActive = pageNum === currentPage;

              const baseClasses =
                "px-4 py-2 border rounded-lg text-sm transition page-products__pagination-link";

              const stateClasses = isActive
                ? "page-products__pagination-link--active bg-burdeos text-marfil font-bold border-burdeos"
                : "bg-white text-gray-700 hover:bg-gray-100";

              return (
                <Link
                  key={pageNum}
                  href={pageLink}
                  scroll={false} // Evita scroll al top del body
                  className={`${baseClasses} ${stateClasses}`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </nav>
        )}

        {!hasNextPage && totalPages > 1 && (
          <div className="page-products__end-message text-center text-gray-400 text-sm pb-10">
            No hay más productos para mostrar en este listado.
          </div>
        )}
      </div>
    </article>
  );
}
