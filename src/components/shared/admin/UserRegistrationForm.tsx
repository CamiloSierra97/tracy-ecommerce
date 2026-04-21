"use client";

import Icon from "@/components/shared/ui/Icon";
import { motion } from "framer-motion";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import RegistrationFormFields from "./RegistrationFormFields";

export default function UserRegistrationForm() {
  const {
    formData,
    loading,
    error,
    success,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit,
  } = useRegistrationForm();

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

      <RegistrationFormFields
        formData={formData}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        onShowPasswordToggle={() => setShowPassword(!showPassword)}
        onShowConfirmPasswordToggle={() =>
          setShowConfirmPassword(!showConfirmPassword)
        }
        onChange={handleChange}
      />

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
