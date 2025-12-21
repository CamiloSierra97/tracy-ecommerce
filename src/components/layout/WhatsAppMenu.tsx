"use client";

import config from "@/lib/config";

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
  const createWhatsAppLink = (message: string) => {
    return `https://wa.me/${
      config.whatsapp.phoneNumber
    }?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="whatsapp-menu flex flex-col gap-3 w-[300px] mb-4">
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
    </div>
  );
}
