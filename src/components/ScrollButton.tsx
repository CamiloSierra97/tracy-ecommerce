"use client";
import React from "react";
import { Link as ScrollLink } from "react-scroll"; // ⬅️ Importamos el Link de react-scroll

const ScrollButton: React.FC = () => {
  // ❌ Eliminamos la función 'handleScrollToProducts' y 'window.scrollTo()'
  // ❌ Eliminamos el uso de la etiqueta <a> de HTML

  return (
    // 💥 Usamos el componente Link de react-scroll 💥
    <ScrollLink
      to="products-visual" // ID del elemento (asegúrate de que existe en page.tsx)
      spy={true} // Activa el resaltado si lo usas en el menú
      smooth="easeOutQuart"
      duration={900}
      delay={0}
      offset={0}
      className="bg-golden text-burgundy font-bold py-3 px-8 rounded-full shadow-lg hover:cursor-pointer hover:bg-gold"
    >
      Descubre la Colección
    </ScrollLink>
  );
};

export default ScrollButton;
