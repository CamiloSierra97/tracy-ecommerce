import WooCommerceService from "@/services/WooCommerceService";
import config from "@/lib/config";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Intentar login con WooCommerce (JWT Auth)
    const loginResult = await WooCommerceService.loginCustomer({
      email,
      password,
    });

    if (loginResult.success && loginResult.user && loginResult.token) {
      const { url } = config.woocommerce;
      let hasAdminRole = false;
      let userRoles: string[] = [];

      try {
        // Intentar obtener roles desde WP User API (más confiable para admins)
        const wpUserRes = await fetch(
          `${url.replace(/\/$/, "")}/wp-json/wp/v2/users/me`,
          {
            headers: {
              Authorization: `Bearer ${loginResult.token}`,
            },
          },
        );

        if (wpUserRes.ok) {
          const wpUser = await wpUserRes.json();
          console.log("[DEBUG] WP User JWT:", wpUser);
          userRoles = wpUser.roles || [];
          console.log("[DEBUG] Roles from JWT:", userRoles);
        } else {
          console.log(
            "[DEBUG] WP User JWT failed:",
            wpUserRes.status,
            await wpUserRes.text(),
          );
        }
      } catch (wpError) {
        console.error("[AdminLogin] Error fetching WP roles via JWT:", wpError);
      }

      // Fallback 1: Buscar por email usando API Keys en endpoint de Usuarios de WP
      if (userRoles.length === 0) {
        console.log("[DEBUG] Intentando Fallback 1: getWPUserByEmail");
        const wpUser = await WooCommerceService.getWPUserByEmail(email);
        console.log("[DEBUG] WP User from API:", wpUser);
        if (wpUser?.roles) {
          userRoles = wpUser.roles;
          console.log("[DEBUG] Roles from WP API:", userRoles);
        }
      }

      // Fallback 2: Buscar por email usando API Keys en endpoint de Clientes de WooCommerce
      if (userRoles.length === 0) {
        console.log("[DEBUG] Intentando Fallback 2: getCustomerByEmail");
        const customer = await WooCommerceService.getCustomerByEmail(email);
        console.log("[DEBUG] Customer from WC API:", customer);
        if (customer?.role) {
          userRoles = [customer.role];
          console.log("[DEBUG] Roles from WC Customer:", userRoles);
        }
      }

      // Verificar si alguno de los roles es administrativo
      const adminRoles = [
        "administrator",
        "shop_manager",
        "gestor_de_la_tienda",
        "administrador",
      ];
      console.log("[DEBUG] Final userRoles:", userRoles);
      hasAdminRole = userRoles.some((role) =>
        adminRoles.includes(role.toLowerCase()),
      );
      console.log("[DEBUG] hasAdminRole:", hasAdminRole);

      if (hasAdminRole) {
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
          message: `No tienes permisos de administrador. Roles encontrados: [${userRoles.join(", ")}]`,
        },
        { status: 403 },
      );
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
