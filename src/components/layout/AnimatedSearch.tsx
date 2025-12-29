"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { X } from "lucide-react";

export default function AnimatedSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Clases condicionales: Solo mostrar borde inferior al pasar el mouse cuando la búsqueda está cerrada
  const containerClasses = isSearchOpen
    ? "text-gold"
    : "text-gold border-b border-b-transparent hover:text-light-gold hover:border-b-light-gold";

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    // Empujar el término de búsqueda al parámetro de consulta de la URL
    // Esto activará una re-renderización en los componentes que escuchan useSearchParams
    router.push(`/?search=${encodeURIComponent(searchTerm)}`);

    // Opcional: ¿Cerrar búsqueda o mantener abierta? Manteniendo abierta por ahora.
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`animated-search search-bar relative flex items-center h-full transition-all ${containerClasses}`}
    >
      <AnimatePresence>
        {isSearchOpen && (
          <motion.input
            initial={{ width: 0, opacity: 0, paddingRight: 0 }}
            animate={{ width: 180, opacity: 1, paddingRight: "0.5rem" }}
            exit={{ width: 0, opacity: 0, paddingRight: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="animated-search__input absolute right-0 top-1/2 -translate-y-1/2 bg-burgundy border rounded-full border-gold text-sm text-ivory placeholder-gold/70 focus:outline-none font-sans pl-3 pr-10 h-8 shadow-sm"
            aria-label="Buscar productos"
            autoFocus
            onBlur={() => {
              // Solo cerrar si está vacío para permitir escribir
              if (!searchTerm) setIsSearchOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <button
        onClick={() => {
          if (isSearchOpen) {
            // Si está abierta, hacer clic en el botón (X) la cierra
            setIsSearchOpen(false);
            setSearchTerm("");
          } else {
            setIsSearchOpen(true);
          }
        }}
        onMouseDown={(e) => e.preventDefault()}
        aria-label={isSearchOpen ? "Cerrar búsqueda" : "Buscar"}
        className="animated-search__button hover:text-light-gold relative z-10 w-10 h-10 flex items-center justify-center"
      >
        <AnimatePresence>
          {!isSearchOpen ? (
            <motion.div
              key="search-icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
              transition={{ duration: 0.2 }}
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
              <X size={24} className="text-gold" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
