import React from "react";
import Image from "next/image";
import HeroContent from "./HeroContent";

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section size-full flex flex-col md:flex-row justify-center">
      {/* <aside> para contenido tangencial: la imagen de fondo */}
      <div className="hero-section__image-container hidden md:block w-full h-screen md:w-1/2 md:h-screen lg:w-1/3 lg:h-[98vh] relative">
        <Image
          src="/Background1.svg"
          alt="Tracy Lencería Background"
          fill
          priority
          className="object-cover object-top"
          sizes="(min-width: 1024px) 33vw, 50vw"
        />
      </div>

      {/* <article> content extracted to HeroContent */}
      <HeroContent />
    </section>
  );
};

export default HeroSection;
