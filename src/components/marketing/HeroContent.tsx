import React from "react";
import ScrollButton from "@/components/ui/ScrollButton";

const BRAND_SLOGAN = "Libera tu cuerpo, abraza tu libertad.";

export default function HeroContent() {
  return (
    <article className="hero-section__content w-full h-full md:w-1/2 lg:w-2/5 py-15 px-6 md:pt-6 md:px-12 lg:px-20 z-10 bg-burgundy-light/95 md:backdrop-blur-sm flex flex-col justify-between items-stretch relative gap-4 text-center">
      <h1 className="hero-section__title inline-block font-serif text-5xl md:text-6xl text-light-gold mx-0 my-2 tracking-wide">
        <span className="">Tracy</span>
      </h1>

      {/* 🌟 Aplicación del Lema 🌟 */}
      <p
        className={`hero-section__slogan text-xl md:text-2xl font-serif italic pb-2 text-golden drop-shadow-md`}
      >
        {BRAND_SLOGAN}
      </p>
      <p className="hero-section__description text-ivory mb-6 opacity-90 text-base md:text-lg leading-relaxed text-pretty text-center max-w-sm md:max-w-none mx-auto">
        Creemos que nuestra marca es el primer paso hacia la autenticidad.
        Nuestras colecciones están diseñadas para celebrar cada silueta,
        combinando seducción con un bienestar que se siente como una segunda
        piel.
      </p>

      <div className="hero-section__scroll-container flex flex-col items-center gap-4">
        <ScrollButton />
      </div>
    </article>
  );
}
