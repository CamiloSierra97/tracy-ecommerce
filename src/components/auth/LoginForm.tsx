"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import Icon from "@/components/ui/Icon"

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)

        try {
            const result = await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
            })

            if (result?.error) {
                // Handle error (next-auth v5 returns undefined on success if redirect:false, or error object)
                // Actually in v5 client signIn returns nothing on success ? wait.
                // console.log(result)
            } else {
                // success, modal should act accordingly (maybe close, but page will refresh if session updates)
                // For now let's just refresh page
                window.location.reload()
            }
        } catch (error) {
            console.error("Login failed", error)
        }

        setIsLoading(false)
    }

    const handleGoogleLogin = () => {
        signIn("google")
    }

    return (
        <div className="login-form flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="login-form__form flex flex-col gap-4">
                <div className="login-form__field">
                    <label className="login-form__label block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                    <input
                        name="email"
                        type="email"
                        required
                        className="login-form__input w-full border border-gold/30 p-2 focus:outline-none focus:border-burgundy transition-colors"
                        placeholder="tu@email.com"
                    />
                </div>
                <div className="login-form__field">
                    <label className="login-form__label block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input
                        name="password"
                        type="password"
                        required
                        className="login-form__input w-full border border-gold/30 p-2 focus:outline-none focus:border-burgundy transition-colors"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="login-form__submit-btn w-full bg-burgundy text-white py-2 font-medium hover:bg-burgundy/90 transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Cargando..." : "Ingresar"}
                </button>
            </form>

            <div className="login-form__divider relative flex items-center justify-center my-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <span className="relative bg-white px-2 text-sm text-gray-500">O continúa con</span>
            </div>

            <button
                onClick={handleGoogleLogin}
                className="login-form__social-btn w-full border border-gray-300 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
                <span className="font-medium">Google</span>
            </button>
        </div>
    )
}
