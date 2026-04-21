"use client";
import React from "react";
import { Link as ScrollLink } from "react-scroll";
import Icon from "./Icon";

const ScrollButton: React.FC = () => {
  // Styles extracted for better readability
  const buttonClasses =
    "scroll-button btn-animate group relative flex items-center gap-3 bg-burgundy text-gold font-serif font-bold py-2 px-6 md:py-4 md:px-8 uppercase tracking-[0.15em] border border-burgundy shadow-lg shadow-burgundy/20 hover:text-burgundy hover:shadow-2xl transition-colors duration-200 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold";

  return (
    <ScrollLink
      role="button"
      to="products-visual"
      spy={true}
      smooth="easeInOutQuart"
      duration={900}
      delay={0}
      offset={0}
      className={buttonClasses}
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
