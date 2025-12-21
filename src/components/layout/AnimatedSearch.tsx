"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";

export default function AnimatedSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Conditional classes: Only show bottom border hover when search is closed
  const containerClasses = isSearchOpen
    ? "text-gold"
    : "text-gold border-b border-b-transparent hover:text-light-gold hover:border-b-light-gold";

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    // Push the search term to the URL query parameter
    // This will trigger a re-render in components listening to useSearchParams
    router.push(`/?search=${encodeURIComponent(searchTerm)}`);

    // Optional: Close search or keep open? keeping open for now.
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
            className="animated-search__input bg-transparent border rounded-full border-gold text-sm text-ivory placeholder-gold/70 focus:outline-none mr-2 font-sans px-3"
            aria-label="Buscar productos"
            autoFocus
            onBlur={() => {
              // Only close if empty to allow typing
              if (!searchTerm) setIsSearchOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <button
        onClick={() => {
          if (isSearchOpen && searchTerm) {
            handleSearch();
          } else {
            setIsSearchOpen(!isSearchOpen);
          }
        }}
        aria-label="Buscar"
        className="animated-search__button cursor-pointer hover:text-light-gold focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <Icon name="icon-search" className="animated-search__icon" />
      </button>
    </div>
  );
}
