"use client";

import Link from "next/link";
import ProductsGrid from "./ProductsGrid";
import ThreeRingLoader from "@/components/ui/ThreeRingLoader";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { ProductsPage, Category } from "@/services/WooCommerceService";
import { INFINITE_SCROLL_ROOT_MARGIN } from "@/utils/constants";

// 🛑 TS CORRECCIÓN: Definimos las props requeridas para la reutilización.
interface ProductsProps {
  title: string;
  basePath: string;
  initialData?: ProductsPage;
  headingLevel?: "h1" | "h2"; // Permitir nivel de encabezado dinámico
  categories?: Category[]; // Categorías para filtros
}

// Nota: Asumo que useProducts devuelve la estructura necesaria (pages, totalPages).
export default function Products({
  title,
  basePath,
  initialData,
  headingLevel = "h2", // Por defecto h2
  categories = [], // Por defecto array vacío
}: ProductsProps) {
  // Construir la estructura de consulta infinita inicial si se proporcionan datos iniciales
  const infiniteInitialData = initialData
    ? {
        pages: [initialData],
        pageParams: [1],
      }
    : undefined;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts({ initialData: infiniteInitialData });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];
  // 🛑 SEO: Extraer totalPages y currentPage para la paginación de fallback.
  const totalPages = data?.pages[0]?.totalPages ?? 1;
  const currentPage = data?.pages.length ?? 1;

  // Carga automática con IntersectionObserver (UX)
  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { rootMargin: INFINITE_SCROLL_ROOT_MARGIN },
    );
    const current = loadMoreRef.current;
    observer.observe(current);
    return () => observer.unobserve(current);
  }, [hasNextPage, fetchNextPage]);

  if (isLoading)
    return (
      <div className="page-products__status text-center py-10 flex flex-col items-center justify-center gap-3">
        <span>
          <ThreeRingLoader></ThreeRingLoader>
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="page-products__content min-h-screen bg-transparent"
      >
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

        <div className="page-products__grid-container">
          <ProductsGrid products={allProducts} categories={categories} />
        </div>

        {/* Loader del Scroll Infinito (UX) */}
        <div
          ref={loadMoreRef}
          className="page-products__infinite-loader-wrapper flex justify-center py-8"
        >
          {isFetchingNextPage && (
            <motion.div className="page-products__infinite-loader flex flex-col items-center text-gray-500">
              <motion.div className="page-products__spinner size-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
              <span className="page-products__loading-text mt-2 text-sm">
                Cargando más productos...
              </span>
            </motion.div>
          )}
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
      </motion.div>
    </article>
  );
}
