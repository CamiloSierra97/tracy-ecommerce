import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import https from "https";

export async function GET(request: Request) {
  try {
    const WOO_BASE_URL = "https://shop.glowcosmeticoscol.com";
    const key = process.env.WOO_CONSUMER_KEY;
    const secret = process.env.WOO_CONSUMER_SECRET;

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const per_page = searchParams.get("per_page") || "12";

    // 👇 Ignorar certificado solo en desarrollo
    const agent =
      process.env.NODE_ENV === "development"
        ? new https.Agent({ rejectUnauthorized: false })
        : undefined;

    const response = await axios.get(`${WOO_BASE_URL}/wp-json/wc/v3/products`, {
      params: { per_page, page },
      auth: {
        username: key!,
        password: secret!,
      },
      httpsAgent: agent, //Ignora SSL en Dev
    });

    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError;

    // 💡 ¡Añade este log para ver la respuesta completa de WooCommerce!
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
