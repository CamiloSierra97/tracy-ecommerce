"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Image from "next/image";

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cierra el menú desplegable al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
  };

  const getFirstName = (name: string) => {
    return name.split(" ")[0];
  };

  return (
    <div className="user-dropdown relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="user-dropdown__trigger flex items-center gap-3 transition-opacity hover:opacity-80 group focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="user-dropdown__greeting hidden md:flex flex-col items-end text-right">
          <span className="user-dropdown__welcome-text text-xs text-burgundy/60 uppercase tracking-widest font-medium">
            Bienvenido
          </span>
          <span className="user-dropdown__username text-gold font-serif font-medium text-lg leading-none">
            ¡Hola, {user.name ? getFirstName(user.name) : "Usuario"}!
          </span>
        </div>

        <div className="user-dropdown__avatar-container relative">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "Usuario"}
              width={40}
              height={40}
              className={`user-dropdown__avatar rounded-full border-2 transition-colors object-cover size-10 ${
                isOpen
                  ? "border-gold"
                  : "border-transparent group-hover:border-gold/50"
              }`}
            />
          ) : (
            <div
              className={`user-dropdown__avatar-fallback size-10 rounded-full flex items-center justify-center border-2 transition-colors bg-burgundy/5 text-burgundy ${
                isOpen
                  ? "border-gold"
                  : "border-transparent group-hover:border-gold/50"
              }`}
            >
              <span className="font-serif font-bold text-lg">
                {user.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
          )}

          {/* Punto Indicador Activo */}
          <div className="user-dropdown__status-indicator absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        <Icon
          name="icon-chevron-down"
          size={16}
          className={`user-dropdown__icon text-gray-400 transition-transform duration-300 hidden md:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menú Desplegable */}
      <div
        className={`user-dropdown__menu absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 transform transition-all duration-200 origin-top-right z-50 overflow-hidden ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* Encabezado del Usuario en el Desplegable (Visible mayormente en móvil, o contexto) */}
        <div className="user-dropdown__menu-header p-4 border-b border-gray-50 bg-gray-50/50">
          <p className="user-dropdown__user-name text-sm font-medium text-gray-900 truncate">
            {user.name}
          </p>
          <p className="user-dropdown__user-email text-xs text-gray-500 truncate">
            {user.email}
          </p>
        </div>

        <div className="user-dropdown__links p-2">
          <Link
            href="/mi-cuenta"
            className="user-dropdown__link flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-burgundy/5 hover:text-burgundy transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            <span className="user-dropdown__link-icon-wrapper p-1.5 rounded-md bg-gray-100 text-gray-500 group-hover:bg-burgundy/10 group-hover:text-burgundy transition-colors">
              <Icon name="icon-user" size={16} />
            </span>
            Mi Perfil
          </Link>
          <Link
            href="/mi-cuenta/pedidos"
            className="user-dropdown__link flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-burgundy/5 hover:text-burgundy transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            <span className="user-dropdown__link-icon-wrapper p-1.5 rounded-md bg-gray-100 text-gray-500 group-hover:bg-burgundy/10 group-hover:text-burgundy transition-colors">
              <Icon name="icon-bag" size={16} />
            </span>
            Mis Pedidos
          </Link>
          <Link
            href="/mi-cuenta/favoritos"
            className="user-dropdown__link flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-burgundy/5 hover:text-burgundy transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            <span className="user-dropdown__link-icon-wrapper p-1.5 rounded-md bg-gray-100 text-gray-500 group-hover:bg-burgundy/10 group-hover:text-burgundy transition-colors">
              <Icon name="icon-heart" size={16} />
            </span>
            Lista de Deseos
          </Link>
        </div>

        <div className="user-dropdown__logout-section border-t border-gray-50 p-2">
          <button
            onClick={handleLogout}
            className="user-dropdown__logout-btn w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors group"
          >
            <span className="p-1.5 rounded-md bg-red-50 text-red-500 group-hover:bg-red-100 transition-colors">
              <Icon name="icon-close" size={16} />
              {/* Asumiendo que icon-close o un ícono de salir existe, cerrar es un fallback seguro usualmente */}
            </span>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
