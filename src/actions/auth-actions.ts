"use server";

import WooCommerceService from "@/services/WooCommerceService";
import { z } from "zod";

const RegisterSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6),
  phone: z.string().optional(),
});

interface RegisterState {
  error?: string;
  success?: boolean;
  message?: string;
  details?: Record<string, string[] | undefined>;
}

export async function registerUser(
  prevState: RegisterState | null,
  formData: FormData,
) {
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
    phone: formData.get("phone"),
  });

  if (!validatedFields.success) {
    return {
      error: "Datos inválidos. Verifica los campos.",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, username, firstName, lastName, password, phone } =
    validatedFields.data;

  try {
    const result = await WooCommerceService.registerCustomer({
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      password,
      billing: phone ? { phone } : undefined,
    });

    if (!result.success) {
      return {
        error: result.message || "Error al registrar usuario.",
      };
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error("Registration Exception:", error);
    return {
      error: "Error de conexión con el servidor.",
    };
  }
}
