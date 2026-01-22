import WooCommerceService from "@/services/WooCommerceService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Código requerido." },
        { status: 400 }
      );
    }

    const coupon = await WooCommerceService.getCouponByCode(code);

    if (!coupon || coupon.status !== "publish") {
      return NextResponse.json(
        { success: false, message: "Cupón no válido o expirado." },
        { status: 404 }
      );
    }

    // Retornamos solo lo necesario al cliente
    return NextResponse.json({
      success: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        amount: coupon.amount,
        discount_type: coupon.discount_type,
        minimum_amount: coupon.minimum_amount,
        description: coupon.description,
      },
    });
  } catch (error) {
    console.error("API /api/coupons Error:", error);
    return NextResponse.json(
      { success: false, message: "Error al validar el cupón." },
      { status: 500 }
    );
  }
}
