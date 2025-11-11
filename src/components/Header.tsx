"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";
import { playfair } from "@/lib/fonts";

const Header: React.FC = () => {
  return (
    <header
      className={`header bg-burgundy shadow-sm text-marfil ${playfair.className}`}
    >
      <meta
        name="viewport"
        content="width = device-width, inicial scale = 1.0"
      />
      <div className="header__content sm:px-6 lg:px-3">
        {/* Contenido del encabezado: Logo y Navegación */}
        <div className="header__grid-layout sm:px-6 grid grid-cols-3 items-center gap-5 justify-center">
          <div className="header__nav-main-wrapper">
            {/* Navegación (Enlaces del Ecommerce) */}
            <nav className="header__nav-main space-x-8 text-marfil">
              <ul className="header__nav-list flex flex-row gap-5 justify-items-start">
                <li className="header__nav-item mr-4">
                  <Link
                    href="/novedades"
                    className="header__nav-link font-base text-sm uppercase tracking-wider 
                    hover:text-gold
                    transition duration-300"
                  >
                    Novedades
                  </Link>
                </li>
                <li className="header__nav-item mr-4">
                  <Link
                    href="/lenceria"
                    className="header__nav-link font-base text-sm uppercase tracking-wider 
                    hover:text-gold transition duration-300"
                  >
                    Lencería
                  </Link>
                </li>
                <li className="header__nav-item mr-4">
                  <Link
                    href="/contacto"
                    className="header__nav-link font-base text-sm uppercase tracking-wider 
                hover:text-gold
                 transition duration-300"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* Logo */}

          <div className="header__logo-container flex justify-center">
            <h1 className="header__title sr-only">TRACY Lencería de Lujo</h1>

            <Link href="/" className="header__logo-link text-2xl">
              <Image
                src="/LogoTracy.svg"
                loading="eager"
                alt="TRACY Logo Lencería de Lujo"
                width={120}
                height={120}
                className="header__logo-image hover:opacity-70 transition duration-100"
              />
            </Link>
          </div>

          {/* Espacio para íconos */}
          <nav className="header__nav-utility flex items-center ml-auto space-x-4">
            {/* Aquí irían los íconos tipados, como Carrito, Usuario, etc. */}
            {/* <Image
              src="Diseño sin título.svg"
              alt="Imagen de Fondo"
              width={1300}
              height={1300}
            /> */}
            {/* Ícono de Carrito: Usamos text-burgundy para cambiar el color */}
            <button aria-label="Ver Carrito">
              <Icon
                name="icon-carrito"
                className="w-6 h-6 text-burgundy hover:text-golden transition"
              />
            </button>

            {/* Ícono de Usuario */}
            <button aria-label="Mi Cuenta">
              <Icon
                name="icon-usuario"
                className="w-6 h-6 text-burgundy hover:text-golden transition"
              />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
