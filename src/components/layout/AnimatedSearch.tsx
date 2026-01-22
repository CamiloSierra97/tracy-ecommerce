"use client";

import Icon from "@/components/ui/Icon";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Mock de sugerencias para demostración
const SUGGESTIONS = [
  "Lencería",
  "Batas de Seda",
  "Pijamas",
  "Ropa Interior Hombre",
  "Colección Novias",
  "Accesorios",
];

export default function AnimatedSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Clases condicionales: Solo mostrar borde inferior al pasar el mouse cuando la búsqueda está cerrada
  const containerClasses = isSearchOpen
    ? "text-gold"
    : "text-gold border-b border-b-transparent hover:text-light-gold hover:border-b-light-gold";

  const handleSearch = (term: string) => {
    const query = term || searchTerm;
    if (!query.trim()) return;

    router.push(`/?search=${encodeURIComponent(query)}`);
    // Opcional: cerrar al buscar
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  return (
    <div
      role="search"
      className={`animated-search search-bar relative flex items-center h-full transition-colors duration-300 ${containerClasses}`}
    >
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-50 will-change-[width,opacity]"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-ivory border border-gold text-sm text-burgundy placeholder-burgundy/50 focus:outline-none focus:border-gold font-serif pl-4 pr-10 h-10 rounded-t-sm shadow-premium"
                aria-label="Buscar productos"
                autoFocus
                // Quitamos onBlur para manejar el cierre con un backdrop o botón explícito
              />

              {/* SUGGESTIONS DROPDOWN */}
              {searchTerm.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-0 w-full bg-ivory border-x border-b border-gold shadow-premium rounded-b-sm overflow-hidden"
                >
                  <div className="p-3">
                    <p className="text-xs font-bold text-burgundy/70 tracking-widest mb-2 px-2 uppercase">
                      Sugerencias
                    </p>
                    <ul className="flex flex-col">
                      {SUGGESTIONS.filter((item) =>
                        item.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((item, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleSearch(item)}
                            className="w-full text-left px-2 py-2 text-sm text-burgundy hover:bg-gold/10 transition-colors font-serif"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                      {SUGGESTIONS.filter((item) =>
                        item.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length === 0 && (
                        <li className="px-2 py-2 text-sm text-burgundy/50 italic">
                          No hay sugerencias
                        </li>
                      )}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* FONDO INVISIBLE para cerrar al hacer clic fuera */}
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchTerm("");
              }}
            />
          </>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          if (isSearchOpen) {
            setIsSearchOpen(false);
            setSearchTerm("");
          } else {
            setIsSearchOpen(true);
            // Lógica de enfoque manejada por la prop autoFocus, pero el respaldo se basa en ref si es necesario
          }
        }}
        onMouseDown={(e) => {
          // Prevenir pérdida de enfoque en el input al hacer clic en el botón de alternar
          if (isSearchOpen) e.preventDefault();
        }}
        aria-label={isSearchOpen ? "Cerrar búsqueda" : "Buscar"}
        className="animated-search__button hover:text-light-gold relative z-50 w-10 h-10 flex items-center justify-center transition-colors"
      >
        <AnimatePresence>
          {!isSearchOpen ? (
            <motion.div
              key="search-icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
              transition={{ duration: 0.2 }}
              className="will-change-transform"
            >
              <Icon
                name="icon-search"
                size={24}
                className="animated-search__icon"
              />
            </motion.div>
          ) : (
            <motion.div
              key="close-icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
              transition={{ duration: 0.2 }}
            >
              <Icon name="icon-close" size={24} className="text-gold" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
