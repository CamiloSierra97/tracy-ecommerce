"use client";
import React from "react";
import { Link as ScrollLink } from "react-scroll";

const ScrollButton: React.FC = () => {
  return (
    <ScrollLink
      role="button"
      to="products-visual" // ID del elemento (asegurarse de que existe en page.tsx)
      spy={true} // Activa el resaltado si lo usamos en el menú
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
