import { playfair_italic, roboto_serif } from "@/lib/fonts";
import Image from "next/image";

import React from "react";
import ScrollButton from "@/components/ui/ScrollButton";

const BRAND_SLOGAN = "Libera tu cuerpo, abraza tu libertad.";

const HeroSection: React.FC = () => {
  return (
    <section className="hero w-full h-full flex flex-col md:flex-row justify-center">
      {/* <aside> para contenido tangencial: la imagen de fondo */}
      <figure className="hero__image-container hidden md:block w-full h-screen md:w-1/3 md:h-screen lg:w-1/3 lg:h-[90vh] relative bg-burgundy">
        <Image
          src="/Background1.svg"
          alt="Fondo de lencería"
          className="hero__image relative object-cover object-top"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
          priority
        />
      </figure>
      {/* <article> para el contenido autocontenido (el mensaje y el CTA) */}
      <article className="hero__content w-full md:w-1/2 lg:w-2/5 pb-8 pt-4 px-6 md:pt-6 md:px-8 z-10 bg-burgundy-light flex flex-col justify-center items-center text-center relative">
        <h1
          className={`hero__title inline-block ${roboto_serif.className} text-5xl leading-20 md:text-4xl text-light-gold mx-0 my-2`}
        >
          <span className="">Tracy</span>
        </h1>

        {/* 🌟 Aplicación del Lema 🌟 */}
        <p
          className={`hero__slogan text-xl md:text-2xl ${playfair_italic.className} pb-2 text-golden drop-shadow-black`}
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
