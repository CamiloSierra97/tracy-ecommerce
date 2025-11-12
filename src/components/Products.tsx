"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import ProductsGrid from "./ProductsGrid";
import ThreeRingLoader from "./ThreeRingLoader";

// 🛑 TS CORRECCIÓN: Definimos las props requeridas para la reutilización.
interface ProductsProps {
  title: string; // Título dinámico para el H1
  basePath: string; // La ruta base para los enlaces de paginación (ej: '/lenceria')
}

// Nota: Asumo que useProducts devuelve la estructura necesaria (pages, totalPages).
export default function Products({ title, basePath }: ProductsProps) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];
  // 🛑 SEO: Extraer totalPages y currentPage para la paginación de fallback.
  const totalPages = data?.pages[0]?.totalPages ?? 1;
  const currentPage = data?.pages.length ?? 1;

  // Carga automática con IntersectionObserver (UX)
  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;
    // ... (lógica del observer)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { rootMargin: "200px" }
    );
    const current = loadMoreRef.current;
    observer.observe(current);
    return () => observer.unobserve(current);
  }, [hasNextPage, fetchNextPage]);

  if (isLoading)
    return (
      <div className="page-products__loader text-center py-10">
        <span>Cargando productos...</span>
        <span>
          <ThreeRingLoader></ThreeRingLoader>
        </span>
      </div>
    );
  if (isError)
    return (
      <div className="page-products__error text-center py-10 text-red-500">
        Error al cargar productos
      </div>
    );

  return (
    <main className="page-products">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="page-products__content min-h-screen bg-gray-50"
      >
        {/* 🛑 OPTIMIZACIÓN SEO 1: H1 DINÁMICO. Único y relevante para la página. */}
        <h1 className="page-products__title text-3xl font-bold text-center py-8">
          {title}
        </h1>

        <ProductsGrid products={allProducts} />

        {/* Loader del Scroll Infinito (UX) */}
        <div
          ref={loadMoreRef}
          className="page-products__loader-wrapper flex justify-center py-8"
        >
          {isFetchingNextPage && (
            <motion.div
              /* ... spinner ... */ className="page-products__loader flex flex-col items-center text-gray-500"
            >
              <motion.div className="page-products__spinner w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
              <span className="page-products__loading-message mt-2 text-sm">
                Cargando más productos...
              </span>
            </motion.div>
          )}
        </div>

        {/* 🛑 OPTIMIZACIÓN SEO 2: FALLBACK DE PAGINACIÓN RASTREABLE 🛑 */}
        {/* Esto garantiza que Googlebot encuentre todas las páginas (e.g., /lenceria?page=2) */}
        {totalPages > 1 && (
          <nav
            aria-label="Paginación de productos"
            className="py-6 flex justify-center space-x-2"
          >
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              const pageLink = `${basePath}?page=${pageNum}`;

              return (
                <Link
                  key={pageNum}
                  href={pageLink}
                  className={`px-4 py-2 border rounded-lg text-sm transition ${
                    pageNum === currentPage
                      ? "bg-burdeos text-marfil font-bold border-burdeos"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </nav>
        )}

        {!hasNextPage && totalPages > 1 && (
          <div className="text-center text-gray-400 text-sm pb-10">
            No hay más productos para mostrar en este listado.
          </div>
        )}
      </motion.div>
    </main>
  );
}
