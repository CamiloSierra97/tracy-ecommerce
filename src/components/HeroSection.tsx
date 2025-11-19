import { playfair_italic, roboto_serif } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Icon from "./Icon";

const BRAND_SLOGAN = "Libera tu cuerpo, abraza tu verdad.";

const HeroSection: React.FC = () => {
  return (
    <>
      {/* <aside> para contenido tangencial: la imagen de fondo */}
      <aside className="hero-aside object-cover z-10">
        <Image
          src="/Background1.svg"
          alt="Fondo de lencería"
          className="object-cover h-full"
          quality={85}
          priority
          width={430}
          height={537}
        />
      </aside>

      {/* <article> para el contenido autocontenido (el mensaje y el CTA) */}
      <article className="px-8 md:px-16 z-10 bg-burgundy-light flex flex-col justify-center items-center">
        <div className={`${roboto_serif.className} inline-block text-6xl text-light-gold mx-0 my-5`}>
          <span
            className=""
          >
            Tracy
          </span>
        </div>

        {/* 🌟 Aplicación del Lema 🌟 */}
        <p
          className={`text-2xl ${playfair_italic.className} mb-8 text-ivory drop-shadow-black`}
        >
          {BRAND_SLOGAN}
        </p>
        <p className=" text-ivory mb-10 max-w-md opacity-90">
          Creemos que nuestra marca es el primer paso hacia la autenticidad.
          Nuestras colecciones están diseñadas para celebrar cada silueta,
          combinando seducción con un bienestar que se siente como una segunda
          piel. Redefine la elegancia. Redefine tu confianza.
        </p>

        <Link href="/products" passHref>
          <button className="bg-golden text-burgundy font-bold py-3 px-8 rounded-full shadow-lg hover:cursor-pointer hover:bg-gold transition duration-300">
            Ver Colección
          </button>
        </Link>
        <Icon name="Background1"></Icon>
      </article>
    </>
  );
};

export default HeroSection;
