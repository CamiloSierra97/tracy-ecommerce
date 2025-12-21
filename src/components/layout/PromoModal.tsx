"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PromoModal({ isOpen, onClose }: PromoModalProps) {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    sexo: "",
    terms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Promo submission:", formData);
    // TODO: Conectar con la API de marketing para envío del formularioUi
    onClose();
  };

  // Bloquear el scroll del body cuando el modal está abierto para evitar desplazamiento del fondo
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="promo-modal fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Overlay de fondo con desenfoque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="promo-modal__overlay absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Contenedor del Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="promo-modal__container relative z-10 w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="promo-modal__close-btn absolute top-4 right-4 z-20 text-gray-500 hover:text-burgundy p-1 bg-white/50 rounded-full transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>

            {/* Sección de Imagen Promocional */}
            <div className="promo-modal__image-section w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                {/* Texto invisible para lectores de pantalla en lugar de imagen placeholder */}
                <span className="text-gray-400 sr-only">
                  Imagen Promocional
                </span>
                <Image
                  src="/PromoBanner.webp"
                  alt="Imagen Promocional"
                  fill
                  className="promo-modal__image object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Sección del Formulario */}
            <div className="promo-modal__form-section w-full md:w-1/2 p-8 overflow-y-auto flex-1 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="text-center mb-8">
                <h2 className="text-gray-500 uppercase tracking-widest text-sm mb-2">
                  suscríbete y recibe
                </h2>
                <h3 id="modal-title" className="text-3xl font-bold mb-2">
                  15% DE DESCUENTO
                </h3>
                <p className="text-gray-600">en tu primera compra</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombres"
                    required
                    className="w-full p-2 border border-gray-300 focus:outline-none focus:border-burgundy"
                    value={formData.nombres}
                    onChange={(e) =>
                      setFormData({ ...formData, nombres: e.target.value })
                    }
                    aria-label="Nombres"
                  />
                  <input
                    type="text"
                    placeholder="Apellidos"
                    required
                    className="w-full p-2 border border-gray-300 focus:outline-none focus:border-burgundy"
                    value={formData.apellidos}
                    onChange={(e) =>
                      setFormData({ ...formData, apellidos: e.target.value })
                    }
                    aria-label="Apellidos"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Correo electrónico"
                  required
                  className="w-full p-2 border border-gray-300 focus:outline-none focus:border-burgundy"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  aria-label="Correo electrónico"
                />

                <select
                  className="w-full p-2 border border-gray-300 focus:outline-none focus:border-burgundy bg-white"
                  value={formData.sexo}
                  onChange={(e) =>
                    setFormData({ ...formData, sexo: e.target.value })
                  }
                  aria-label="Seleccionar sexo"
                >
                  <option value="" disabled>
                    Sexo
                  </option>
                  <option value="femenino">Femenino</option>
                  <option value="masculino">Masculino</option>
                  <option value="otro">Otro</option>
                </select>

                <div className="flex items-start gap-2 text-xs text-gray-500 mt-4">
                  <input
                    type="checkbox"
                    required
                    id="terms"
                    className="mt-1 accent-burgundy"
                    checked={formData.terms}
                    onChange={(e) =>
                      setFormData({ ...formData, terms: e.target.checked })
                    }
                  />
                  <label htmlFor="terms">
                    Acepto las políticas de privacidad y tratamiento de datos
                    personales del sitio y del Programa de Fidelización.
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="promo-modal__submit-btn w-full border border-black py-3 uppercase tracking-widest hover:bg-burgundy hover:border-burgundy hover:text-white transition-colors text-sm font-medium"
                  >
                    Enviar
                  </button>
                </div>

                <div className="text-center mt-4">
                  <a
                    href="/terminos"
                    className="text-xs text-gray-400 underline hover:text-gray-600"
                  >
                    VER TÉRMINOS Y CONDICIONES
                  </a>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
