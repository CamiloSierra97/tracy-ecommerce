"use client";

import { useState } from "react";
import { registerUser } from "@/actions/auth-actions";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(null, formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(result.message!);
      e.currentTarget.reset();
    }

    setIsLoading(false);
  };

  return (
    <div className="register-form flex flex-col gap-4">
      {error && (
        <div className="register-form__alert register-form__alert--error bg-red-50 text-red-600 p-3 text-sm rounded-sm border border-red-100">
          {error}
        </div>
      )}
      {success && (
        <div className="register-form__alert register-form__alert--success bg-green-50 text-green-600 p-3 text-sm rounded-sm border border-green-100">
          {success}
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
            className="register-form__input w-full border border-gold/30 p-2 focus:outline-none focus:border-burgundy transition-colors"
            placeholder="tu@email.com"
          />
        </div>
        <div className="register-form__field-group grid grid-cols-2 gap-4">
          <div className="register-form__field">
            <label className="register-form__label block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              name="firstName"
              type="text"
              required
              className="register-form__input w-full border border-gold/30 p-2 focus:outline-none focus:border-burgundy transition-colors"
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
              className="register-form__input w-full border border-gold/30 p-2 focus:outline-none focus:border-burgundy transition-colors"
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
            className="register-form__input w-full border border-gold/30 p-2 focus:outline-none focus:border-burgundy transition-colors"
          />
        </div>
        <div className="register-form__field">
          <label className="register-form__label block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            name="password"
            type="password"
            required
            className="register-form__input w-full border border-gold/30 p-2 focus:outline-none focus:border-burgundy transition-colors"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="register-form__submit-btn w-full bg-burgundy text-white py-2 font-medium hover:bg-burgundy/90 transition-colors disabled:opacity-50 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {isLoading ? "Registrarse" : "Crear Cuenta"}
        </button>
      </form>
    </div>
  );
}
