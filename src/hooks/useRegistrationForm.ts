import { useState } from "react";

export interface RegistrationFormData {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const initialFormData: RegistrationFormData = {
  email: "",
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

export function useRegistrationForm() {
  const [formData, setFormData] =
    useState<RegistrationFormData>(initialFormData);
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

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

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
        resetForm();
      } else {
        setError(data.message || "Error al crear usuario");
      }
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
