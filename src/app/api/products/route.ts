import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function GET(request: Request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WOO_BASE_URL;
    const key = process.env.WOO_CONSUMER_KEY;
    const secret = process.env.WOO_CONSUMER_SECRET;

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const per_page = searchParams.get("per_page") || "12";

    const response = await axios.get(`${baseUrl}/wp-json/wc/v3/products`, {
      params: { per_page, page },
      auth: {
        username: key!,
        password: secret!,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError;

    console.error(
      "Error al obtener productos:",
      err.response?.data || err.message
    );

    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: err.response?.status || 500 }
    );
  }
}
