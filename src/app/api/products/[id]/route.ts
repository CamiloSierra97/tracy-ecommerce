import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import config from "@/lib/config";
import https from "https";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { url, consumerKey, consumerSecret } = config.woocommerce;

    // 👇 Ignorar certificado solo en desarrollo
    const agent =
      process.env.NODE_ENV === "development"
        ? new https.Agent({ rejectUnauthorized: false })
        : undefined;

    const response = await axios.get(`${url}/wp-json/wc/v3/products/${id}`, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
      httpsAgent: agent,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error fetching product:", err.response?.data || err.message);
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: err.response?.status || 500 }
    );
  }
}
