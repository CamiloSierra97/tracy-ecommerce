"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/Icon";
import Image from "next/image";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  productName: string;
}

export default function Lightbox({
  isOpen,
  onClose,
  imageSrc,
  productName,
}: LightboxProps) {
  const [zoomStyle, setZoomStyle] = useState({ scale: 1, origin: "50% 50%" });
  const boundsRef = useRef<DOMRect | null>(null);

  // Bloquear el scroll cuando está abierto
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

  // Restablecer zoom al abrir y manejar redimensionamiento
  useEffect(() => {
    if (isOpen) {
      setZoomStyle({ scale: 1, origin: "50% 50%" });
    }
    const handleResize = () => {
      boundsRef.current = null;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    boundsRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Confiar en que los límites fueron establecidos en handleMouseEnter - retorno temprano previene recálculo forzado
    if (!boundsRef.current) return;

    const { left, top, width, height } = boundsRef.current;
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle((prev) => ({ ...prev, origin: `${x}% ${y}%` }));
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const delta = -Math.sign(e.deltaY) * 0.5;
    setZoomStyle((prev) => ({
      ...prev,
      scale: Math.min(Math.max(1, prev.scale + delta), 5),
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lightbox fixed inset-0 z-200 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Botón de Cerrar */}
          <button
            onClick={onClose}
            className="lightbox__close-btn absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 transition-colors"
            aria-label="Cerrar zoom"
          >
            <Icon name="icon-close" size={40} />
          </button>

          {/* Superposición de Pista */}
          <div className="lightbox__hint absolute top-6 left-6 text-white/50 text-sm pointer-events-none z-50 font-secondary">
            Mueve el mouse para explorar • Rueda para zoom
          </div>

          {/* Contenedor de Imagen */}
          <div
            className="lightbox__content relative w-full h-full overflow-hidden flex items-center justify-center p-4 cursor-zoom-in"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <motion.div
              className="lightbox__image-wrapper relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
              animate={{
                scale: zoomStyle.scale,
              }}
              style={{
                transformOrigin: zoomStyle.origin,
              }}
              transition={{ type: "tween", ease: "linear", duration: 0.1 }}
            >
              <Image
                src={imageSrc}
                alt={productName}
                fill
                className="object-contain pointer-events-none"
                priority
                sizes="100vw"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
