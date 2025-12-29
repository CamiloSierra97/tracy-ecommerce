"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { submitReview } from "@/app/actions/product-actions";

interface ReviewFormProps {
  productId: number;
  productName: string;
}

export default function ReviewForm({
  productId,
  productName,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setMessage(null);

    // Validar puntuación manualmente ya que no es un input estándar
    if (rating === 0) {
      setMessage({
        type: "error",
        text: "Por favor selecciona una puntuación.",
      });
      setIsSubmitting(false);
      return;
    }

    formData.append("productId", productId.toString());
    formData.append("rating", rating.toString());

    try {
      const result = await submitReview(formData);
      if (result.success) {
        setMessage({
          type: "success",
          text: "Tu valoración ha sido enviada con éxito. Espera a que sea aprobada.",
        });
        setRating(0);
        // Reiniciar formulario
        const form = document.querySelector("form") as HTMLFormElement;
        form.reset();
      } else {
        setMessage({
          type: "error",
          text: result.message || "Error al enviar la valoración.",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Ocurrió un error inesperado." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form border border-burgundy/20 p-6 md:p-8 rounded-sm bg-ivory mt-10">
      <h3 className="text-xl font-serif text-burgundy font-medium mb-1">
        Sé el primero en valorar &ldquo;{productName}&rdquo;
      </h3>
      <p className="text-sm text-black/50 mb-6">
        Tu dirección de correo electrónico no será publicada. Los campos
        obligatorios están marcados con *
      </p>

      {message && (
        <div
          className={`p-4 mb-6 text-sm rounded ${
            message.type === "success"
              ? "bg-light-gold text-black/70"
              : "bg-burgundy/20 text-black/70"
          }`}
        >
          {message.text}
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        {/* Campo de Puntuación */}
        <div className="form-group">
          <label className="block text-sm font-medium text-black/70 mb-2">
            Tu puntuación *
          </label>
          <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => {
              const filled = (hoverRating || rating) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  aria-label={`Puntuar ${star} estrellas`}
                >
                  <Icon
                    name={filled ? "icon-filled-star" : "icon-notfilled-star"}
                    size={24}
                    className={`transition-colors ${
                      filled ? "text-golden" : "text-burgundy/60"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Campo de Comentario */}
        <div className="form-group">
          <label
            htmlFor="review"
            className="block text-sm font-medium text-black/70 mb-2"
          >
            Tu valoración *
          </label>
          <textarea
            id="review"
            name="review"
            rows={4}
            required
            className="w-full border border-black/30 px-4 py-3 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-colors rounded-sm bg-ivory/20"
          ></textarea>
        </div>

        {/* Campos de Nombre y Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black/70 mb-2"
            >
              Nombre *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-black/30 px-4 py-3 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-colors rounded-sm bg-ivory/20"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black/70 mb-2"
            >
              Correo electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-black/30 px-4 py-3 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-colors rounded-sm bg-ivory/20"
            />
          </div>
        </div>

        {/* Casilla de Verificación */}
        <div className="form-group flex items-start gap-3">
          <input
            type="checkbox"
            id="save-info"
            name="save-info"
            className="mt-1 border-black/30 text-burgundy focus:ring-gold rounded-sm"
          />
          <label htmlFor="save-info" className="text-sm text-black/60">
            Guarda mi nombre, correo electrónico y web en este navegador para la
            próxima vez que comente.
          </label>
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 border border-burgundy text-burgundy font-medium tracking-widest text-sm hover:bg-burgundy hover:text-white transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
