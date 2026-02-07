"use client";

import Icon from "@/components/ui/Icon";
import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export default function UserRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generar username desde email si está vacío
    if (name === "email" && !formData.username) {
      const username = value.split("@")[0];
      setFormData((prev) => ({ ...prev, username }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(`Usuario ${formData.email} creado exitosamente!`);
        // Resetear formulario
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          username: "",
          password: "",
          confirmPassword: "",
          phone: "",
        });
      } else {
        setError(data.message || "Error al crear usuario");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
        >
          <div className="flex items-center gap-2">
            <Icon name="icon-close" size={18} />
            {error}
          </div>
        </motion.div>
      )}

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"
        >
          <div className="flex items-center gap-2">
            <Icon name="icon-check" size={18} />
            {success}
          </div>
        </motion.div>
      )}

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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy transition-all pr-12"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
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
            onChange={handleChange}
            required
            minLength={6}
            className={`w-full px-4 py-3 rounded-xl border bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy transition-all pr-12 ${
              formData.confirmPassword &&
              formData.password !== formData.confirmPassword
                ? "border-red-400"
                : "border-black/10"
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
        {formData.confirmPassword &&
          formData.password !== formData.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              Las contraseñas no coinciden
            </p>
          )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-burgundy text-ivory py-4 rounded-xl font-bold tracking-wide hover:bg-burgundy/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-burgundy/20 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin"></div>
            Creando Usuario...
          </>
        ) : (
          <>
            <Icon name="icon-user" size={20} />
            Crear Usuario
          </>
        )}
      </button>
    </form>
  );
}
