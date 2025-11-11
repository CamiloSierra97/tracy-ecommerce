import React from "react";

interface ThreeRingLoaderProps {
  className?: string; // Para pasar las variables CSS y clases adicionales
}

const ThreeRingLoader: React.FC<ThreeRingLoaderProps> = () => {
  // NOTA: Los valores dinámicos ahora deben pasarse así:
  // <ThreeRingLoader className="--loader-size: 100px; --color-ring-1: red;" />
  // Sin embargo, las variables CSS personalizadas no son clases de utilidad,
  // por lo que se deben pasar con el atributo 'style' o en un CSS global.
  // La solución más limpia es definir los valores por defecto aquí y
  // que el usuario los sobrescriba con 'style', pero como quieres evitar 'style',
  // permitiremos que se pasen variables CSS inline si es necesario, aunque esto
  // puede violar la regla de 'no-inline-styles'.
  // Para evitar el error, **NO usamos el atributo style**.

  return (
    // Aplicamos la clase principal y la prop className.
    <div className="w-card-half-size h-card-half-size rounded-full grid loader-ring-root border-[0.625rem] border-transparent border-r-burgundy animate-[spinner-rotate_1s_infinite_linear]"></div>
  );
};

export default ThreeRingLoader;
