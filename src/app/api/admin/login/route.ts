import WooCommerceService from "@/services/WooCommerceService";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import config from "@/lib/config";

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
          userRoles = wpUser.roles || [];
          console.log("[AdminLogin] Raw WP Me User:", wpUser);
          console.log("[AdminLogin] Roles found in WP Me:", userRoles);
        } else {
          console.warn(
            "[AdminLogin] JWT User Me failed with status:",
            wpUserRes.status,
          );
          const errorBody = await wpUserRes.text();
          console.warn("[AdminLogin] JWT User Me error body:", errorBody);
        }
      } catch (wpError) {
        console.error("[AdminLogin] Error fetching WP roles via JWT:", wpError);
      }

      // Fallback 1: Buscar por email usando API Keys en endpoint de Usuarios de WP
      if (userRoles.length === 0) {
        const wpUser = await WooCommerceService.getWPUserByEmail(email);
        if (wpUser) {
          console.log("[AdminLogin] Raw WP User via API Keys:", wpUser);
          if (wpUser.roles) {
            userRoles = wpUser.roles;
            console.log("[AdminLogin] Roles found in WP API Keys:", userRoles);
          } else {
            console.warn(
              "[AdminLogin] WP User found via API Keys, but has NO roles property.",
            );
          }
        } else {
          console.warn(
            "[AdminLogin] WP User NOT found via API Keys for email:",
            email,
          );
        }
      }

      // Fallback 2: Buscar por email usando API Keys en endpoint de Clientes de WooCommerce
      if (userRoles.length === 0) {
        const customer = await WooCommerceService.getCustomerByEmail(email);
        if (customer) {
          console.log("[AdminLogin] Raw WC Customer:", customer);
          if (customer.role) {
            userRoles = [customer.role];
            console.log("[AdminLogin] Role found in WC Customer:", userRoles);
          } else {
            console.warn(
              "[AdminLogin] WC Customer found, but has NO role property.",
            );
          }
        } else {
          console.warn("[AdminLogin] WC Customer NOT found for email:", email);
        }
      }

      // Verificar si alguno de los roles es administrativo
      const adminRoles = [
        "administrator",
        "shop_manager",
        "gestor_de_la_tienda",
        "administrador",
      ];
      hasAdminRole = userRoles.some((role) =>
        adminRoles.includes(role.toLowerCase()),
      );

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
