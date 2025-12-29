"use client"; // Los límites de error deben ser Componentes de Cliente

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Registrar el error en un servicio de reporte de errores
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="error-page flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="error-page__title text-3xl font-serif text-burgundy mb-4">
        ¡Ups! Algo salió mal
      </h2>
      <p className="error-page__description text-gray-600 mb-8 max-w-md">
        Lo sentimos, ha ocurrido un error inesperado en la aplicación. Nuestro
        equipo ha sido notificado.
      </p>
      <div className="error-page__actions flex gap-4">
        <button
          onClick={
            // Intentar recuperarse tratando de volver a renderizar el segmento
            () => reset()
          }
          className="error-page__retry-btn px-6 py-2 bg-burgundy text-white rounded-sm hover:bg-burgundy/90 transition-colors"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="error-page__home-link px-6 py-2 border border-burgundy text-burgundy rounded-sm hover:bg-burgundy/5 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
