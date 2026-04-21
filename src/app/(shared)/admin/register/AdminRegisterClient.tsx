"use client";

import Icon from "@/components/shared/ui/Icon";
import UserRegistrationForm from "@/components/shared/admin/UserRegistrationForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminRegisterClient() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="admin-register min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-burgundy/10 via-ivory to-gold/10">
      <div className="w-full max-w-2xl">
        <div className="glassmorphism rounded-3xl shadow-premium p-8 border border-gold/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-burgundy/10 mb-4">
              <Icon name="icon-user" size={32} className="text-burgundy" />
            </div>
            <h1 className="text-3xl font-serif text-burgundy mb-2">
              Registro Manual de Usuarios
            </h1>
            <p className="text-sm text-black/60">
              Crear nuevos usuarios en el sistema
            </p>
          </div>

          {/* Form */}
          <UserRegistrationForm />

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-black/10 flex justify-between items-center">
            <Link
              href="/"
              className="text-sm text-black/60 hover:text-burgundy transition-colors inline-flex items-center gap-1"
            >
              <Icon name="icon-arrow-left" size={16} />
              Volver al sitio
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-black/60 hover:text-burgundy transition-colors inline-flex items-center gap-1"
            >
              Cerrar Sesión
              <Icon name="icon-lock" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
