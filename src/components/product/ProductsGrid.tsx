"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Product } from "@/services/WooCommerceService";
import Icon from "@/components/ui/Icon";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import {
  filterAndSortProducts,
  SortOption as ImportedSortOption,
} from "@/utils/productFilters";

import type { Category } from "@/services/WooCommerceService";

// Re-export SortOption for backwards compatibility
export type SortOption = ImportedSortOption;

interface ProductsGridProps {
  products: Product[];
  title?: string;
  categories?: Category[];
}

export default function ProductsGrid({
  products,
  title,
  categories = [],
}: ProductsGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [gridCols, setGridCols] = useState<2 | 4>(4);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  // Usar la utilidad de filtrado y ordenamiento
  const sortedProducts = useMemo(() => {
    return filterAndSortProducts(products, { sortBy, searchTerm });
  }, [products, sortBy, searchTerm]);

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Fecha de Release", value: "date" },
    { label: "Precio: Menor a Mayor", value: "price_asc" },
    { label: "Precio: Mayor a Menor", value: "price_desc" },
  ];

  if (!products.length)
    return (
      <div className="page-products__empty-state text-center py-10 text-gray/60">
        No hay productos disponibles
      </div>
    );

  return (
    <section className="page-products__grid-container p-6 max-w-[1920px] mx-auto">
      {title && (
        <div className="page-products__header flex flex-col items-center mb-6">
          <h2 className="page-products__title text-3xl font-serif font-medium text-burgundy relative inline-block">
            {title}
          </h2>
          <div className="page-products__divider w-24 h-1 bg-linear-to-r from-transparent via-golden to-transparent mt-3 rounded-full opacity-60"></div>
        </div>
      )}

      {/* Barra de herramientas inspirada en imagen de referencia */}
      <div className="page-products__toolbar flex flex-col md:flex-row justify-between items-center border-b border-black pb-4 mb-8 text-sm text-black font-medium relative z-20">
        <div className="page-products__count flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
          <span className="page-products__count-text text-black text-xs tracking-wide">
            {sortedProducts.length} PRODUCTOS
          </span>
        </div>

        <div className="page-products__actions flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
          {/* Selector de Columnas - Oculto en m\u00f3vil */}
          <div className="page-products__layout-switch hidden md:flex items-center gap-2">
            <button
              onClick={() => setGridCols(2)}
              className={`page-products__layout-btn hover:text-burgundy transition-colors ${
                gridCols === 2 ? "text-burgundy font-bold" : ""
              }`}
            >
              2
            </button>
            <span className="page-products__separator text-gray-300">|</span>
            <button
              onClick={() => setGridCols(4)}
              className={`page-products__layout-btn hover:text-burgundy transition-colors ${
                gridCols === 4 ? "text-burgundy font-bold" : ""
              }`}
            >
              4
            </button>
          </div>

          {/* Desplegable de Ordenar */}
          <div className="page-products__sort relative">
            <div
              className="page-products__sort-trigger flex items-center gap-2 cursor-pointer hover:text-burgundy transition-colors group select-none"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <span>
                Ordenar Por{" "}
                {sortOptions
                  .find((o) => o.value === sortBy)
                  ?.label.replace("Fecha de Release", "")}
              </span>
              <Icon
                name="icon-chevron-down"
                size={14}
                className={`group-hover:translate-y-0.5 transition-transform ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Menú Desplegable */}
            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="page-products__sort-menu absolute right-0 top-full mt-2 w-48 bg-ivory shadow-xl border border-gray-100 rounded-lg p-2 z-50 overflow-hidden"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`page-products__sort-item block w-full text-left px-4 py-2 text-sm rounded-md transition-colors hover:cursor-pointer hover:bg-burgundy/5 ${
                        sortBy === option.value
                          ? "bg-burgundy/10 text-burgundy font-bold"
                          : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Botón de Filtro */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`page-products__filter-btn uppercase tracking-wider hover:text-burgundy focus:outline-none rounded-sm px-1 transition-colors font-semibold flex items-center gap-1 ${
              isFilterOpen ? "text-burgundy" : ""
            }`}
          >
            Filtrar
            {isFilterOpen && (
              <span className="page-products__filter-active-dot w-1.5 h-1.5 bg-golden rounded-full inline-block mb-1"></span>
            )}
          </button>
        </div>
      </div>

      {/* Panel de Filtros (Expandible) */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="page-products__filters overflow-hidden mb-8 bg-ivory/50 backdrop-blur-sm border border-gold/10 rounded-xl"
          >
            <div className="page-products__filters-content p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Filtros de Categoría Reales */}
              {categories.length > 0 && (
                <div className="filter-group">
                  <h4 className="filter-group__title font-serif text-burgundy mb-3">
                    Categoría
                  </h4>
                  <ul className="filter-group__list space-y-2 text-sm text-gray-600">
                    {categories
                      .filter((cat) => cat.parent === 0)
                      .map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/tienda/${category.slug}`}
                            className="filter-group__item cursor-pointer hover:text-burgundy transition-colors flex items-center justify-between"
                          >
                            <span>{category.name}</span>
                            <span className="text-xs text-gray-400">
                              ({category.count})
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              <div className="filter-group">
                <h4 className="filter-group__title font-serif text-burgundy mb-3">
                  Talla
                </h4>
                <div className="filter-group__chips flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <span
                      key={size}
                      className="filter-group__chip w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full text-xs cursor-pointer hover:border-burgundy hover:text-burgundy transition-colors"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <h4 className="filter-group__title font-serif text-burgundy mb-3">
                  Color
                </h4>
                <div className="filter-group__colors flex flex-wrap gap-2">
                  {["bg-black", "bg-ivory", "bg-red-700", "bg-stone-200"].map(
                    (color, i) => (
                      <span
                        key={i}
                        className={`filter-group__color-swatch w-6 h-6 rounded-full border border-gray-100 shadow-sm cursor-pointer hover:scale-110 transition-transform ${color}`}
                      ></span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ul
        className={`page-products__list grid gap-6 xl:gap-8 transition-all duration-500 ease-in-out ${
          gridCols === 4
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-2"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
              onOpenQuickView={() => setSelectedProduct(product)}
            />
          ))}
        </AnimatePresence>
      </ul>

      {/* Modal de Vista Rápida */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
