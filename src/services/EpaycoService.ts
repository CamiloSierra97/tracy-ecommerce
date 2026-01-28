import config from "@/lib/config";
import { Buffer } from "buffer";

const BASE_URL = config.epayco.isTest
  ? "https://api.secure.payco.co" // URL de pruebas (verificar si es distinta) - ePayco usa la misma URL base y la llave define el entorno usualmente, pero APIFY puede variar.
  : "https://api.secure.payco.co"; // URL Producción

interface EpaycoLoginResponse {
  status: boolean;
  token: string;
  data: any;
}

class EpaycoService {
  private token: string | null = null;
  private tokenExpiration: number | null = null;

  /**
   * Obtiene el token de autenticación (Bearer Token) necesario para las peticiones a APIFY.
   * Maneja caché simple en memoria para evitar logins innecesarios.
   */
  async login(): Promise<string> {
    if (
      this.token &&
      this.tokenExpiration &&
      Date.now() < this.tokenExpiration
    ) {
      return this.token;
    }

    try {
      const authString = `${config.epayco.publicKey}:${config.epayco.privateKey}`;
      const encodedAuth = Buffer.from(authString).toString("base64");

      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedAuth}`,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (data.token) {
        this.token = data.token as string;
        this.tokenExpiration = Date.now() + 10 * 60 * 1000;
        return this.token as string;
      } else {
        console.error("Respuesta ePayco Login fallida:", data);
        throw new Error(
          `No se recibió token. Estado: ${response.status}. Mensaje: ${JSON.stringify(data)}`,
        );
      }
    } catch (error) {
      console.error("Error en Epayco Login:", error);
      throw error;
    }
  }

  /**
   * Crea una transacción de tarjeta de crédito (o cualquier método soportado por APIFY).
   * Requiere que la tarjeta ya esté tokenizada o se envíen los datos seguros (solo SERVER SIDE).
   */
  async createTransaction(paymentData: any) {
    const token = await this.login();

    try {
      const response = await fetch(`${BASE_URL}/payment/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      return await response.json();
    } catch (error) {
      console.error("Error procesando pago ePayco:", error);
      throw error;
    }
  }
}

export default new EpaycoService();
