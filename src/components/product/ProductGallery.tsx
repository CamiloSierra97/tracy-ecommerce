"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import Lightbox from "@/components/ui/Lightbox";

interface ProductGalleryProps {
  images: { id: number; src: string; name: string }[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <div
        role="region"
        aria-label="Galería del producto"
        className="product-details__gallery flex flex-col-reverse lg:flex-row gap-6"
      >
        {/* Miniaturas (Escritorio: Izquierda, Móvil: Abajo) */}
        {images.length > 1 && (
          <div className="product-details__thumbnails flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[700px] scrollbar-hide py-2 lg:py-0">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedImageIndex(idx)}
                className={`product-details__thumbnail-btn relative w-20 h-24 lg:w-24 lg:h-32 shrink-0 border-2 transition-all rounded-lg overflow-hidden ${
                  selectedImageIndex === idx
                    ? "border-burgundy opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.name}
                  fill
                  sizes="20vw"
                  className="product-details__thumbnail-image object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Imagen Principal */}
        <div
          className="product-details__main-image-container relative grow bg-gray-50 rounded-2xl overflow-hidden aspect-3/4 lg:h-[700px] shadow-sm border border-gray-100 group cursor-zoom-in"
          onClick={() => setIsLightboxOpen(true)}
        >
          {/* Imagen inicial: renderizada directamente para LCP (descubrible en HTML) */}
          {selectedImageIndex === 0 && (
            <Image
              src={images[0].src}
              alt={productName}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="product-details__main-image object-cover"
            />
          )}

          {/* Imágenes subsiguientes: con animación de transición */}
          <AnimatePresence mode="wait">
            {selectedImageIndex !== 0 && (
              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={images[selectedImageIndex].src}
                  alt={productName}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="product-details__main-image object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ícono de Zoom (Arriba Derecha) */}
          <div className="product-details__zoom-icon absolute top-4 right-4 bg-transparent p-3 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto hover:cursor-pointer hover:scale-110">
            <Icon name="icon-zoom" size={24} />
          </div>
        </div>
      </div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageSrc={images[selectedImageIndex].src}
        productName={productName}
      />
    </>
  );
}
