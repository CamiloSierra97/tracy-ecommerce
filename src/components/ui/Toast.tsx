"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Icon from "@/components/ui/Icon";

interface ToastProps {
  message: string | null;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && message && (
        <div className="toast fixed bottom-6 right-6 z-9999 text-left">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="toast__content bg-burgundy border border-golden text-ivory px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[320px]"
          >
            <div className="toast__icon text-gold text-xl">🛍️</div>
            <div className="toast__message-container flex-1">
              <p className="toast__message font-bold text-sm tracking-wide">
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              className="toast__close-btn text-gold/80 hover:text-gold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Icon name="icon-close" size={18} className="toast__close-icon" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
