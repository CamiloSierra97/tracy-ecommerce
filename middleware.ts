import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Vercel proporciona información de geolocalización en el header x-vercel-ip-country
  const country = request.headers.get("x-vercel-ip-country");

  // Permitir acceso solo desde Colombia (código país CO)
  // Si no hay información de país (desarrollo local), permitir acceso
  if (country && country !== "CO") {
    // Redirigir a página de región no disponible
    return NextResponse.redirect(new URL("/region-no-disponible", request.url));
  }

  return NextResponse.next();
}

// Configurar qué rutas deben pasar por el middleware
export const config = {
  matcher: [
    /*
     * Hace coincidir con todas las rutas de solicitud excepto las que comienzan con:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - region-no-disponible (la página de restricción misma)
     * - archivos estáticos (png, jpg, svg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|region-no-disponible|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)).*)",
  ],
};
