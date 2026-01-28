"use client";

import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import TripleBanner from "./TripleBanner";
import HeroSection from "./HeroSection";
import ArrowButton from "./ArrowButton";
import PaginationDots from "./PaginationDots";

const SLIDES_COUNT = 2;

export default function HeroCarousel() {
  const { current, setCurrent, nextSlide, prevSlide, setIsPaused } =
    useCarousel({
      slidesCount: SLIDES_COUNT,
    });

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
        <Image
          src="/Patron.svg"
          alt=""
          fill
          priority
          quality={90}
          className="hero-carousel__pattern absolute inset-0 z-0 max-md:hidden blur-xs scale-110 object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
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

      <ArrowButton direction="left" onClick={prevSlide} />
      <ArrowButton direction="right" onClick={nextSlide} />

      <PaginationDots
        count={SLIDES_COUNT}
        current={current}
        onDotClick={setCurrent}
      />
    </div>
  );
}
