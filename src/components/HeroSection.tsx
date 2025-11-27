import { playfair_italic, roboto_serif } from "@/lib/fonts";
import Image from "next/image";
import React from "react";
import ScrollButton from "./ScrollButton";

const BRAND_SLOGAN = "Libera tu cuerpo, abraza tu verdad.";

const HeroSection: React.FC = () => {
  return (
    <section className="hero w-full h-1/4 md:h-1/12 flex flex-row justify-center">
      {/* <aside> para contenido tangencial: la imagen de fondo */}
      <aside className="hero__image-container w-1/2 md:w-3/12 relative bg-burgundy">
        <Image
          src="/Background1.svg"
          alt="Fondo de lencería"
          className="hero__image object-cover"
          fill // La imagen llenará todo el espacio del contenedor padre
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
          priority
        />
      </aside>
      {/* <article> para el contenido autocontenido (el mensaje y el CTA) */}
      <article className="hero__content w-2/3 md:w-1/2 pb-8 pt-4 px-6 md:pt-6 md:px-8 z-10 bg-burgundy-light flex flex-col justify-center items-center text-center relative">
        <div
          className={`${roboto_serif.className} hero__title inline-block text-5xl md:text-6xl text-light-gold mx-0 my-5`}
        >
          <span className="">Tracy</span>
        </div>

        {/* 🌟 Aplicación del Lema 🌟 */}
        <p
          className={`hero__slogan text-xl md:text-2xl ${playfair_italic.className} mb-6 text-ivory drop-shadow-black`}
        >
          {BRAND_SLOGAN}
        </p>
        <p className="hero__description text-ivory mb-8 opacity-90 text-base md:text-lg leading-relaxed">
          Creemos que nuestra marca es el primer paso hacia la autenticidad.
          Nuestras colecciones están diseñadas para celebrar cada silueta,
          combinando seducción con un bienestar que se siente como una segunda
          piel. Redefine la elegancia. Redefine tu confianza.
        </p>

        <div className="hero__scroll-container flex flex-col items-center gap-4">
          <ScrollButton />
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
