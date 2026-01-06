import type { Metadata } from "next";
import Icon from "@/components/ui/Icon";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Región No Disponible - Tracy",
  description: "Este sitio no está disponible en tu región actualmente.",
  robots: "noindex, nofollow",
};

export default function RegionNoDisponible() {
  return (
    <main className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Logo/Icono */}
        <div className="flex justify-center">
          <div className="size-24 bg-burgundy/10 rounded-full flex items-center justify-center">
            <Icon name="icon-map-pin" size={48} className="text-burgundy" />
          </div>
        </div>

        {/* Título */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif text-burgundy">
            Región No Disponible
          </h1>
          <p className="text-xl text-gray-600 font-sans leading-relaxed">
            Lo sentimos, actualmente{" "}
            <strong className="text-burgundy">Tracy</strong> solo está
            disponible en Colombia.
          </p>
        </div>

        {/* Información adicional */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-burgundy/10">
          <p className="text-gray-500 text-sm leading-relaxed">
            Estamos trabajando para expandir nuestros servicios a más países.
            <br />
            Si eres de Colombia y ves este mensaje, es posible que estés usando
            una VPN o proxy.
          </p>
        </div>

        {/* Contacto */}
        <div className="pt-4">
          <p className="text-sm text-gray-400 mb-4">¿Necesitas ayuda?</p>
          <Link
            href="mailto:contacto@tracy.com"
            className="inline-flex items-center gap-2 text-burgundy hover:text-burgundy-light transition-colors font-medium"
          >
            <Icon name="icon-mail" size={20} />
            Contáctanos
          </Link>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Tracy. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </main>
  );
}
