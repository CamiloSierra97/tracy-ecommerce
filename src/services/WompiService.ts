import crypto from "crypto";
import config from "@/lib/config";

const WompiService = {
  /**
   * Genera la firma de integridad requerida por Wompi.
   * Format: SHA256(Reference + AmountInCents + Currency + IntegritySecret)
   */
  generateSignature: (
    reference: string,
    amountInCents: number, // Wompi usa centavos para COP (ej: 1000000 para $10.000)
    currency: string,
  ): string => {
    const { integritySecret } = config.wompi;

    if (!integritySecret) {
      console.error(
        "Falta el secreto de integridad de Wompi en la configuración.",
      );
      return "";
    }

    const chain = `${reference}${amountInCents}${currency}${integritySecret}`;
    const signature = crypto.createHash("sha256").update(chain).digest("hex");

    return signature;
  },

  /**
   * Convierte el monto a centavos (formato Wompi).
   * Ej: 10000 -> 1000000
   */
  amountToCents: (amount: number): number => {
    return Math.round(amount * 100);
  },
};

export default WompiService;
