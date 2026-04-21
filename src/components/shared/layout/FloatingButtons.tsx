"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Session } from "next-auth";
import Icon from "@/components/shared/ui/Icon";
import WhatsAppMenu from "./WhatsAppMenu";
import dynamic from "next/dynamic";

const PromoModal = dynamic(() => import("./PromoModal"));

export default function FloatingButtons({
  bottomOffset = 0,
  session,
}: {
  bottomOffset?: number;
  session: Session | null;
}) {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // El control del scroll global se delegó al hook `useScrollLock` implementado en otros componentes 
  // No hay necesidad de mutar el `document.body` de manera manual desde aquí.

  return (
    <>
      <div
        className="floating-buttons fixed right-6 bottom-6 z-90 flex flex-col items-end gap-4 pointer-events-none transition-all duration-300 ease-in-out"
        style={{ transform: `translateY(-${bottomOffset}px)` }}
      >
        {/* Capa del Menú de WhatsApp */}
        <div className="floating-buttons__menu-layer pointer-events-auto">
          <AnimatePresence>
            {isWhatsAppOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="origin-bottom-right"
              >
                <WhatsAppMenu onSelect={() => setIsWhatsAppOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Capa de Botones de Acción */}
        <div className="floating-buttons__actions flex flex-col gap-4 pointer-events-auto items-center">
          {/* Botón de Promociones */}
          {!session?.user && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPromoOpen(true)}
              className="floating-buttons__btn floating-buttons__btn--promo sm:size-12 md:size-14 lg:size-16 rounded-full opacity-60 xl:opacity-100 hover:opacity-100 bg-gray text-black flex items-center justify-center shadow-lg relative group transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold"
              aria-label="Promociones y Regalos"
            >
              {/* Indicador de Notificación (Punto rojo) */}
              <span className="absolute top-0 right-0 size-3 md:size-4 font-bold flex items-center justify-center rounded-full border bg-burgundy-light border-burgundy text-burgundy text-[10px] md:text-xs">
                1
              </span>
              <div className="size-6 md:size-8 transition-transform duration-300 group-hover:rotate-15">
                <Icon name="icon-gift-float" className="size-full text-black" />
              </div>
            </motion.button>
          )}

          {/* Botón de WhatsApp */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
            className="floating-buttons__btn floating-buttons__btn--whatsapp sm:size-12 md:size-14 lg:size-16 rounded-full opacity-60 xl:opacity-100 hover:opacity-100 bg-[#25D366] text-ivory flex items-center justify-center shadow-lg transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold"
            aria-label="Contactar por WhatsApp"
          >
            {isWhatsAppOpen ? (
              <Icon name="icon-close" size={32} className="text-white" />
            ) : (
              <div className="size-6 md:size-8 lg:size-10 transition-transform duration-300 group-hover:rotate-15">
                {/* Usando el ID del Sprite actualizado */}
                <Icon
                  name="icon-whatsapp-float"
                  className="size-full text-white"
                />
              </div>
            )}
          </motion.button>

          {/* Botón Scroll Top (Debajo de WhatsApp) */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="floating-buttons__btn floating-buttons__btn--scroll rounded-lg size-8 md:size-10 bg-burgundy text-gold flex items-center justify-center shadow-lg transition-colors border border-burgundy-light/20"
                aria-label="Volver arriba"
              >
                <Icon
                  name="icon-chevron-down"
                  className="rotate-180 size-6 md:size-8"
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal de Promociones (Overlay Global) */}
      <PromoModal isOpen={isPromoOpen} onClose={() => setIsPromoOpen(false)} />
    </>
  );
}
