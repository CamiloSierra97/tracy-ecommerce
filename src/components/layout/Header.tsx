// Componente Header (movido a la carpeta layout)
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CartTrigger from "@/components/cart/CartTrigger";
import UserMenu from "@/components/auth/UserMenu";
import AnimatedSearch from "./AnimatedSearch";

const Header: React.FC = () => {
  const mainLinks = [
    { href: "/mujer", label: "Mujer" },
    { href: "/hombre", label: "Hombre" },
    { href: "/nina", label: "Niña" },
    { href: "/promociones", label: "Promociones" },
  ];

  return (
    <header
      className={`header h-header-size bg-burgundy overflow-hidden shadow-sm sticky top-0 z-50 font-serif`}
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
              className="header__menu-checkbox hidden"
              aria-label="menu"
            />
            <label
              htmlFor="menu__checkbox"
              className="header__menu-backdrop menu__backdrop"
              aria-label="Cerrar menú"
            ></label>

            {/* 2. BOTÓN (Label) */}
            <label
              htmlFor="menu__checkbox"
              className="header__menu-toggle menu__toggle size-[50px] lg:hidden"
              aria-label="Alternar menú principal"
            >
              <div className="header__menu-bar"></div>
              <div className="header__menu-bar"></div>
              <div className="header__menu-bar"></div>
            </label>

            {/* 3. DRAWER (Panel Lateral) */}
            <nav className="header__nav menu__nav flex flex-col lg:flex-row items-center border-r border-gold lg:border-r-0 lg:border-r-transparent">
              <ul className="header__nav-list flex flex-col lg:flex-row items-center gap-8 w-full px-6">
                {mainLinks.map((link) => (
                  <li
                    key={link.href}
                    className="header__nav-item w-full text-center border-b border-gold lg:border-0"
                  >
                    <Link
                      href={link.href}
                      className="header__nav-link text-3xl text-gold hover:text-light-gold transition duration-300 block lg:text-sm font-roboto-serif"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Opcional: Info extra en el menú */}
              <div className="header__nav-footer mt-auto pb-10 text-golden text-sm lg:hidden">
                <p>© Tracy Lencería</p>
              </div>
            </nav>
          </div>
          {/* Logo */}

          <div className="header__logo-container flex justify-center">
            {/* Logo Link with accessible name */}
            <Link
              href="/"
              className="header__logo-link size-28 pt-5 relative flex justify-center items-center"
              aria-label="Ir a la página de inicio de Tracy Ropa interior de lujo"
            >
              <div className="header__logo-mask w-full h-full transition-all duration-300 transform scale-170 hover:bg-light-gold hover:scale-180 relative bottom-1/8" />
            </Link>
          </div>

          {/* Espacio para íconos */}
          <div className="header__utility-container h-header-size p-4 md:p-8 flex items-center justify-center z-10">
            <nav className="header__utility-nav flex items-center gap-3.5">
              {/* Búsqueda Animada (Isla de Componente Cliente) */}
              <div className="header__utility-item header__utility-item--search h-10 flex items-center transition-all">
                <AnimatedSearch />
              </div>

              <div className="header__utility-item header__utility-item--cart h-10 flex items-center text-gold border-b border-b-transparent hover:text-light-gold hover:border-b-light-gold transition-all">
                <CartTrigger />
              </div>

              <div className="header__utility-item header__utility-item--user h-10 flex items-center text-gold border-b border-b-transparent hover:text-light-gold hover:border-b-light-gold transition-all">
                <UserMenu />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
