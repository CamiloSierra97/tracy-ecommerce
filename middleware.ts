import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Vercel proporciona información de geolocalización en el header x-vercel-ip-country
  const country = request.headers.get("x-vercel-ip-country");
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";

  // Lista de bots comunes para permitir indexación
  const isBot =
    userAgent.includes("googlebot") ||
    userAgent.includes("bingbot") ||
    userAgent.includes("facebookexternalhit") ||
    userAgent.includes("twitterbot") ||
    userAgent.includes("linkedinbot") ||
    userAgent.includes("pinterest") ||
    userAgent.includes("slack") ||
    userAgent.includes("whatsapp") ||
    userAgent.includes("discordbot") ||
    // PageSpeed Insights & Lighthouse
    userAgent.includes("lighthouse") ||
    userAgent.includes("google page speed") ||
    userAgent.includes("chrome-lighthouse") ||
    userAgent.includes("insights");

  // Permitir acceso solo desde Colombia (código país CO) pero permitir bots
  // Si no hay información de país (desarrollo local), permitir acceso
  if (!isBot && country && country !== "CO") {
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
