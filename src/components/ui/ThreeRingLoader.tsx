"use client";
import React from "react";

interface ThreeRingLoaderProps {
    className?: string; // For passing CSS variables and additional classes
}

const ThreeRingLoader: React.FC<ThreeRingLoaderProps> = () => {
    // NOTE: Dynamic values should be passed via className or CSS variables.
    return (
        <div className="w-card-half-size h-card-half-size rounded-full grid loader-ring-root border-[0.625rem] border-transparent border-r-burgundy animate-[spinner-rotate_1s_infinite_linear]"></div>
    );
};

export default ThreeRingLoader;
