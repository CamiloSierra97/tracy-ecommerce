"use client"; // Error boundaries must be Client Components

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
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-3xl font-serif text-burgundy mb-4">
        ¡Ups! Algo salió mal
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Lo sentimos, ha ocurrido un error inesperado en la aplicación. Nuestro
        equipo ha sido notificado.
      </p>
      <div className="flex gap-4">
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="px-6 py-2 bg-burgundy text-white rounded-sm hover:bg-burgundy/90 transition-colors"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="px-6 py-2 border border-burgundy text-burgundy rounded-sm hover:bg-burgundy/5 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
