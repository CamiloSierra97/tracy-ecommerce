import Icon from "@/components/ui/Icon";

interface StarRatingProps {
  rating: number; // 0 to 5
  size?: number;
  className?: string;
}

export default function StarRating({
  rating,
  size = 16,
  className = "",
}: StarRatingProps) {
  // Ensure rating is between 0 and 5
  const clampedRating = Math.max(0, Math.min(5, rating));

  // Create an array of 5 items
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    // Check if it's a full star, half star, or empty star
    if (clampedRating >= starValue) {
      return "full";
    } else if (clampedRating >= starValue - 0.5) {
      // In this simple implementation, we'll treat half as empty or full depending on design preference
      // For now, let's keep it simple: if >= x.5, it's roughly full visually or we can use a half-star icon if available.
      // Since we only have 'icon-star' (usually filled), let's stick to filled/empty logic or opacity.
      // Ideally, we'd have 'icon-star-half', but let's assume 'icon-star' is filled.
      // We'll mimic "filled" for now for anything >= 0.5 threshold.
      return "full";
    } else {
      return "empty";
    }
  });

  return (
    <div
      className={`flex gap-1 ${className}`}
      aria-label={`Calificación: ${rating} de 5 estrellas`}
    >
      {stars.map((type, i) => (
        <span key={i} className="text-golden">
          <Icon
            name={type === "full" ? "icon-filled-star" : "icon-notfilled-star"}
            size={size}
            className={type === "full" ? "" : "text-black/50"}
          />
        </span>
      ))}
    </div>
  );
}
