"use client";

import { useState, useEffect, useRef } from "react";
import HeroSection from "@/components/layout/HeroSection";
import TripleBanner from "@/components/layout/TripleBanner";
import Icon from "../ui/Icon";

const SLIDES_COUNT = 2;
const SLIDE_DURATION = 8000; // 8 segundos por diapositiva para mejor legibilidad

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % SLIDES_COUNT);
      }, SLIDE_DURATION);
    }

    return () => resetTimeout();
  }, [current, isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES_COUNT) % SLIDES_COUNT);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES_COUNT);
  };

  return (
    <div
      className="hero-carousel relative overflow-hidden h-screen md:h-11/12 lg:h-[90vh] group/carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Diapositiva 1: Sección Hero Original */}
      <div
        className={`hero-carousel__slide hero-carousel__slide--hero absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
          current === 0
            ? "opacity-100 z-10"
            : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <div className="hero-carousel__pattern bg-patron-desktop absolute inset-0 z-0 max-md:hidden blur-xs scale-110 bg-cover bg-center" />
        <div className="hero-carousel__content relative z-10 w-full h-full">
          <HeroSection />
        </div>
      </div>

      {/* Diapositiva 2: Triple Banner */}
      <div
        className={`hero-carousel__slide hero-carousel__slide--banner absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
          current === 1
            ? "opacity-100 z-10"
            : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <TripleBanner />
      </div>

      {/* Flechas de Navegación */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="hero-carousel__arrow hero-carousel__arrow--prev group absolute left-4 top-1/2 -translate-y-1/2 z-20 
                   animate-pulse-scale
                   bg-black/30 hover:bg-black/50 text-gold
                   p-4 rounded-full backdrop-blur-sm border border-gold/50 
                   transition-all duration-300 transform hover:scale-110 shadow-lg"
        aria-label="Diapositiva anterior"
      >
        <div className="hero-carousel__container transform transition-transform duration-300 group-hover:-translate-x-2">
          <Icon name="icon-arrow-left-dashed" size={24} />
        </div>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="hero-carousel__arrow hero-carousel__arrow--next group absolute right-4 top-1/2 -translate-y-1/2 z-20 
                   animate-pulse-scale
                   bg-black/30 hover:bg-black/50 text-gold
                   p-4 rounded-full backdrop-blur-sm border border-gold/50 
                   transition-all duration-300 transform hover:scale-110 shadow-lg"
        aria-label="Siguiente diapositiva"
      >
        <div className="hero-carousel__container transform transition-transform duration-300 group-hover:translate-x-2">
          <Icon name="icon-arrow-right-dashed" size={24}></Icon>
        </div>
      </button>

      {/* Indicadores de Paginación */}
      <div className="hero-carousel__pagination absolute bottom-4 md:bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl scale-90 md:scale-100">
        {[...Array(SLIDES_COUNT)].map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(index);
            }}
            className={`hero-carousel__dot transition-all duration-500 rounded-full ${
              current === index
                ? "hero-carousel__dot--active bg-gold w-8 h-1.5 opacity-100 shadow-[0_0_12px_rgba(217,179,56,0.6)]"
                : "hero-carousel__dot--inactive bg-white/40 w-1.5 h-1.5 hover:bg-white hover:scale-125 hover:shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
