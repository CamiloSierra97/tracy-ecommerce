"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { playfair } from "@/lib/fonts";
import { usePathname } from "next/navigation";

// Si usas el logo como un componente, lo importarías aquí:
// import Logo from './Logo';

const Header: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <header
      className={`bg-burdeos shadow-sm text-marfil ${playfair.className}`}
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-3">
        {/* Contenido del encabezado: Logo y Navegación */}
        <div className="sm:px-6 lg:px-8 flex grid-rows-[1fr,auto,1fr] items-center gap-5 justify-center">
          {/* Navegación (Enlaces del Ecommerce) */}
          <nav className="hidden md:flex space-x-8 text-marfil">
            <Link
              href="/novedades"
              className="font-base text-sm uppercase tracking-wider 
                         hover:text-oro transition duration-300"
            >
              Novedades
            </Link>
            <Link
              href="/lenceria"
              className="font-base text-sm uppercase tracking-wider 
                         hover:text-oro transition duration-300"
            >
              Lencería
            </Link>
            <Link
              href="/contacto"
              className="font-base text-sm uppercase tracking-wider 
                         hover:text-oro transition duration-300"
            >
              Contacto
            </Link>
          </nav>
          {/* Logo */}

          <div className="w-1/3 md:w-1/3 flex justify-center">
            {/* Lógica condicional del H1 */}
            {isHomePage ? (
              // H1 que Google ve, pero el usuario no.
              <h1 className="sr-only">TRACY Lencería de Lujo</h1>
            ) : null}
            <Link href="/" className="text-2xl">
              <Image
                src="/LogoTracy.svg"
                loading="eager"
                alt="TRACY Logo Lencería de Lujo"
                width={120}
                height={120}
                className="hover:opacity-60 transition duration-300"
              />
            </Link>
          </div>

          {/* Espacio para íconos */}
          <div className="flex items-center ml-auto space-x-4">
            {/* Aquí irían los íconos tipados, como Carrito, Usuario, etc. */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
