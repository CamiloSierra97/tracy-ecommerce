import Icon from "../ui/Icon";

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
}

export default function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={`hero-carousel__arrow hero-carousel__arrow--${isLeft ? "prev" : "next"} group absolute ${isLeft ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-20 
                 animate-pulse-scale
                 bg-black/30 hover:bg-black/50 text-gold
                 p-4 rounded-full backdrop-blur-sm border border-gold/50 
                 transition-all duration-300 transform hover:scale-110 shadow-lg`}
      aria-label={isLeft ? "Diapositiva anterior" : "Siguiente diapositiva"}
    >
      <div
        className={`hero-carousel__container transform transition-transform duration-300 group-hover:${isLeft ? "-translate-x-2" : "translate-x-2"}`}
      >
        <Icon
          name={isLeft ? "icon-arrow-left-dashed" : "icon-arrow-right-dashed"}
          size={24}
        />
      </div>
    </button>
  );
}
