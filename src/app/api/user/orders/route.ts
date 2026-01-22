import WooCommerceService from "@/services/WooCommerceService";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  try {
    const email = session.user.email;

    // 1. Obtener el cliente por email para conseguir su ID
    const customer = await WooCommerceService.getCustomerByEmail(email);

    if (!customer) {
      return NextResponse.json(
        { message: "Cliente no encontrado" },
        { status: 404 },
      );
    }

    // 2. Obtener órdenes usando el ID del cliente
    const orders = await WooCommerceService.getCustomerOrders(customer.id);

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
