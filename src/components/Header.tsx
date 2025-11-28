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
      className={`header h-header-size bg-burgundy shadow-sm overflow-hidden ${playfair.className}`}
    >
      <div className="header__content">
        {/* Contenido del encabezado: Logo y Navegación */}
        <div className="header__grid-layout grid grid-cols-3 items-center justify-center">
          {/* ZONA DEL MENÚ */}
          <div className="header__nav-main-wrapper flex items-center relative pl-4 md:pl-8 md:h-header-size">
            {/* 1. CHECKBOX */}
            <input
              type="checkbox"
              id="menu__checkbox"
              className="hidden"
              aria-label="menu"
            />
            <label
              htmlFor="menu__checkbox"
              className="menu__backdrop"
              aria-hidden="true"
            ></label>

            {/* 2. BOTÓN (Label) 
                Al tener 'fixed' cuando se abre (vía CSS), se mantendrá visible.
                La clase .menu-toggle del CSS global maneja el z-index.
            */}
            <label
              htmlFor="menu__checkbox"
              className="menu__toggle w-[50px] h-[50px] cursor-pointer md:hidden"
              aria-label="Alternar menú principal"
            >
              <div></div>
              <div></div>
              <div></div>
            </label>

            {/* 3. DRAWER (Panel Lateral) */}
            <nav className="menu__nav flex flex-col md:flex-row items-center border-r border-gold md:border-r-0 md:border-r-transparent">
              <ul className="flex flex-col md:flex-row items-center gap-8 w-full px-6">
                {mainLinks.map((link) => (
                  <li
                    key={link.href}
                    className="menu-item w-full text-center border-b border-gold md:border-0 last:border-0"
                  >
                    <Link
                      href={link.href}
                      className={`text-3xl text-gold hover:text-light-gold transition duration-300 block md:text-sm ${roboto_serif.className}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Opcional: Info extra en el menú */}
              <div className="mt-auto pb-10 text-golden text-sm md:hidden">
                <p>© Tracy Lencería</p>
              </div>
            </nav>
          </div>
          {/* Logo */}

          <div className="header__logo-container flex justify-center">
            <h1 className="header__title sr-only">
              TRACY ropa interior de Lujo
            </h1>

            <Link
              href="/"
              className="header__logo-link text-2xl w-28 h-28 relative scale-0.5 sm:scale-0.7 md:scale-100 flex justify-center items-center"
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
          <div className="header__container-utility h-header-size p-4 md:p-8 flex items-center justify-center z-10">
            <nav className="header__nav-utility flex items-center gap-3.5">
              {/* Aquí irían los íconos tipados, como Carrito, Usuario, etc. */}
              <div className="text-gold border-b border-b-transparent hover:text-light-gold hover:border-b-light-gold transition-all">
                <button
                  aria-label="Buscar"
                  role="button"
                  className="cursor-pointer"
                >
                  <Icon name="icon-search" />
                </button>
              </div>

              <div className="text-gold border-b border-b-transparent hover:text-light-gold hover:border-b-light-gold transition-all">
                <button
                  aria-label="Carrito"
                  role="button"
                  className="cursor-pointer"
                >
                  <Icon name="icon-bag" />
                </button>
              </div>

              <div className="text-gold border-b border-b-transparent hover:text-light-gold hover:border-b-light-gold transition-all">
                <button
                  aria-label="Mi Cuenta"
                  role="button"
                  className="cursor-pointer"
                >
                  <Icon name="icon-user" />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
