"use client";

import Link from "next/link";
import Icon from "@/components/shared/ui/Icon";
import Image from "next/image";
import ButtonSpinner from "@/components/shared/ui/ButtonSpinner";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUI } from "@/context/UIContext";

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showToast } = useUI();

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
    setIsLoggingOut(true);
    try {
      await signOut({ redirect: false });
      showToast("Has cerrado sesión correctamente");
      router.push("/");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getFirstName = (name: string) => {
    return name.split(" ")[0];
  };

  return (
    <div className="md:relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="user-dropdown__trigger flex items-center gap-3 transition-opacity hover:opacity-80 group focus:outline-none relative z-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="user-dropdown__greeting hidden md:flex flex-col items-end text-right">
          <span className="user-dropdown__username text-gold font-serif font-medium text-base tracking-wide leading-none">
            Hola, {user.name ? getFirstName(user.name) : "Usuario"}
          </span>
        </div>

        <div className="user-dropdown__avatar-container relative flex items-center justify-center">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "Usuario"}
              width={32}
              height={32}
              className={`user-dropdown__avatar rounded-full border border-gold object-cover size-8`}
            />
          ) : (
            <div
              className={`user-dropdown__avatar-fallback size-8 rounded-full flex items-center justify-center border border-gold bg-transparent text-gold`}
            >
              <span className="font-serif font-bold text-sm">
                {user.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
          )}
        </div>

        <Icon
          name="icon-chevron-down"
          size={14}
          className={`user-dropdown__icon text-gold transition-transform duration-300 hidden md:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* FONDO SOLO EN MÓVIL */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* CAJÓN (Móvil) / DESPLEGABLE (Escritorio) */}
      <div
        className={`
          user-dropdown__menu
          fixed top-0 right-0 h-full w-64 bg-ivory shadow-2xl z-50 transform transition-transform duration-300 ease-out
          md:absolute md:top-full md:right-0 md:h-auto md:w-56 md:mt-2 md:rounded-sm md:shadow-premium md:border md:border-gold/20
          ${
            isOpen
              ? "translate-x-0 md:translate-y-0 md:opacity-100 md:scale-100"
              : "translate-x-full md:translate-x-0 md:opacity-0 md:scale-95 md:-translate-y-2 md:pointer-events-none"
          }
        `}
      >
        {/* Encabezado Móvil (Botón Cerrar y Saludo) */}
        <div className="user-dropdown__menu-header p-6 border-b border-gold/10 md:hidden bg-burgundy/5 flex flex-col gap-4">
          <button
            onClick={() => setIsOpen(false)}
            className="self-end text-burgundy/60 hover:text-burgundy"
            aria-label="Cerrar menú"
          >
            <Icon name="icon-close" size={24} />
          </button>
          <div>
            <span className="text-xs uppercase tracking-widest text-burgundy/60 font-semibold block mb-1">
              Bienvenido
            </span>
            <p className="user-dropdown__user-name text-xl font-serif text-burgundy truncate">
              {user.name}
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="user-dropdown__links p-2 md:p-1 flex flex-col gap-1 mt-2 md:mt-0">
          <Link
            href="/perfil"
            className="user-dropdown__link flex items-center gap-4 px-6 py-4 md:px-4 md:py-3 text-base md:text-sm font-medium text-burgundy hover:bg-gold/10 hover:text-burgundy transition-colors rounded-md mx-2 md:mx-0 group"
            onClick={() => setIsOpen(false)}
          >
            <Icon
              name="icon-user"
              size={20}
              className="text-gold group-hover:scale-110 transition-transform"
            />
            Mi Perfil
          </Link>
          <Link
            href="/perfil"
            className="user-dropdown__link flex items-center gap-4 px-6 py-4 md:px-4 md:py-3 text-base md:text-sm font-medium text-burgundy hover:bg-gold/10 hover:text-burgundy transition-colors rounded-md mx-2 md:mx-0 group"
            onClick={() => setIsOpen(false)}
          >
            <Icon
              name="icon-bag"
              size={20}
              className="text-gold group-hover:scale-110 transition-transform"
            />
            Mis Pedidos
          </Link>
          <button
            className="user-dropdown__link flex items-center gap-4 px-6 py-4 md:px-4 md:py-3 text-base md:text-sm font-medium text-gray-400 cursor-not-allowed rounded-md mx-2 md:mx-0 group opacity-60"
            disabled
            title="Próximamente"
          >
            <Icon
              name="icon-notfilled-star"
              size={20}
              className="text-gray-400"
            />
            Lista de Deseos
          </button>
        </div>

        {/* Cerrar Sesión (Móvil: Abajo / Escritorio: Abajo del desplegable) */}
        <div className="user-dropdown__logout-section p-4 md:p-1 mt-auto border-t border-gold/10 md:mt-0">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="user-dropdown__logout-btn w-full flex items-center gap-4 px-4 py-3 text-base md:text-sm text-burgundy hover:bg-gold/10 hover:text-burgundy/70 transition-colors rounded-md group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <ButtonSpinner className="text-burgundy" />
            ) : (
              <Icon
                name="icon-close"
                size={20}
                className="text-burgundy group-hover:text-burgundy/70 transition-colors"
              />
            )}
            {isLoggingOut ? "Cerrando..." : "Cerrar Sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}
