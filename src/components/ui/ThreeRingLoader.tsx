import React from "react";
import { twMerge } from "tailwind-merge";

interface ThreeRingLoaderProps {
    className?: string; // For passing CSS variables and additional classes
}

const ThreeRingLoader: React.FC<ThreeRingLoaderProps> = ({ className = "" }) => {
    return (
        <div className={twMerge("loader-ring rounded-full grid border-[0.625rem] border-transparent border-r-burgundy animate-[spinner-rotate_1s_infinite_linear] w-card-half-size h-card-half-size", className)}></div>
    );
};

export default ThreeRingLoader;
