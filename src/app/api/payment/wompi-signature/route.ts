import WompiService from "@/services/WompiService";
import config from "@/lib/config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reference, amount } = body;

    if (!reference || !amount) {
      return NextResponse.json(
        { message: "Faltan datos requeridos (referencia o monto)" },
        { status: 400 },
      );
    }

    const currency = config.wompi.currency;
    const amountInCents = WompiService.amountToCents(Number(amount));
    const signature = WompiService.generateSignature(
      reference,
      amountInCents,
      currency,
    );

    return NextResponse.json({
      signature,
      reference,
      amountInCents,
      currency,
      publicKey: config.wompi.publicKey, // Enviamos la pública para facilitar frontend
    });
  } catch (error) {
    console.error("Error generando firma de Wompi:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
