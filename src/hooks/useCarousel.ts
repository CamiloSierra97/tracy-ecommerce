import { useState, useEffect, useRef, useCallback } from "react";

interface UseCarouselOptions {
  slidesCount: number;
  duration?: number;
}

export function useCarousel({
  slidesCount,
  duration = 8000,
}: UseCarouselOptions) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slidesCount);
  }, [slidesCount]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slidesCount) % slidesCount);
  }, [slidesCount]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    if (!isPaused) {
      timeoutRef.current = setTimeout(nextSlide, duration);
    }
    return () => resetTimeout();
  }, [current, isPaused, duration, nextSlide]);

  return {
    current,
    setCurrent,
    nextSlide,
    prevSlide,
    isPaused,
    setIsPaused,
  };
}
