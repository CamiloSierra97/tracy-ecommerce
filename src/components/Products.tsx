"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import ProductsGrid from "./ProductsGrid";

export default function Products() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Carga automática con IntersectionObserver
  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;

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

  const allProducts = data?.pages.flat() ?? [];

  if (isLoading)
    return <div className="text-center py-10">Cargando productos...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error al cargar productos
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gray-50"
    >
      <h1 className="text-2xl font-bold text-center py-8">
        Todos los productos
      </h1>

      <ProductsGrid products={allProducts} />

      {/* Loader automático */}
      <div ref={loadMoreRef} className="flex justify-center py-8">
        {isFetchingNextPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-gray-500"
          >
            <motion.div className="w-8 h-8 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
            <span className="mt-2 text-sm">Cargando más productos...</span>
          </motion.div>
        )}
        {!hasNextPage && (
          <div className="text-gray-400 text-sm">
            No hay más productos para mostrar
          </div>
        )}
      </div>
    </motion.div>
  );
}
