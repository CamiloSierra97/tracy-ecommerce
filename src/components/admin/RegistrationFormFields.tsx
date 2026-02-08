"use client";

import Icon from "@/components/ui/Icon";
import { RegistrationFormData } from "@/hooks/useRegistrationForm";

interface RegistrationFormFieldsProps {
  formData: RegistrationFormData;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onShowPasswordToggle: () => void;
  onShowConfirmPasswordToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RegistrationFormFields({
  formData,
  showPassword,
  showConfirmPassword,
  onShowPasswordToggle,
  onShowConfirmPasswordToggle,
  onChange,
}: RegistrationFormFieldsProps) {
  const passwordsMatch =
    !formData.confirmPassword || formData.password === formData.confirmPassword;

  return (
    <>
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-black/80 mb-2"
        >
          Email *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy transition-all"
          placeholder="usuario@ejemplo.com"
        />
      </div>

      {/* First Name */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-black/80 mb-2"
        >
          Nombre *
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          required
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy transition-all"
          placeholder="Juan"
        />
      </div>

      {/* Last Name */}
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-black/80 mb-2"
        >
          Apellido *
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          required
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy transition-all"
          placeholder="Pérez"
        />
      </div>

      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-black/80 mb-2"
        >
          Username *
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={onChange}
          required
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy transition-all"
          placeholder="usuario"
        />
        <p className="text-xs text-black/50 mt-1">
          Se genera automáticamente desde el email
        </p>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-black/80 mb-2"
        >
          Teléfono *
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          required
          pattern="[0-9+\s()-]{7,}"
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy transition-all"
          placeholder="+57 300 123 4567"
        />
        <p className="text-xs text-black/50 mt-1">Incluye código de país</p>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-black/80 mb-2"
        >
          Contraseña *
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={onChange}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy transition-all pr-12"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={onShowPasswordToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-burgundy transition-colors"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            <Icon name={showPassword ? "icon-eye-off" : "icon-eye"} size={20} />
          </button>
        </div>
        <p className="text-xs text-black/50 mt-1">Mínimo 6 caracteres</p>
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-black/80 mb-2"
        >
          Confirmar Contraseña *
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
            required
            minLength={6}
            className={`w-full px-4 py-3 rounded-xl border bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy transition-all pr-12 ${
              !passwordsMatch ? "border-red-400" : "border-black/10"
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={onShowConfirmPasswordToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-burgundy transition-colors"
            aria-label={
              showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            <Icon
              name={showConfirmPassword ? "icon-eye-off" : "icon-eye"}
              size={20}
            />
          </button>
        </div>
        {!passwordsMatch && (
          <p className="text-xs text-red-500 mt-1">
            Las contraseñas no coinciden
          </p>
        )}
      </div>
    </>
  );
}
