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
import DOMPurify from "isomorphic-dompurify";

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

  // 🌟 Lógica de Filtrado y Ordenamiento del Cliente
  const sortedProducts = useMemo(() => {
    let items = [...products];

    // 1. Filtrar por Término de Búsqueda
    if (searchTerm) {
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          (p.short_description &&
            p.short_description.toLowerCase().includes(searchTerm))
      );
    }

    // 2. Ordenar
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
              {/* Filtros de Marcador de Posición */}
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
                  {["bg-black", "bg-ivory", "bg-red-700", "bg-stone-200"].map(
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

      {/* Modal de Vista Rápida */}
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="product-card__content h-full flex flex-col relative"
      >
        {/* Área de Imagen e Interacción */}
        <div className="product-card__image-container relative aspect-3/4 overflow-hidden rounded-3xl shadow-sm transition-all duration-500 ease-out lg:group-hover:shadow-premium lg:group-hover:border-gold border border-transparent lg:group-hover:scale-[1.02] transform">
          <Link
            href={`/productos/${product.slug ?? product.id}`}
            className="product-card__main-link block size-full relative z-10"
          >
            {/* Skeleton Loader */}
            {isImageLoading && (
              <div className="product-card__skeleton absolute inset-0 z-10 bg-gray-200 animate-pulse" />
            )}

            {/* Imagen Principal */}
            <Image
              src={product.images?.[0]?.src ?? "/placeholder.png"}
              alt={product.name}
              width={500}
              height={667}
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onLoad={() => setIsImageLoading(false)}
              className={`product-card__image size-full object-cover transition-all duration-700 ease-out ${
                isImageLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            />

            {/* Imagen Secundaria (Efecto Hover) */}
            {product.images?.[1] && (
              <Image
                src={product.images[1].src}
                alt={`${product.name} - Vista alternativa`}
                width={500}
                height={667}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="product-card__image-hover absolute inset-0 size-full object-cover opacity-0 lg:group-hover:opacity-100 transition-all duration-500 ease-in-out z-10 pointer-events-none"
              />
            )}

            {/* Superposición Oscura al Hover */}
            <div className="product-card__overlay absolute inset-0 bg-black/5 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-10" />
          </Link>

          {/* Botones de Acción Flotantes - Fuera del Link principal para evitar conflictos de navegación */}
          <div className="product-card__actions absolute top-4 right-4 flex flex-col gap-2 z-30 pointer-events-none lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 lg:translate-x-4 lg:group-hover:translate-x-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenQuickView();
              }}
              className="product-card__btn-icon pointer-events-auto glassmorphism text-black p-3 size-10 rounded-full lg:hover:bg-ivory lg:hover:text-burgundy transition-all flex justify-center items-center shadow-sm bg-ivory/80"
              aria-label="Vista rápida"
              type="button"
            >
              <Icon name="icon-zoom" size={18} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="product-card__btn-icon pointer-events-auto glassmorphism text-black p-3 size-10 rounded-full lg:hover:bg-ivory lg:hover:text-burgundy transition-all flex justify-center items-center shadow-sm bg-ivory/80"
              aria-label="Agregar al carrito"
              type="button"
            >
              <Icon name="icon-bag" size={18} />
            </button>
          </div>

          {/* Ver Detalles Button - Enlace Independiente Superpuesto */}
          <Link
            href={`/productos/${product.slug ?? product.id}`}
            className="product-card__action-details absolute bottom-4 left-0 right-0 z-20 px-4 flex justify-center translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300"
          >
            <span className="product-card__btn-text w-2/3 text-[rgba(0,0,0,0.8)] font-medium py-2 px-3 md:py-3 md:px-4 rounded-md shadow-lg text-center text-sm transform active:scale-95 lg:hover:scale-105 lg:hover:text-[rgba(0,0,0,1)] lg:hover:border lg:hover:border-[rgba(0,0,0,1)] lg:hover:backdrop-blur-md transition-all">
              Ver Detalles
            </span>
          </Link>
        </div>

        <div className="product-card__info mt-5 px-2 space-y-2">
          <Link
            href={`/productos/${product.slug ?? product.id}`}
            className="product-card__title-link block lg:group-hover:text-burgundy transition-colors"
          >
            <h3 className="product-card__title text-lg font-serif text-gray-900 leading-tight">
              {product.name}
            </h3>
            <div className="product-card__price-wrapper flex items-baseline gap-2 mt-1">
              <p className="product-card__price text-lg font-bold text-gray-900">
                {product.sale_price
                  ? formatPrice(product.sale_price)
                  : formatPrice(product.price)}
              </p>
              {product.sale_price && (
                <p className="product-card__price-regular text-sm text-gray-400 line-through">
                  {formatPrice(product.regular_price || product.price)}
                </p>
              )}
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

  // Inicio de Optimización: Cachear límites del elemento para evitar recálculos forzados en cada movimiento del mouse
  const boundsRef = useRef<DOMRect | null>(null);

  // Invalidar límites al redimensionar ventana para asegurar precisión
  useEffect(() => {
    const handleResize = () => {
      boundsRef.current = null;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    // LECTURA: Medir diseño una vez al entrar
    boundsRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Confiar en que los límites fueron establecidos en handleMouseEnter - retorno temprano previene recálculo forzado
    if (!boundsRef.current) return;

    const { left, top, width, height } = boundsRef.current;
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // ESCRITURA: Actualizar estado (dispara render/cambio de estilo)
    setZoomStyle((prev) => ({ ...prev, origin: `${x}% ${y}%` }));
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Prevenir scroll del fondo
    // Nota: Esto funciona porque React onWheel no es pasivo por defecto,
    // o confiamos en el bloqueo del body. Pero preventDefault explícito ayuda.
    // Sin embargo, eventos React podrían lanzar advertencia si intentamos preventDefault en un evento pasivo.
    // Idealmente, body style overflow='hidden' maneja esto, pero algunos navegadores propagan.

    // En realidad, detener la propagación es usualmente suficiente si el body está oculto.
    e.stopPropagation();
    // e.preventDefault(); // El wrapper de eventos sintéticos de React podría no soportar esto para wheel dependiendo de la versión de React/navegador.

    const delta = -Math.sign(e.deltaY) * 0.5; // Paso de zoom
    setZoomStyle((prev) => ({
      ...prev,
      scale: Math.min(Math.max(1, prev.scale + delta), 5), // Limitar entre 1x y 5x
    }));
  };

  const handleMouseLeave = () => {
    setZoomStyle({ scale: 1, origin: "50% 50%" });
    boundsRef.current = null; // Limpiar caché
  };

  // Correcci\u00f3n de bloqueo de scroll
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
      document.documentElement.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="quick-view-modal fixed inset-0 z-200 flex items-center justify-center p-4 overscroll-contain">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="quick-view-modal__overlay absolute inset-0 glassmorphism"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="quick-view-modal__container relative rounded-3xl shadow-premium w-full max-w-5xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="quick-view-modal__close-btn absolute top-4 right-4 z-50 bg-ivory text-black rounded-full p-2 transition-all shadow-sm hover:shadow-md"
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
                className="quick-view-modal__zoom-content size-full flex items-center justify-center p-4"
                style={{
                  transformOrigin: zoomStyle.origin,
                }}
                animate={{ scale: zoomStyle.scale }}
                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
              >
                <div className="quick-view-modal__image-wrapper relative size-full">
                  <Image
                    src={product.images?.[0]?.src ?? "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="quick-view-modal__image object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </motion.div>

              {/* Zoom Hint Overlay */}
              <div className="quick-view-modal__zoom-hint absolute bottom-6 left-0 right-0 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="quick-view-modal__zoom-text bg-black/40 text-ivory text-xs px-4 py-2 rounded-full backdrop-blur-sm tracking-wide">
                  Rueda del mouse para zoom
                </span>
              </div>
            </div>

            {/* Right Side: Product Details */}
            <div className="quick-view-modal__details-section p-8 md:p-12 flex flex-col justify-center bg-ivory">
              <h2
                id="quick-view-title"
                className="quick-view-modal__title text-3xl font-serif text-gray-900 mb-2 leading-tight"
              >
                {product.name}
              </h2>
              <div className="quick-view-modal__divider w-20 h-1 bg-burgundy mb-6 opacity-20"></div>

              <p className="quick-view-modal__price text-3xl font-bold text-burgundy mb-6">
                {formatPrice(product.price)}
              </p>

              <div className="quick-view-modal__description prose prose-sm text-gray-600 mb-8 line-clamp-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      product.short_description ||
                        "Descubre la elegancia y confort de esta pieza exclusiva."
                    ),
                  }}
                />
              </div>

              <div className="quick-view-modal__actions flex flex-col gap-4 mt-auto">
                <button
                  onClick={() => addToCart(product)}
                  className="quick-view-modal__add-btn w-full bg-burgundy text-ivory py-4 rounded-xl font-bold tracking-wide hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-burgundy/20 hover:scale-[1.01] active:scale-[0.98]"
                >
                  <Icon name="icon-bag" size={22} />
                  AGREGAR AL CARRITO
                </button>
                <Link
                  href={`/productos/${product.slug ?? product.id}`}
                  className="quick-view-modal__details-btn w-full py-4 border border-black rounded-xl hover:border-burgundy/30 transition-all text-black font-medium text-center uppercase tracking-wider text-sm hover:text-burgundy"
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
