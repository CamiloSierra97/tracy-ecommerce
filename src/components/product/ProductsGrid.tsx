"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Product } from "@/services/WooCommerceService";
import { formatPrice } from "@/lib/utils/currency";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

interface ProductsGridProps {
  products: Product[];
  title?: string;
}

type SortOption = "date" | "price_asc" | "price_desc";

export default function ProductsGrid({ products, title }: ProductsGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [gridCols, setGridCols] = useState<2 | 4>(4);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  // 🌟 Client-Side Filtering & Sorting Logic
  const sortedProducts = useMemo(() => {
    let items = [...products];

    // 1. Filter by Search Term
    if (searchTerm) {
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          (p.short_description &&
            p.short_description.toLowerCase().includes(searchTerm))
      );
    }

    // 2. Sort
    if (sortBy === "price_asc") {
      return items.sort(
        (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
      );
    } else if (sortBy === "price_desc") {
      return items.sort(
        (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
      );
    }

    return items;
  }, [products, sortBy, searchTerm]);

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Fecha de Release", value: "date" },
    { label: "Precio: Menor a Mayor", value: "price_asc" },
    { label: "Precio: Mayor a Menor", value: "price_desc" },
  ];

  if (!products.length)
    return (
      <div className="products-grid text-center py-10 text-tracy-gris-humo/60">
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

      {/* Toolbar inspired by reference image */}
      <div className="page-products__toolbar flex flex-col md:flex-row justify-between items-center border-b border-black pb-4 mb-8 text-sm text-black font-medium relative z-20">
        <div className="page-products__count flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
          <span className="text-black text-xs tracking-wide">
            {sortedProducts.length} PRODUCTOS
          </span>
        </div>

        <div className="page-products__actions flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
          {/* Column Switcher */}
          <div className="page-products__layout-switch flex items-center gap-2">
            <button
              onClick={() => setGridCols(2)}
              className={`page-products__layout-btn hover:text-burgundy hover:cursor-pointer transition-colors ${
                gridCols === 2 ? "text-burgundy font-bold" : ""
              }`}
            >
              2
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setGridCols(4)}
              className={`page-products__layout-btn hover:text-burgundy hover:cursor-pointer transition-colors ${
                gridCols === 4 ? "text-burgundy font-bold" : ""
              }`}
            >
              4
            </button>
          </div>

          {/* Sort Dropdown */}
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

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="page-products__sort-menu absolute right-0 top-full mt-2 w-48 bg-white shadow-xl border border-gray-100 rounded-lg p-2 z-50 overflow-hidden"
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

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`page-products__filter-btn uppercase tracking-wider hover:text-burgundy focus:ring-2 focus:ring-burgundy/50 focus:outline-none rounded-sm px-1 hover:cursor-pointer transition-colors font-semibold flex items-center gap-1 ${
              isFilterOpen ? "text-burgundy" : ""
            }`}
          >
            Filtrar
            {isFilterOpen && (
              <span className="w-1.5 h-1.5 bg-golden rounded-full inline-block mb-1"></span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Panel (Expandable) */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="page-products__filters overflow-hidden mb-8 bg-white/50 backdrop-blur-sm border border-gold/10 rounded-xl"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Placeholder Filters */}
              <div className="filter-group">
                <h4 className="filter-group__title font-serif text-burgundy mb-3">
                  Categoría
                </h4>
                <ul className="filter-group__list space-y-2 text-sm text-gray-600">
                  <li className="filter-group__item cursor-pointer hover:text-burgundy transition-colors">
                    Brasieres
                  </li>
                  <li className="filter-group__item cursor-pointer hover:text-burgundy transition-colors">
                    Panties
                  </li>
                  <li className="filter-group__item cursor-pointer hover:text-burgundy transition-colors">
                    Sets Completos
                  </li>
                </ul>
              </div>
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
                  {["bg-black", "bg-white", "bg-red-700", "bg-stone-200"].map(
                    (color, i) => (
                      <span
                        key={i}
                        className={`filter-group__color-swatch w-6 h-6 rounded-full border border-gray-100 shadow-sm cursor-pointer hover:scale-110 transition-transform ${color}`}
                      ></span>
                    )
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

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}

function ProductCard({
  product,
  priority = false,
  onOpenQuickView,
}: {
  product: Product;
  priority?: boolean;
  onOpenQuickView: () => void;
}) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { addToCart } = useCart();

  return (
    <li className="product-card group relative">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="h-full flex flex-col relative"
      >
        {/* Image Area */}
        <div className="product-card__image-container relative aspect-3/4 overflow-hidden rounded-3xl bg-gray-100 shadow-sm transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:border-golden/30 border border-transparent group-hover:scale-[1.02] transform">
          <Link
            href={`/productos/${product.slug ?? product.id}`}
            className="block w-full h-full relative"
          >
            {/* Skeleton Loader */}
            {isImageLoading && (
              <div className="product-card__skeleton absolute inset-0 z-10 bg-gray-200 animate-pulse" />
            )}
            {/* Main Image */}
            <Image
              src={product.images?.[0]?.src ?? "/placeholder.png"}
              alt={product.name}
              width={500}
              height={667}
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onLoad={() => setIsImageLoading(false)}
              className={`product-card__image w-full h-full object-cover transform transition-transform duration-700 ease-out ${
                isImageLoading ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Secondary Image (Hover Effect) */}
            {product.images?.[1] && (
              <Image
                src={product.images[1].src}
                alt={`${product.name} - Vista alternativa`}
                width={500}
                height={667}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="product-card__image-hover absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-10"
              />
            )}

            {/* Dark Overlay on Hover */}
            <div className="product-card__overlay absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          </Link>

          {/* Hover Zoom Button - Top Left Corner */}
          <div className="product-card__action-zoom absolute top-4 left-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 z-30">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenQuickView();
              }}
              className="product-card__btn-icon cursor-pointer backdrop-blur-sm text-[rgba(0,0,0,0.8)] p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:text-[rgba(0,0,0,1)] duration-300 hover:scale-105 hover:border-[rgba(0,0,0,1)] hover:border transition flex justify-center items-center"
              aria-label="Vista rápida"
              type="button"
            >
              <Icon name="icon-zoom" size={20} />
            </button>
          </div>

          {/* Hover Add to Cart Button - Top Right Corner */}
          <div className="product-card__action-cart absolute top-4 right-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 z-30 delay-75">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="product-card__btn-icon cursor-pointer backdrop-blur-sm text-black p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:text-[rgba(0,0,0,1)] hover:scale-105 hover:border-[rgba(0,0,0,1)] hover:border duration-300 transition flex justify-center items-center"
              aria-label="Agregar al carrito"
              type="button"
            >
              <Icon name="icon-bag" size={20} />
            </button>
          </div>

          {/* Ver Detalles Button - Bottom */}
          <Link
            href={`/productos/${product.slug ?? product.id}`}
            className="product-card__action-details absolute bottom-4 left-0 right-0 z-20 pointer-events-none px-4"
          >
            <div className="flex justify-center opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
              <span className="product-card__btn-text w-3/4 backdrop-blur-sm text-[rgba(0,0,0,0.8)] font-medium py-3 px-6 rounded-xl  shadow-lg text-center text-sm transform active:scale-95 hover:scale-105 hover:text-[rgba(0,0,0,1)] hover:border hover:border-[rgba(0,0,0,1)] transition-all">
                Ver Detalles
              </span>
            </div>
          </Link>
        </div>

        {/* Product Info */}
        <div className="product-card__info mt-4 px-1 space-y-1">
          <Link
            href={`/productos/${product.slug ?? product.id}`}
            className="block"
          >
            <h3 className="product-card__title text-base font-serif font-medium text-gray-900 leading-snug group-hover:text-burgundy transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="product-card__price text-lg font-bold text-burgundy tracking-wide">
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        </div>
      </motion.div>
    </li>
  );
}

function QuickViewModal({
  product,
  isOpen,
  onClose,
}: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [zoomStyle, setZoomStyle] = useState({ scale: 1, origin: "50% 50%" });
  const { addToCart } = useCart();

  // Start of Optimization: Cache element bounds to avoid forced reflows on every mouse move
  const boundsRef = useRef<DOMRect | null>(null);

  // Invalidate bounds on window resize to ensure accuracy
  useEffect(() => {
    const handleResize = () => {
      boundsRef.current = null;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    // READ: Measure layout once when entering
    boundsRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Fallback: If for some reason bounds are missing, read them (rare case)
    if (!boundsRef.current) {
      boundsRef.current = e.currentTarget.getBoundingClientRect();
    }

    const { left, top, width, height } = boundsRef.current;
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // WRITE: Update state (triggers render/style change)
    setZoomStyle((prev) => ({ ...prev, origin: `${x}% ${y}%` }));
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Prevent background scrolling
    // Note: This works because React onWheel is not passive by default,
    // or we rely on the body lock. But explicit preventDefault helps.
    // However, React events might raise a warning if we try to preventDefault on a passive event.
    // Ideally, body style overflow='hidden' handles this, but some browsers propagate.

    // Actually, just stopping propagation is often enough if body is hidden.
    e.stopPropagation();
    // e.preventDefault(); // React synthetic event wrapper might not support this for wheel depending on React version/browser.

    const delta = -Math.sign(e.deltaY) * 0.5; // Zoom step
    setZoomStyle((prev) => ({
      ...prev,
      scale: Math.min(Math.max(1, prev.scale + delta), 5), // Clamp between 1x and 5x
    }));
  };

  const handleMouseLeave = () => {
    setZoomStyle({ scale: 1, origin: "50% 50%" });
    boundsRef.current = null; // Clear cache
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="quick-view-modal fixed inset-0 z-50 flex items-center justify-center p-4 overscroll-contain">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="quick-view-modal__overlay absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="quick-view-modal__container relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="quick-view-modal__close-btn absolute top-4 right-4 z-50 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-all shadow-sm hover:shadow-md"
              aria-label="Cerrar"
            >
              <Icon name="icon-close" size={24} />
            </button>

            {/* Left Side: Zoomable Image */}
            <div
              className="quick-view-modal__image-section relative h-[400px] md:h-full overflow-hidden bg-gray-50 cursor-zoom-in group"
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onWheel={handleWheel}
            >
              <motion.div
                className="w-full h-full flex items-center justify-center p-4"
                style={{
                  transformOrigin: zoomStyle.origin,
                }}
                animate={{ scale: zoomStyle.scale }}
                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={product.images?.[0]?.src ?? "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </motion.div>

              {/* Zoom Hint Overlay */}
              <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-black/40 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm tracking-wide">
                  Rueda del mouse para zoom
                </span>
              </div>
            </div>

            {/* Right Side: Product Details */}
            <div className="quick-view-modal__details-section p-8 md:p-12 flex flex-col justify-center bg-white">
              <h2 className="quick-view-modal__title text-3xl font-serif text-gray-900 mb-2 leading-tight">
                {product.name}
              </h2>
              <div className="w-20 h-1 bg-tracy-burdeos mb-6 opacity-20"></div>

              <p className="text-3xl font-bold text-burgundy mb-6">
                {formatPrice(product.price)}
              </p>

              <div className="quick-view-modal__description prose prose-sm text-gray-600 mb-8 line-clamp-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      product.short_description ||
                      "Descubre la elegancia y confort de esta pieza exclusiva.",
                  }}
                />
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-tracy-burdeos text-white py-4 rounded-xl font-bold tracking-wide hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-tracy-burdeos/20 hover:scale-[1.01] active:scale-[0.98]"
                >
                  <Icon name="icon-bag" size={22} />
                  AGREGAR AL CARRITO
                </button>
                <Link
                  href={`/productos/${product.slug ?? product.id}`}
                  className="w-full py-4 border border-gray-200 rounded-xl hover:border-tracy-burdeos/30 transition-all text-gray-600 font-medium text-center uppercase tracking-wider text-sm hover:text-burgundy"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
