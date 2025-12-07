"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";
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
        <div className={twMerge("relative overflow-hidden", wrapperClassName)}>
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50/80 animate-pulse">
                    <ThreeRingLoader className={twMerge("w-12 h-12", loaderClassName)} />
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                className={twMerge(
                    "transition-opacity duration-500 ease-out",
                    isLoading ? "opacity-0" : "opacity-100",
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
