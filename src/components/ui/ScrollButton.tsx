"use client";
import React from "react";
import { Link as ScrollLink } from "react-scroll";
import Icon from "./Icon";

const ScrollButton: React.FC = () => {
  return (
    <ScrollLink
      role="button"
      to="products-visual" // ID del elemento (asegurarse de que existe en page.tsx)
      spy={true} // Activa el resaltado si lo usamos en el menú
      smooth="easeInOutQuart"
      duration={900}
      delay={0}
      offset={0}
      className="scroll-button group relative flex items-center gap-3 bg-burgundy text-gold font-serif font-bold py-4 px-10 uppercase tracking-[0.15em] border border-burgundy shadow-lg shadow-burgundy/20 hover:text-burgundy hover:shadow-2xl hover:scale-101 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <div className="scroll-button__bg absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-in-out" />
      <span className="scroll-button__text relative z-10">
        Descubre la Colección
      </span>
      <Icon
        name="icon-chevron-down"
        size={24}
        className="scroll-button__icon relative z-10 animate-bounce"
      />
    </ScrollLink>
  );
};

export default ScrollButton;
