import { playfair_italic, roboto_serif } from "@/lib/fonts";
import Image from "next/image";
import React from "react";
import Icon from "./Icon";
import ScrollButton from "./ScrollButton";

const BRAND_SLOGAN = "Libera tu cuerpo, abraza tu verdad.";

const HeroSection: React.FC = () => {
  return (
    <section className="hero w-full h-1/4 flex flex-row">
      {/* <aside> para contenido tangencial: la imagen de fondo */}
      <aside className="hero__image-container w-1/2 relative bg-burgundy">
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
      <article className="hero__content w-full pb-8 pt-4 px-6 z-10 bg-burgundy-light flex flex-col justify-center items-center text-center relative rounded-lgs">
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
        <p className="hero__description text-ivory mb-8 max-w-md opacity-90 text-base md:text-lg leading-relaxed">
          Creemos que nuestra marca es el primer paso hacia la autenticidad.
          Nuestras colecciones están diseñadas para celebrar cada silueta,
          combinando seducción con un bienestar que se siente como una segunda
          piel. Redefine la elegancia. Redefine tu confianza.
        </p>

        <div className="hero__scroll-container flex flex-col items-center gap-4">
          <ScrollButton />
        </div>

        {/* Decorative Icon - Positioned absolutely or integrated nicely */}
        <div className="hero__icon-container absolute bottom-4 right-4 opacity-20 pointer-events-none">
          <Icon
            name="Background1"
            className="hero__icon w-24 h-24"
          />
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
