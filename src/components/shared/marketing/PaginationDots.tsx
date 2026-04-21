interface PaginationDotsProps {
  count: number;
  current: number;
  onDotClick: (index: number) => void;
}

export default function PaginationDots({
  count,
  current,
  onDotClick,
}: PaginationDotsProps) {
  return (
    <div className="hero-carousel__pagination absolute bottom-4 md:bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl scale-90 md:scale-100">
      {[...Array(count)].map((_, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            onDotClick(index);
          }}
          className={`hero-carousel__dot transition-all duration-500 rounded-full ${
            current === index
              ? "hero-carousel__dot--active bg-gold w-8 h-1.5 opacity-100 shadow-[0_0_12px_rgba(217,179,56,0.6)]"
              : "hero-carousel__dot--inactive bg-white/40 w-1.5 h-1.5 hover:bg-white hover:scale-125 hover:shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
