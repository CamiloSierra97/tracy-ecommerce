import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-serif text-gold mb-2">404</h1>
      <h2 className="text-2xl font-medium text-gray-800 mb-4">
        Página no encontrada
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-burgundy text-white rounded-sm hover:bg-burgundy/90 transition-colors font-medium"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}
