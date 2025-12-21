import { NextResponse } from "next/server";
import config from "@/lib/config";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { url, consumerKey, consumerSecret } = config.woocommerce;

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64"
    );

    const response = await fetch(`${url}/wp-json/wc/v3/products/${id}`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `WooCommerce API Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: 500 }
    );
  }
}
