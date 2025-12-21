"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
    // TODO: Connect to marketing API
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="promo-modal fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="promo-modal__overlay absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-500 hover:text-black p-1 bg-white/50 rounded-full"
          >
            <X size={24} />
          </button>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative">
            {/* Using a placeholder or one of the existing images */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              {/* TODO: Replace with specific promo image */}
              <span className="text-gray-400">Promo Image</span>
              <img
                src="/WhatsApp Image 2025-12-19 at 9.09.47 AM.jpeg"
                alt="Promo"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <div className="text-center mb-8">
              <h2 className="text-gray-500 uppercase tracking-widest text-sm mb-2">
                suscríbete y recibe
              </h2>
              <h3 className="text-3xl font-bold mb-2">15% DE DESCUENTO</h3>
              <p className="text-gray-600">en tu primera compra</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombres"
                  required
                  className="w-full p-2 border border-gray-300 focus:outline-none focus:border-black"
                  value={formData.nombres}
                  onChange={(e) =>
                    setFormData({ ...formData, nombres: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Apellidos"
                  required
                  className="w-full p-2 border border-gray-300 focus:outline-none focus:border-black"
                  value={formData.apellidos}
                  onChange={(e) =>
                    setFormData({ ...formData, apellidos: e.target.value })
                  }
                />
              </div>

              <input
                type="email"
                placeholder="Correo electrónico"
                required
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-black"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <select
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-black bg-white"
                value={formData.sexo}
                onChange={(e) =>
                  setFormData({ ...formData, sexo: e.target.value })
                }
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
                  className="mt-1"
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
                  className="promo-modal__submit-btn w-full border border-black py-3 uppercase tracking-widest hover:bg-black hover:text-white transition-colors text-sm font-medium"
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
    </AnimatePresence>
  );
}
