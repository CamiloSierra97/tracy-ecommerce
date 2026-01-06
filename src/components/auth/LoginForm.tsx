"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { AuthError } from "next-auth"; // Import type if possible, or we check string code
import Icon from "@/components/ui/Icon";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        // Manejar error (next-auth v5 retorna undefined en éxito si redirect:false, o un objeto de error)
        console.error(result.error);
        setError("Usuario y/o contraseña equivocada");
      } else {
        // éxito, el modal debería actuar en consecuencia (quizás cerrarse, pero la página se refrescará si la sesión se actualiza)
        // Por ahora solo actualicemos la página
        window.location.reload();
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("CredentialsSignin")
      ) {
        // Fallo esperado por credenciales inválidas (NextAuth v5 beta)
        setError("Usuario y/o contraseña equivocada");
      } else {
        console.error("Login failed", error);
        setError("Ocurrió un error inesperado al iniciar sesión.");
      }
    }

    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    signIn("google");
  };

  return (
    <div className="login-form flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="login-form__form flex flex-col gap-4"
      >
        <div className="login-form__field">
          <label className="login-form__label block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            name="email"
            type="email"
            required
            className="login-form__input input-base"
            placeholder="tu@email.com"
          />
        </div>
        <div className="login-form__field">
          <label className="login-form__label block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            name="password"
            type="password"
            required
            className="login-form__input input-base"
            placeholder="********"
          />
        </div>

        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-2 rounded-sm text-center"
          >
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            className="login-form__forgot-password text-sm text-gray-500 hover:text-burgundy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold"
          >
            Olvidé mi contraseña
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="login-form__submit-btn btn-animate w-full bg-burgundy text-white py-2 font-medium hover:bg-burgundy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold"
        >
          {isLoading ? "Cargando..." : "Entrar"}
        </button>
      </form>

      <div className="login-form__divider relative flex items-center justify-center my-2">
        <div className="login-form__divider-line absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <span className="login-form__divider-text relative bg-white px-2 text-sm text-gray-500">
          O continúa con
        </span>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="login-form__social-btn w-full border border-gray-300 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium">Google</span>
      </button>
    </div>
  );
}
