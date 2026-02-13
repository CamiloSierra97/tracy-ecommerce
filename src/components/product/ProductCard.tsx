"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Product } from "@/services/WooCommerceService";
import { formatPrice } from "@/lib/utils/currency";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onOpenQuickView: () => void;
}

export default function ProductCard({
  product,
  priority = false,
  onOpenQuickView,
}: ProductCardProps) {
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
            <div className="product-card__overlay absolute inset-0 bg-black/5 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
          </Link>

          {/* Botones de Acción Flotantes */}
          <div className="product-card__actions absolute top-4 right-4 flex flex-col gap-2 z-30 pointer-events-none lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 lg:translate-x-4 lg:group-hover:translate-x-0">
            <button
              onClick={(e) => {
                e.preventDefault();
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
                addToCart(product);
              }}
              className="product-card__btn-icon pointer-events-auto glassmorphism text-black p-3 size-10 rounded-full lg:hover:bg-ivory lg:hover:text-burgundy transition-all flex justify-center items-center shadow-sm bg-ivory/80"
              aria-label="Agregar al carrito"
              type="button"
            >
              <Icon name="icon-bag" size={18} />
            </button>
          </div>

          {/* Ver Detalles Button */}
          <Link
            href={`/productos/${product.slug ?? product.id}`}
            className="product-card__action-details absolute bottom-4 left-0 right-0 z-40 px-4 flex justify-center translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
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
                <p className="product-card__price-regular text-sm text-gray-600 line-through">
                  {formatPrice(product.regular_price || product.price)}
                </p>
              )}
            </div>
            {/* Short Description */}
            {product.short_description && (
              <div
                className="product-card__short-desc text-xs text-gray line-clamp-2 mt-2 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}
          </Link>
        </div>
      </motion.div>
    </li>
  );
}
