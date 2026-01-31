import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import WooCommerceService from "@/services/WooCommerceService";

export async function POST(request: Request) {
  try {
    // Verificar autenticación admin
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin-session");

    if (adminSession?.value !== "authenticated") {
      return NextResponse.json(
        {
          success: false,
          message: "No autorizado",
        },
        { status: 401 },
      );
    }

    const { email, firstName, lastName, username, password } =
      await request.json();

    // Validar campos requeridos
    if (!email || !firstName || !lastName || !username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Todos los campos son requeridos",
        },
        { status: 400 },
      );
    }

    // Crear usuario en WooCommerce
    const result = await WooCommerceService.registerCustomer({
      email,
      first_name: firstName,
      last_name: lastName,
      username,
      password,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Usuario creado exitosamente",
        user: result.customer,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Error al crear usuario",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error en create-user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error del servidor",
      },
      { status: 500 },
    );
  }
}
