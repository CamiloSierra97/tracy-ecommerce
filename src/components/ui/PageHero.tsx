"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string; // Optional custom image
}

export default function PageHero({
  title,
  subtitle,
  image = "/PageHeader.webp",
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax effect: Background moves slower than content
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={ref}
      className="page-hero relative w-full h-[40vh] min-h-[300px] overflow-hidden flex items-center justify-center bg-burgundy"
    >
      {/* Fixed/Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-white drop-shadow-lg mb-4"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 font-light font-sans max-w-2xl mx-auto drop-shadow-md"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Decorative detail at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-ivory to-transparent z-20" />
    </section>
  );
}
