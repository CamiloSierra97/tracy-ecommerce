import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";
import { playfair, roboto_serif } from "@/lib/fonts";


const Header: React.FC = () => {
  const mainLinks = [
    { href: "/nina", label: "Niña" },
    { href: "/mujer", label: "Mujer" },
    { href: "/hombre", label: "Hombre" },
    { href: "/promociones", label: "Promociones" },
  ];

  return (
    <header
      className={`header bg-burgundy shadow-sm overflow-hidden ${playfair.className}`}
    >
      <div className="header__content">
        {/* Contenido del encabezado: Logo y Navegación */}
        <div className="header__grid-layout sm:px-6 grid grid-cols-3 items-center justify-center">
          <div className="header__nav-main-wrapper h-header-size items-center">
            {/* Navegación (Enlaces del Ecommerce) */}
            <nav className="header__nav-main space-x-8 w-full h-full flex items-center justify-around">
              <ul className="header__nav-list flex flex-row gap-x-8">
                {mainLinks.map((link) => (
                  <li
                    key={link.href}
                    className={`header__nav-list-item h-full cursor-pointer hover:text-light-gold text-golden transition duration-300 text-lg text-center font-medium ${roboto_serif.className}`}
                  >
                    <Link
                      key={link.href}
                      href={link.href}
                      className="header__nav-link flex justify-center h-full items-center"
                    ></Link>
                    <span className="header__nav-text">{link.label}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* Logo */}

          <div className="header__logo-container flex justify-center">
            <h1 className="header__title sr-only">TRACY ropa interior de Lujo</h1>

            <Link
              href="/"
              className="header__logo-link text-2xl w-28 h-28 relative flex justify-center items-center"
            >
              <Image
                src="/LogoTracy.svg"
                loading="eager"
                alt="TRACY Logo Ropa Interior de Lujo"
                width={129}
                height={129}
                className="header__logo-image opacity-60 hover:opacity-100 transition duration-300 w-full transform scale-200 relative bottom-1/8"
              />
            </Link>
          </div>

          {/* Espacio para íconos */}
          <div className="header__container-utility h-header-size">
            <nav className="header__nav-utility flex items-center ml-auto space-x-4">
              {/* Aquí irían los íconos tipados, como Carrito, Usuario, etc. */}
              {/* <Image
              src="Diseño sin título.svg"
              alt="Imagen de Fondo"
              width={1300}
              height={1300}
            /> */}
              {/* Ícono de Carrito: Usamos text-burgundy para cambiar el color */}
              <button aria-label="Buscar" role="button">
                <Icon
                  name="icon-carrito"
                  className="w-6 h-6 text-burgundy hover:text-golden transition"
                />
              </button>

              <button aria-label="Ver Carrito" role="button">
                <Icon
                  name="icon-carrito"
                  className="w-6 h-6 text-burgundy hover:text-golden transition"
                />
              </button>

              {/* Ícono de Usuario */}
              <button aria-label="Mi Cuenta" role="button">
                <Icon
                  name="icon-usuario"
                  className="w-6 h-6 text-burgundy hover:text-golden transition"
                />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
