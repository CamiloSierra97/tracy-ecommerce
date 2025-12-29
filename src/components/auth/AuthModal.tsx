"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div className="auth-modal fixed inset-0 z-200 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="auth-modal__overlay absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="auth-modal__container relative z-10 w-full max-w-md bg-white overflow-hidden shadow-2xl"
        >
          {/* Encabezado */}
          <div className="auth-modal__header flex justify-between items-center p-4 border-b border-gold/20">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("login")}
                className={`auth-modal__tab-btn text-lg font-secondary transition-colors ${
                  activeTab === "login"
                    ? "text-burgundy font-bold border-b-2 border-burgundy"
                    : "text-gray-600 hover:text-burgundy"
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`auth-modal__tab-btn text-lg font-secondary transition-colors ${
                  activeTab === "register"
                    ? "text-burgundy font-bold border-b-2 border-burgundy"
                    : "text-gray-600 hover:text-burgundy"
                }`}
              >
                Registrarse
              </button>
            </div>
            <button
              onClick={onClose}
              className="auth-modal__close-btn text-gray-600 hover:text-burgundy"
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenido */}
          <div className="auth-modal__content p-6">
            {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
