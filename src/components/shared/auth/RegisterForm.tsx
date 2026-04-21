"use client";

import ButtonSpinner from "@/components/shared/ui/ButtonSpinner";
import Icon from "@/components/shared/ui/Icon";
import { useState } from "react";
import { registerUser } from "@/actions/auth-actions";
import { useUI } from "@/context/UIContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { closeAuth, showToast } = useUI();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    const result = await registerUser(null, formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      // Auto-login
      try {
        const loginResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginResult?.error) {
          // Si el login falla aunque el registro fue exitoso (raro), mostrar mensaje genérico
          showToast("Cuenta creada. Por favor inicia sesión.");
        } else {
          showToast(result.message || "¡Bienvenido! Cuenta creada con éxito");
          closeAuth();
          router.refresh();
        }
      } catch (error) {
        console.error("Auto-login failed:", error);
        showToast("Cuenta creada. Por favor inicia sesión.");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="register-form flex flex-col gap-4">
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="register-form__alert register-form__alert--error bg-red-50 text-red-600 p-3 text-sm rounded-sm border border-red-100"
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="register-form__form flex flex-col gap-4"
      >
        <div className="register-form__field">
          <label className="register-form__label block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            name="email"
            type="email"
            required
            className="register-form__input input-base"
            placeholder="Correo electrónico"
          />
        </div>
        <div className="register-form__field-group register-form__row grid grid-cols-2 gap-4">
          <div className="register-form__field">
            <label className="register-form__label block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              name="firstName"
              type="text"
              required
              className="register-form__input input-base"
              placeholder="Nombre"
            />
          </div>
          <div className="register-form__field">
            <label className="register-form__label block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <input
              name="lastName"
              type="text"
              required
              className="register-form__input input-base"
              placeholder="Apellido"
            />
          </div>
        </div>
        <div className="register-form__field">
          <label className="register-form__label block text-sm font-medium text-gray-700 mb-1">
            Usuario
          </label>
          <input
            name="username"
            type="text"
            required
            className="register-form__input input-base"
            placeholder="Crea un nombre de usuario"
          />
        </div>
        <div className="register-form__field">
          <label className="register-form__label block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            name="phone"
            type="tel"
            className="register-form__input input-base"
            placeholder="Teléfono móvil"
          />
        </div>
        <div className="register-form__field">
          <label className="register-form__label block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="register-form__input input-base pr-10"
              placeholder="Nueva contraseña"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 h-full px-3 text-burgundy/60 hover:text-burgundy transition-colors focus:outline-none z-10"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              <Icon
                name={showPassword ? "icon-eye-off" : "icon-eye"}
                size={20}
              />
            </button>
          </div>
        </div>
        <div className="register-form__field">
          <label className="register-form__label block text-sm font-medium text-gray-700 mb-1">
            Confirmar Contraseña
          </label>
          <input
            name="confirmPassword"
            type="password"
            required
            className="register-form__input input-base"
            placeholder="Repite tu contraseña"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="register-form__submit-btn btn-animate w-full bg-burgundy text-white py-3 font-medium hover:bg-burgundy/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold flex justify-center items-center gap-2 rounded-sm"
        >
          {isLoading ? (
            <>
              <ButtonSpinner />
              <span>Registrando...</span>
            </>
          ) : (
            "Crear Cuenta"
          )}
        </button>
      </form>
    </div>
  );
}
