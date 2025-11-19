'use client';

import React, { useState, useEffect } from 'react';


interface StickyHeaderWrapperProps {
    children: React.ReactNode;
}

// Umbral: Puedes bajarlo a 100px para que el cambio de color sea rápido.
const SCROLL_THRESHOLD = 100; 

const StickyHeaderWrapper: React.FC<StickyHeaderWrapperProps> = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false); // Cambié el nombre del estado a isScrolled

    useEffect(() => {
        const handleScroll = () => {
            // isScrolled es TRUE tan pronto como se hace un poco de scroll
            setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // La posición es SIEMPRE FIXED. La lógica condicional solo cambia el fondo y el padding/sombra.
    const headerClasses = isScrolled
        ? // ESTADO SCROLLED (Fondo sólido, menos padding, sombra)
          'bg-burgundy shadow-lg' // Más compacto al scrollear
        : // ESTADO INICIAL (Fondo semi-transparente, más padding, sin sombra)
          'bg-burgundy/80'; // Fondo con 80% de opacidad para ver el hero

    return (
        <header 
            // Posición fija desde el inicio
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerClasses}`}
        >
            {children}
        </header>
    );
};

export default StickyHeaderWrapper;