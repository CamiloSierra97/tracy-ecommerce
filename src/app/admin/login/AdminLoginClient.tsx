"use client";

import Icon from "@/components/ui/Icon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin/register");
      } else {
        setError(data.message || "Credenciales inválidas");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-burgundy/10 via-ivory to-gold/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-login__card w-full max-w-md"
      >
        <div className="glassmorphism rounded-3xl shadow-premium p-8 border border-gold/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-burgundy/10 mb-4">
              <Icon name="icon-user" size={32} className="text-burgundy" />
            </div>
            <h1 className="text-3xl font-serif text-burgundy mb-2">
              Admin Panel
            </h1>
            <p className="text-sm text-black/60">
              Iniciar sesión como administrador
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black/80 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-burgundy/50 focus:border-burgundy transition-all"
                placeholder="Correo admin"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black/80 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                  <Icon
                    name={showPassword ? "icon-eye-off" : "icon-eye"}
                    size={20}
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy text-ivory py-4 rounded-xl font-bold tracking-wide hover:bg-burgundy/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-burgundy/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin"></div>
                  Verificando...
                </>
              ) : (
                <>
                  <Icon name="icon-lock" size={20} />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-black/60 hover:text-burgundy transition-colors inline-flex items-center gap-1"
            >
              <Icon name="icon-arrow-left" size={16} />
              Volver al sitio
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
