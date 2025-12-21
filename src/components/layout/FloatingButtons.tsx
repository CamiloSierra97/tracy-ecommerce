"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Icon from "@/components/ui/Icon";
import WhatsAppMenu from "./WhatsAppMenu";
import PromoModal from "./PromoModal";

export default function FloatingButtons() {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  // Salvaguarda: Asegurar que el scroll del body se desbloquee al cerrar el menú de WhatsApp
  useEffect(() => {
    if (isWhatsAppOpen) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [isWhatsAppOpen]);

  return (
    <>
      <div className="floating-buttons fixed bottom-6 right-6 z-100 flex flex-col items-end gap-4 pointer-events-none">
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
        <div className="floating-buttons__actions flex flex-col gap-4 pointer-events-auto items-end">
          {/* Botón de Promociones */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPromoOpen(true)}
            className="floating-buttons__btn floating-buttons__btn--promo w-16 h-16 rounded-full opacity-50 md:opacity-100 bg-gray text-black flex items-center justify-center shadow-lg relative group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label="Promociones y Regalos"
          >
            {/* Indicador de Notificación (Punto rojo) */}
            <span className="absolute top-0 right-0 w-4 h-4 font-bold flex items-center justify-center rounded-full border bg-burgundy-light border-burgundy text-burgundy">
              1
            </span>
            <div className="w-8 h-8">
              <Icon
                name="icon-gift-float"
                className="w-full h-full text-black"
              />
            </div>
          </motion.button>

          {/* Botón de WhatsApp */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
            className="floating-buttons__btn floating-buttons__btn--whatsapp w-16 h-16 rounded-full opacity-50 md:opacity-100 bg-[#25D366] text-ivory flex items-center justify-center shadow-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label="Contactar por WhatsApp"
          >
            {isWhatsAppOpen ? (
              <X size={32} strokeWidth={2.5} />
            ) : (
              <div className="w-10 h-10">
                {/* Usando el ID del Sprite actualizado */}
                <Icon
                  name="icon-whatsapp-float"
                  size={40}
                  className="floating-buttons__icon text-white"
                />
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Modal de Promociones (Overlay Global) */}
      <PromoModal isOpen={isPromoOpen} onClose={() => setIsPromoOpen(false)} />
    </>
  );
}
