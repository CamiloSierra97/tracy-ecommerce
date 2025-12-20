"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Icon from "@/components/ui/Icon";

interface ProductGalleryProps {
  images: { id: number; src: string; name: string }[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="product-details__gallery flex flex-col-reverse lg:flex-row gap-6">
      {/* Thumbnails (Desktop: Left, Mobile: Bottom) */}
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

      {/* Main Image */}
      <div className="product-details__main-image-container relative grow bg-gray-50 rounded-2xl overflow-hidden aspect-3/4 lg:h-[700px] shadow-sm border border-gray-100 group">
        <div
          className={`product-details__zoom-area w-full h-full relative cursor-zoom-in ${
            isZoomed ? "cursor-zoom-out" : ""
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <AnimatePresence mode="wait">
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
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className={`product-details__main-image object-cover transition-transform duration-500 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="product-details__zoom-icon absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-burgundy opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <Icon name="icon-zoom" size={20} />
        </div>
      </div>
    </div>
  );
}
