"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import ThreeRingLoader from "./ThreeRingLoader";

interface ImageWithLoaderProps extends ImageProps {
  wrapperClassName?: string;
  loaderClassName?: string;
}

export default function ImageWithLoader({
  src,
  alt,
  className,
  wrapperClassName,
  loaderClassName,
  onLoad,
  ...props
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      role="img"
      aria-label={alt}
      aria-busy={isLoading}
      className={cn("image-loader relative overflow-hidden", wrapperClassName)}
    >
      {isLoading && (
        <div className="image-loader__spinner-container absolute inset-0 z-10 flex items-center justify-center bg-gray-50/80 animate-pulse">
          <ThreeRingLoader
            className={cn("image-loader__spinner size-12", loaderClassName)}
          />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          "image-loader__img transition-all duration-700 ease-out transform",
          isLoading
            ? "image-loader__img--loading opacity-0 scale-95 blur-md"
            : "image-loader__img--loaded opacity-100 scale-100 blur-0",
          className
        )}
        onLoad={(e) => {
          setIsLoading(false);
          if (onLoad) onLoad(e);
        }}
        {...props}
      />
    </div>
  );
}
