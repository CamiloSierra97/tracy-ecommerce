"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import WhatsAppMenu from "./WhatsAppMenu";
import PromoModal from "./PromoModal";
import { X } from "lucide-react";

export default function FloatingButtons() {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4 pointer-events-none">
        {/* WhatsApp Menu Layer */}
        <div className="pointer-events-auto">
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

        {/* Buttons Layer */}
        <div className="flex flex-col gap-4 pointer-events-auto items-end">
          {/* Promo Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPromoOpen(true)}
            className="w-14 h-14 rounded-full bg-[#ddd6cd] flex items-center justify-center shadow-lg relative group"
            aria-label="Promociones y Regalos"
          >
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 w-4 h-4 bg-[#e57373] text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
              1
            </span>
            <div className="w-8 h-8 text-white">
              <Icon
                name="gift-float"
                className="w-full h-full text-white fill-white"
              />
            </div>
          </motion.button>

          {/* WhatsApp Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
            className="floating-buttons__btn floating-buttons__btn--whatsapp w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Contactar por WhatsApp"
          >
            {isWhatsAppOpen ? (
              <X size={32} strokeWidth={2.5} />
            ) : (
              <div className="w-10 h-10">
                {/* Using the updated Sprite ID */}
                <Icon
                  name="whatsapp-float"
                  className="w-full h-full text-white fill-current"
                />
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Promo Modal (Global Overlay) */}
      <PromoModal isOpen={isPromoOpen} onClose={() => setIsPromoOpen(false)} />
    </>
  );
}
