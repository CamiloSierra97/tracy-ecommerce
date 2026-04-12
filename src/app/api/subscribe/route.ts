import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Aquí iría la integración con Mailchimp, Klaviyo, o la DB de leads
    // Por ahora solo logueamos que funciona exitosamente para dejar rastro de su recepción real
    console.log("Nuevo lead recibido desde PromoModal:", data);
    
    return NextResponse.json({ success: true, message: "Suscripción exitosa" });
  } catch (error) {
    console.error("Error procesando suscripción:", error);
    return NextResponse.json(
      { success: false, message: "Error interno al procesar suscripción" },
      { status: 500 }
    );
  }
}
