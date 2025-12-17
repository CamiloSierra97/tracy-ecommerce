import { NextResponse } from "next/server";
import config from "@/lib/config";

export async function GET(request: Request) {
  try {
    const { url, consumerKey, consumerSecret } = config.woocommerce;

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const per_page = searchParams.get("per_page") || "12";
    const slug = searchParams.get("slug");

    if (!url || !consumerKey || !consumerSecret) {
      console.error("❌ ERROR: Faltan variables de entorno de WooCommerce");
      return NextResponse.json(
        { error: "Configuración del servidor incompleta (Faltan credenciales)" },
        { status: 500 }
      );
    }

    // Auth Header
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    let apiUrl = `${url}/wp-json/wc/v3/products?per_page=${per_page}&page=${page}`;
    if (slug) {
      apiUrl += `&slug=${slug}`;
    }

    // Configurar opciones de fetch
    const options: RequestInit = {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      // En desarrollo, si hay problemas de certificado auto-firmado,
      // Node.js nativo (v18+) requiere un dispatcher personalizado o
      // simplemente configurar NODE_TLS_REJECT_UNAUTHORIZED=0 en .env.local si es crítico.
      // Por ahora usamos fetch estándar.
    };

    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error(`WooCommerce API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // 🛑 SANITIZACIÓN DE IMÁGENES: Filtrar URLs rotas de IA
    const sanitizedData = Array.isArray(data) ? data.map((product: any) => ({
      ...product,
      images: product.images?.filter((img: any) =>
        img.src && !img.src.includes("Gemini_Generated_Image")
      ) || []
    })) : data;

    const totalPages = response.headers.get("x-wp-totalpages");

    return NextResponse.json(sanitizedData, {
      headers: {
        "X-WP-TotalPages": totalPages || "0",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("=====================================");
    console.error("🔥 ERROR DE WOOCOMMERCE:", error);
    console.error("=====================================");

    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}
