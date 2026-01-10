import React from "react";
import ScrollButton from "@/components/ui/ScrollButton";

const BRAND_SLOGAN = "Libera tu cuerpo, abraza tu libertad.";

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section size-full flex flex-col md:flex-row justify-center">
      {/* <aside> para contenido tangencial: la imagen de fondo */}
      <figure className="hero-section__image-container hidden md:block w-full h-screen md:w-1/2 md:h-screen lg:w-1/3 lg:h-[98vh] relative bg-hero-main bg-cover bg-top" />
      {/* <article> para el contenido autocontenido (el mensaje y el CTA) */}
      <article className="hero-section__content w-full h-full md:w-1/2 lg:w-2/5 pb-8 pt-4 px-6 md:pt-6 md:px-12 lg:px-20 z-10 bg-burgundy-light/95 backdrop-blur-sm flex flex-col justify-center items-center relative gap-4 text-center">
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

        <div className="hero-section__scroll-container flex flex-col items-center gap-4 mt-2">
          <ScrollButton />
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
