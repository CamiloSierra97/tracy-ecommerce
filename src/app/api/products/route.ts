import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import https from "https";

import config from "@/lib/config";

export async function GET(request: Request) {
  try {
    const { url, consumerKey, consumerSecret } = config.woocommerce;

    // 🕵️♂️ DEBUG: Vamos a ver si las variables existen
    console.log("------------------------------------------------");
    console.log("1. URL:", url); 
    console.log("2. Key existe:", !!consumerKey); // Solo true/false por seguridad
    console.log("3. Secret existe:", !!consumerSecret);
    console.log("------------------------------------------------");

    // Verificación rápida antes de intentar la petición
    if (!url || !url.startsWith('http')) {
        throw new Error(`La URL de WooCommerce no es válida: ${url}`);
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const per_page = searchParams.get("per_page") || "12";

    // 👇 Ignorar certificado solo en desarrollo
    const agent =
      process.env.NODE_ENV === "development"
        ? new https.Agent({ rejectUnauthorized: false })
        : undefined;

    const response = await axios.get(`${url}/wp-json/wc/v3/products`, {
      params: { per_page, page },
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
      httpsAgent: agent, //Ignora SSL en Dev
    }
  );
    // OBTENER LAS CABECERAS DE PAGINACIÓN
    const totalPages = response.headers["x-wp-totalpages"];
    console.log(totalPages);

    return NextResponse.json(response.data, {
      // AÑADIR LAS CABECERAS A LA RESPUESTA DE TU RUTA
      headers: {
        "X-WP-TotalPages": totalPages ? String(totalPages) : "0", // Pasamos la cabecera al Front
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    const err = error as AxiosError;
    console.error("=====================================");
    console.error("🔥 ERROR DE WOOCOMMERCE:");
    console.error("STATUS:", err.response?.status);
    console.error("HEADERS:", err.response?.headers);
    console.error("DATA (cuerpo de la respuesta):", err.response?.data);
    console.error("=====================================");
    

    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: err.response?.status || 500 }
    );
  }
}
