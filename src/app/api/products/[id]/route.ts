import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WOO_BASE_URL;
    const key = process.env.WOO_CONSUMER_KEY;
    const secret = process.env.WOO_CONSUMER_SECRET;

    const response = await axios.get(`${baseUrl}/wp-json/wc/v3/products/categories`, {
      auth: {
        username: key!,
        password: secret!,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error al obtener categorías:", err.response?.data || err.message);
    return NextResponse.json(
      { error: "Error al obtener categorías" },
      { status: err.response?.status || 500 }
    );
  }
}
