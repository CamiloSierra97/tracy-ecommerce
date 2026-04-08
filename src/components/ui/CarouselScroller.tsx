"use client";

import { useRef, useCallback } from "react";
import Icon from "@/components/ui/Icon";

interface CarouselScrollerProps {
  children: React.ReactNode;
  trackClassName?: string;
  className?: string;
}

export default function CarouselScroller({ children, trackClassName, className }: CarouselScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 1024 ? window.innerWidth / 2 : window.innerWidth;
      const leftOffset = direction === "left" ? -scrollAmount : scrollAmount;
      
      scrollRef.current.scrollBy({ left: leftOffset, behavior: "smooth" });
    }
  }, []);

  return (
    <div className={`carousel-scroller relative group w-full ${className || ""}`}>
      {/* Scrollable Track */}
      <div
        ref={scrollRef}
        className={`carousel-scroller__track flex overflow-x-auto
                   scroll-smooth snap-x snap-mandatory
                   [-webkit-overflow-scrolling:touch]
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                     trackClassName || ""
                   }`}
      >
        {children}
      </div>

      {/* Navegación Desktop (Oculta en móvil nativo) */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll izquierda"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10
                   bg-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-burgundy 
                   w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full
                   opacity-0 lg:group-hover:opacity-100 transition-all duration-300
                   hover:bg-burgundy hover:text-white
                   disabled:opacity-0 focus:outline-none focus:ring-2 focus:ring-burgundy"
      >
        <span className="hidden md:block">
          <Icon name="icon-arrow-left" size={24} />
        </span>
      </button>

      <button
        onClick={() => scroll("right")}
        aria-label="Scroll derecha"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10
                   bg-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-burgundy 
                   w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full
                   opacity-0 lg:group-hover:opacity-100 transition-all duration-300
                   hover:bg-burgundy hover:text-white
                   focus:outline-none focus:ring-2 focus:ring-burgundy"
      >
        <span className="hidden md:block">
          <Icon name="icon-arrow-right" size={24} />
        </span>
      </button>
    </div>
  );
}
