"use client";

import Link from "next/link";
import Icon from "@/components/shared/ui/Icon";
import { motion, AnimatePresence } from "framer-motion";
import type { Category } from "@/services/WooCommerceService";
import { useState, useRef, useEffect } from "react";

interface CategoryDropdownProps {
  categories: Category[];
}

export default function CategoryDropdown({
  categories,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Cerrar con tecla Escape (accesibilidad)
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Filtrar solo categorías principales (sin parent)
  const mainCategories = categories.filter((cat) => cat.parent === 0);

  return (
    <div className="category-dropdown relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className="category-dropdown__trigger flex items-center gap-1 text-gold hover:text-light-gold transition-colors duration-300 border-b border-b-transparent hover:border-b-light-gold"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menú de categorías"
      >
        <span className="font-medium">Categorías</span>
        <Icon
          name="icon-chevron-down"
          size={16}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="category-dropdown__menu absolute top-full mt-2 left-0 min-w-[220px] bg-ivory shadow-premium border border-gold/20 rounded-md overflow-hidden z-50"
            role="menu"
            aria-orientation="vertical"
          >
            <nav className="category-dropdown__list p-2">
              {mainCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/tienda/${category.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="category-dropdown__item flex items-center justify-between px-4 py-3 text-sm text-burgundy hover:bg-gold/10 hover:text-burgundy transition-colors rounded-md group"
                  role="menuitem"
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="text-xs text-burgundy/50 group-hover:text-burgundy/70">
                    ({category.count})
                  </span>
                </Link>
              ))}

              {mainCategories.length === 0 && (
                <div className="px-4 py-3 text-sm text-burgundy/50 text-center">
                  No hay categorías disponibles
                </div>
              )}
            </nav>

            {/* Enlace a todas las categorías */}
            <div className="border-t border-gold/10 p-2">
              <Link
                href="/tienda"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-center text-burgundy hover:bg-burgundy/5 rounded-md transition-colors"
                role="menuitem"
              >
                Ver Toda la Tienda →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
