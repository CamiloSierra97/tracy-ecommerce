import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import config from "@/lib/config";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Verificar credenciales admin
    if (email === config.admin.email && password === config.admin.password) {
      // Crear sesión simple con cookie
      const cookieStore = await cookies();
      cookieStore.set("admin-session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 horas
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Login exitoso",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Credenciales inválidas",
      },
      { status: 401 },
    );
  } catch (error) {
    console.error("Error en admin login:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error del servidor",
      },
      { status: 500 },
    );
  }
}
