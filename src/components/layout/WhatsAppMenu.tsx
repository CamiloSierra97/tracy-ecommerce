"use client";

import { useState, useRef, useEffect } from "react";
import config from "@/lib/config";
import Icon from "@/components/ui/Icon";

interface WhatsAppMenuProps {
  onSelect?: () => void;
}

const menuItems = [
  {
    label: "Compra con un asesor",
    sublabel: "Comunícate con nuestros asesores para realizar tu compra",
    message: "Hola, me gustaría comprar con la ayuda de un asesor.",
  },
  {
    label: "Comprar un regalo",
    sublabel: "Explora nuestras opciones de regalo y elige el detalle ideal",
    message: "Hola, estoy interesado en comprar un regalo.",
  },
  {
    label: "Compra tu mismo",
    sublabel: "Recorre el catálogo de WhatsApp y elige tus productos",
    message: "Hola, quiero ver el catálogo para comprar por mi cuenta.",
  },
  {
    label: "Servicio al cliente",
    sublabel:
      "Conoce nuestras políticas, rastrea tu envío, devoluciones, consulta stock... ¡y más!",
    message: "Hola, necesito ayuda de servicio al cliente.",
  },
  {
    label: "Compra institucional",
    sublabel: "Compra superiores por más de 20 unidades",
    message: "Hola, estoy interesado en realizar una compra institucional.",
  },
];

export default function WhatsAppMenu({ onSelect }: WhatsAppMenuProps) {
  const [showIndicator, setShowIndicator] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      // Si el contenido cabe, no se necesita indicador.
      // Si se ha desplazado cerca del final (diferencia menor a 10px), ocultar indicador.
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
      const hasOverflow = scrollHeight > clientHeight;
      setShowIndicator(hasOverflow && !isAtBottom);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkScroll(); // Verificación inicial
    // Agregar listener de redimensionamiento por si el contenido cambia o la ventana se ajusta
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const createWhatsAppLink = (message: string) => {
    return `https://wa.me/${
      config.whatsapp.phoneNumber
    }?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="whatsapp-menu-wrapper relative w-[310px] sm:w-[340px] max-w-[calc(100vw-3rem)] mb-4">
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="whatsapp-menu flex flex-col gap-3 max-h-[60vh] overflow-y-auto overflow-x-hidden p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={createWhatsAppLink(item.message)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onSelect}
            className="whatsapp-menu__item bg-white border-2 border-green-600 rounded-2xl p-4 transition-transform hover:scale-105 shadow-md flex flex-col items-center text-center group"
          >
            <span className="whatsapp-menu__label text-green-800 font-bold mb-1 group-hover:underline">
              {item.label}
            </span>
            <span className="whatsapp-menu__sublabel text-sm text-green-700 leading-tight">
              {item.sublabel}
            </span>
          </a>
        ))}
        {/* Espaciador para el indicador, asegura que el contenido final no quede oculto */}
        <div className="h-8"></div>
      </div>

      {/* Indicador de Desplazamiento (Scroll) */}
      <div
        className={`whatsapp-scroll-indicator absolute bottom-0 left-0 right-0 flex justify-center pb-1 pt-6 pointer-events-none bg-linear-to-t from-white/90 to-transparent rounded-b-2xl transition-opacity duration-300 ${
          showIndicator ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center animate-bounce">
          <Icon
            name="icon-chevron-down"
            className="text-green-700/80"
            size={16}
          />
          <span className="text-[9px] font-bold text-green-800/80 uppercase tracking-widest bg-white/70 px-2 rounded-full backdrop-blur-sm shadow-sm">
            Desplaza para ver más
          </span>
        </div>
      </div>
    </div>
  );
}
