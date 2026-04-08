"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Product } from "@/services/WooCommerceService";
import { formatPrice } from "@/lib/utils/currency";
import { ZOOM_MIN_SCALE, ZOOM_MAX_SCALE, ZOOM_STEP } from "@/utils/constants";
import { sanitizeProductDescription } from "@/utils/sanitize";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const [zoomStyle, setZoomStyle] = useState({ scale: 1, origin: "50% 50%" });
  const { addToCart } = useCart();

  // Cachear límites del elemento para evitar recálculos forzados
  const boundsRef = useRef<DOMRect | null>(null);

  // Invalidar límites al redimensionar ventana
  useEffect(() => {
    const handleResize = () => {
      boundsRef.current = null;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    boundsRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boundsRef.current) return;

    const { left, top, width, height } = boundsRef.current;
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle((prev) => ({ ...prev, origin: `${x}% ${y}%` }));
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const delta = -Math.sign(e.deltaY) * ZOOM_STEP;
    setZoomStyle((prev) => ({
      ...prev,
      scale: Math.min(
        Math.max(ZOOM_MIN_SCALE, prev.scale + delta),
        ZOOM_MAX_SCALE,
      ),
    }));
  };

  const handleMouseLeave = () => {
    setZoomStyle({ scale: 1, origin: "50% 50%" });
    boundsRef.current = null;
  };

  // Bloqueo de scroll cuando el modal está abierto
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

  const cleanDescription = sanitizeProductDescription(
    product.short_description ||
      "Descubre la elegancia y confort de esta pieza exclusiva.",
  );

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

            {/* Lado Izquierdo: Imagen Ampliable */}
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

              {/* Sugerencia de Zoom */}
              <div className="quick-view-modal__zoom-hint absolute bottom-6 left-0 right-0 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="quick-view-modal__zoom-text bg-black/40 text-ivory text-xs px-4 py-2 rounded-full backdrop-blur-sm tracking-wide">
                  Rueda del mouse para zoom
                </span>
              </div>
            </div>

            {/* Lado Derecho: Detalles del Producto */}
            <div className="quick-view-modal__details-section p-8 md:p-12 flex flex-col justify-center bg-ivory">
              <h2
                id="quick-view-title"
                className="quick-view-modal__title text-3xl font-serif text-gray-900 mb-2 leading-tight"
              >
                {product.name}
              </h2>
              <div className="quick-view-modal__divider w-20 h-1 bg-burgundy mb-6 opacity-20"></div>

              <p className="quick-view-modal__price text-3xl font-bold text-burgundy mb-4">
                {formatPrice(product.price)}
              </p>

              {/* Componente de Cuotas (Elegancia Técnica) */}
              <div className="mb-6">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-gray-500 font-light">
                    O 3 cuotas de{" "}
                    <span className="font-medium text-black">
                      {formatPrice(parseFloat(product.price) / 3)}
                    </span>{" "}
                    sin interés con Mercado Pago
                  </p>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[9px] text-gray-400 group-hover:border-black group-hover:text-black transition-colors">
                    i
                  </span>
                </div>
                <p className="text-[9px] text-gray-400 mt-1 italic font-light leading-tight">
                  *Sujeto a aprobación de crédito. Beneficio exclusivo de
                  cortesía.
                </p>
              </div>

              <div className="quick-view-modal__description prose prose-sm text-gray-600 mb-8 line-clamp-3">
                <p>{cleanDescription}</p>
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
