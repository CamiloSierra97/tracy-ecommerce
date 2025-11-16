import Image from "next/image";
import Link from "next/link";
import React from "react";

const BRAND_SLOGAN = "Libera tu cuerpo, abraza tu verdad.";

const HeroSection: React.FC = () => {
  return (
    <>
      {/* <aside> para contenido tangencial: la imagen de fondo */}
      <aside className="hero-aside">
        <Image
          src="/Background1.svg"
          alt="Fondo de lencería sutil"
          objectFit="cover"
          quality={85}
          priority
          width={430}
          height={537}
          className="opacity-85" // Clase para hacerlo sutil
        />
      </aside>

      {/* <article> para el contenido autocontenido (el mensaje y el CTA) */}
      <article className="text-ivory px-8 md:px-16 z-10 bg-burgundy-light flex flex-col justify-center items-center">
        <span className="inline-block text-6xl text-light-gold mx-0 my-5">
          TRACY LENCERÍA
        </span>

        {/* 🌟 Aplicación del Lema 🌟 */}
        <p className="text-2xl italic font-light mb-8 text-ivory drop-shadow-md">
          {BRAND_SLOGAN}
        </p>

        <Link href="/products" passHref>
          <button className="bg-golden text-burgundy font-bold py-3 px-8 rounded-full shadow-lg hover:cursor-pointer hover:bg-goldz transition duration-300">
            Ver Colección
          </button>
        </Link>
      </article>
    </>
  );
};

export default HeroSection;
