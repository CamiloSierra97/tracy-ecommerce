import WooCommerceService, { OrderData } from "@/services/WooCommerceService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: OrderData = await request.json();

    // Validación básica de datos obligatorios
    if (!body.billing || !body.line_items || body.line_items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Datos de orden inválidos o incompletos." },
        { status: 400 }
      );
    }

    // Crear la orden usando el servicio (Server-Side)
    // Esto protege las credenciales de WooCommerce
    const result = await WooCommerceService.createOrder(body);

    if (result.success && result.order) {
      return NextResponse.json({
        success: true,
        orderId: result.order.id,
        orderKey: result.order.number, // O order_key si se necesita para tracking
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Error al procesar la orden.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API /api/orders Error:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
