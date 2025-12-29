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

  // Close dropdown when clicking outside
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 transition-opacity hover:opacity-80 group focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="hidden md:flex flex-col items-end text-right">
          <span className="text-xs text-burgundy/60 uppercase tracking-widest font-medium">
            Bienvenido
          </span>
          <span className="text-gold font-serif font-medium text-lg leading-none">
            ¡Hola, {user.name ? getFirstName(user.name) : "Usuario"}!
          </span>
        </div>

        <div className="relative">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "Usuario"}
              width={40}
              height={40}
              className={`rounded-full border-2 transition-colors object-cover size-10 ${
                isOpen
                  ? "border-gold"
                  : "border-transparent group-hover:border-gold/50"
              }`}
            />
          ) : (
            <div
              className={`size-10 rounded-full flex items-center justify-center border-2 transition-colors bg-burgundy/5 text-burgundy ${
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

          {/* Active Indicator Dot */}
          <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        <Icon
          name="icon-chevron-down"
          size={16}
          className={`text-gray-400 transition-transform duration-300 hidden md:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 transform transition-all duration-200 origin-top-right z-50 overflow-hidden ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* User Header in Dropdown (Visible on Mobile mostly, or context) */}
        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>

        <div className="p-2">
          <Link
            href="/mi-cuenta"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-burgundy/5 hover:text-burgundy transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            <span className="p-1.5 rounded-md bg-gray-100 text-gray-500 group-hover:bg-burgundy/10 group-hover:text-burgundy transition-colors">
              <Icon name="icon-user" size={16} />
            </span>
            Mi Perfil
          </Link>
          <Link
            href="/mi-cuenta/pedidos"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-burgundy/5 hover:text-burgundy transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            <span className="p-1.5 rounded-md bg-gray-100 text-gray-500 group-hover:bg-burgundy/10 group-hover:text-burgundy transition-colors">
              <Icon name="icon-bag" size={16} />
            </span>
            Mis Pedidos
          </Link>
          <Link
            href="/mi-cuenta/favoritos"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-burgundy/5 hover:text-burgundy transition-colors group"
            onClick={() => setIsOpen(false)}
          >
            <span className="p-1.5 rounded-md bg-gray-100 text-gray-500 group-hover:bg-burgundy/10 group-hover:text-burgundy transition-colors">
              <Icon name="icon-heart" size={16} />
            </span>
            Lista de Deseos
          </Link>
        </div>

        <div className="border-t border-gray-50 p-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors group"
          >
            <span className="p-1.5 rounded-md bg-red-50 text-red-500 group-hover:bg-red-100 transition-colors">
              <Icon name="icon-close" size={16} />
              {/* Assuming icon-close or a logout icon exists, close is a safe fallback usually */}
            </span>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
