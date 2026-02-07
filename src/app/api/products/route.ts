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
      console.error("WooCommerce environment variables are missing");
      return NextResponse.json(
        {
          error: "Configuración del servidor incompleta (Faltan credenciales)",
        },
        { status: 500 }
      );
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64"
    );

    const params = new URLSearchParams({ per_page, page });
    if (slug) params.append("slug", slug);

    const response = await fetch(
      `${url}/wp-json/wc/v3/products?${params.toString()}`,
      { headers: { Authorization: `Basic ${auth}` } }
    );

    if (!response.ok) {
      throw new Error(
        `WooCommerce API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Sanitize images: filter out broken AI-generated URLs
    const sanitizedData = Array.isArray(data)
      ? data.map((product: Record<string, unknown>) => ({
          ...product,
          images:
            (product.images as { src?: string }[] | undefined)?.filter(
              (img) => img.src && !img.src.includes("Gemini_Generated_Image")
            ) ?? [],
        }))
      : data;

    const totalPages = response.headers.get("x-wp-totalpages");

    return NextResponse.json(sanitizedData, {
      headers: {
        "X-WP-TotalPages": totalPages || "0",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("WooCommerce API error:", error);

    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}
