"use server"

import { z } from "zod"

const RegisterSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    password: z.string().min(6),
})

export async function registerUser(prevState: any, formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        email: formData.get("email"),
        username: formData.get("username"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        password: formData.get("password"),
    })

    if (!validatedFields.success) {
        return {
            error: "Datos inválidos. Verifica los campos.",
            details: validatedFields.error.flatten().fieldErrors
        }
    }

    const { email, username, firstName, lastName, password } = validatedFields.data

    try {
        const response = await fetch(`${process.env.WOOCOMMERCE_API_URL}/wp-json/wc/v3/customers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: Basic base64(consumerk_key:consumer_secret)
                "Authorization": "Basic " + Buffer.from(`${process.env.WOO_CONSUMER_KEY}:${process.env.WOO_CONSUMER_SECRET}`).toString("base64")
            },
            body: JSON.stringify({
                email,
                username,
                first_name: firstName,
                last_name: lastName,
                password
            })
        })

        const data = await response.json()

        if (!response.ok) {
            console.error("WooCommerce Registration Error:", data)
            return {
                error: data.message || "Error al registrar usuario."
            }
        }

        return {
            success: true,
            message: "Cuenta creada exitosamente. Por favor inicia sesión."
        }

    } catch (error) {
        console.error("Registration Exception:", error)
        return {
            error: "Error de conexión con el servidor."
        }
    }
}
