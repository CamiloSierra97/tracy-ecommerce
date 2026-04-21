import Icon from "@/components/shared/ui/Icon";

interface StarRatingProps {
  rating: number; // 0 a 5
  size?: number;
  className?: string;
}

export default function StarRating({
  rating,
  size = 16,
  className = "",
}: StarRatingProps) {
  // Asegurar que la calificación esté entre 0 y 5
  const clampedRating = Math.max(0, Math.min(5, rating));

  // Crear un array de 5 elementos
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    // Comprobar si es una estrella llena, media o vacía
    if (clampedRating >= starValue) {
      return "full";
    } else if (clampedRating >= starValue - 0.5) {
      return "half";
    } else {
      return "empty";
    }
  });

  return (
    <div
      role="img"
      className={`star-rating flex gap-1 ${className}`}
      aria-label={`Calificación: ${rating} de 5 estrellas`}
    >
      {stars.map((type, i) => (
        <span key={i} className="star-rating__star text-gold-dark">
          <Icon
            name={
              type === "full"
                ? "icon-filled-star"
                : type === "half"
                  ? "icon-half-star"
                  : "icon-notfilled-star"
            }
            size={size}
            className={type === "empty" ? "text-black/50" : ""}
          />
        </span>
      ))}
    </div>
  );
}
