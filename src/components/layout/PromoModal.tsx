"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
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

  const [isSexOpen, setIsSexOpen] = useState(false);

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
            className="promo-modal__container relative z-10 w-full max-w-4xl bg-ivory shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="promo-modal__close-btn absolute top-4 right-4 z-20 text-black p-1 bg-burgundy-light/40 rounded-full transition-colors hover:bg-burgundy hover:text-ivory"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>

            {/* Sección de Imagen Promocional */}
            <div className="promo-modal__image-section w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative">
              <div className="promo-modal__image-section-div absolute inset-0 bg-gray-200 flex items-center justify-center">
                {/* Texto invisible para lectores de pantalla en lugar de imagen placeholder */}
                <span className="promo-modal__image-section-span text-gray-400 sr-only">
                  Imagen Promocional
                </span>
                <Image
                  src="/PromoBanner.webp"
                  alt="Imagen Promocional"
                  fill
                  className="promo-modal__image object-cover"
                  unoptimized
                  priority
                />
              </div>
            </div>

            {/* Sección del Formulario */}
            <div className="promo-modal__form-section w-full md:w-1/2 p-8 overflow-y-auto flex-1 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="promo-modal__form-title-div text-center mb-8">
                <h2 className="promo-modal__form-title-text text-gray-500 uppercase tracking-widest text-sm mb-2">
                  suscríbete y recibe
                </h2>
                <h3
                  id="modal-title"
                  className="promo-modal__form-title-text text-3xl font-bold mb-2"
                >
                  15% DE DESCUENTO
                </h3>
                <p className="promo-modal__form-title-text text-gray-600">
                  en tu primera compra
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="promo-modal__form space-y-4"
              >
                <div className="promo-modal__form-inputs grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombres"
                    required
                    className="promo-modal__form-inputs-input input-base"
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
                    className="promo-modal__form-inputs-input input-base"
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
                  className="promo-modal__form-inputs-input input-base"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  aria-label="Correo electrónico"
                />

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSexOpen(!isSexOpen)}
                    className="promo-modal__form-inputs-input w-full p-2 border border-gray-300 bg-ivory text-left flex items-center justify-between focus:outline-none focus:border-burgundy"
                  >
                    <span
                      className={
                        formData.sexo
                          ? "promo-modal__form-inputs-input-span text-black"
                          : "promo-modal__form-inputs-input-span text-burgundy/80"
                      }
                    >
                      {formData.sexo
                        ? formData.sexo.charAt(0).toUpperCase() +
                          formData.sexo.slice(1)
                        : "Sexo"}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`promo-modal__chevron-down text-black transition-transform ${
                        isSexOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isSexOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="promo-modal__options absolute top-full left-0 right-0 mt-1 bg-ivory border border-gray-200 shadow-lg z-50 max-h-48 overflow-y-auto"
                      >
                        {/* Options */}
                        {[
                          { value: "femenino", label: "Femenino" },
                          { value: "masculino", label: "Masculino" },
                          { value: "otro", label: "Otro" },
                        ].map((option) => (
                          <div
                            key={option.value}
                            onClick={() => {
                              setFormData({ ...formData, sexo: option.value });
                              setIsSexOpen(false);
                            }}
                            className={`promo-modal__options-option p-2 cursor-pointer transition-colors hover:bg-burgundy/50 hover:text-white ${
                              formData.sexo === option.value
                                ? "bg-burgundy/20 text-burgundy font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="promo-modal__form-inputs-checkbox flex items-start gap-2 text-xs text-gray-500 mt-4">
                  <input
                    type="checkbox"
                    required
                    id="terms"
                    className="promo-modal__form-inputs-checkbox-input mt-1 accent-burgundy cursor-pointer"
                    checked={formData.terms}
                    onChange={(e) =>
                      setFormData({ ...formData, terms: e.target.checked })
                    }
                  />
                  <label htmlFor="terms">
                    Acepto las políticas de{" "}
                    <span className="text-burgundy hover:text-gold cursor-pointer">
                      privacidad
                    </span>{" "}
                    y{" "}
                    <span className="text-burgundy hover:text-gold cursor-pointer">
                      tratamiento de datos
                    </span>{" "}
                    personales del sitio y del Programa de Fidelización.
                  </label>
                </div>

                <div className="promo-modal__submit-btn-container pt-4">
                  <button
                    type="submit"
                    className="promo-modal__submit-btn w-full border border-black py-3 uppercase tracking-widest hover:bg-burgundy hover:border-burgundy hover:text-ivory transition-colors text-sm font-medium"
                  >
                    Enviar
                  </button>
                </div>

                <div className="promo-modal__conditions text-center mt-4">
                  <a
                    href="/terminos"
                    className="promo-modal__conditions-text text-xs text-black underline hover:text-black/80 transition-colors cursor-pointer"
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
