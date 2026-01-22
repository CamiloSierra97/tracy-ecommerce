"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BrandManifesto() {
  return (
    <section className="brand-manifesto relative w-full bg-burgundy overflow-hidden">
      {/* Container: Stacked on Mobile, Split on Desktop */}
      <div className="flex flex-col lg:flex-row h-auto lg:h-[600px]">
        {/* 1. VISUAL BLOCK (Image) */}
        <div className="brand-manifesto__visual w-full lg:w-1/2 relative h-[400px] lg:h-full">
          <Image
            src="/Manifesto.webp"
            alt="Textura de seda burgundy representando la suavidad de Tracy"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        </div>

        {/* 2. TEXT BLOCK */}
        <div className="brand-manifesto__content w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-burgundy text-ivory relative">
          <div className="brand-manifesto__inner relative z-10 max-w-lg text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="brand-manifesto__subtitle block text-gold font-sans text-xs tracking-[0.2em] uppercase mb-4"
            >
              Nuestra Filosofía
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="brand-manifesto__title text-4xl md:text-5xl font-serif italic mb-6 leading-tight"
            >
              Libera tu cuerpo, abraza tu libertad.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="brand-manifesto__text text-white/80 text-lg leading-relaxed mb-8 font-light"
            >
              Creemos que la verdadera elegancia nace de la comodidad absoluta.
              Nuestras piezas están diseñadas para ser una segunda piel,
              fusionando la artesanía colombiana con materiales que acarician
              tus sentidos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="brand-manifesto__cta-wrapper"
            >
              <Link
                href="/acerca-de"
                className="brand-manifesto__cta inline-block px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-burgundy transition-all duration-300 rounded-full text-sm tracking-widest uppercase font-medium"
              >
                Nuestra Historia
              </Link>
            </motion.div>
          </div>

          {/* Decorative Pattern Overlay */}
          <div className="brand-manifesto__pattern absolute inset-0 bg-[url('/Patron.svg')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        </div>
      </div>
    </section>
  );
}
