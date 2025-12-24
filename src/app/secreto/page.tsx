import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

export default function SecretoPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row font-serif">
      {/* 1. SECCIÓN MUJER (Clásico / Elegante) */}
      <section className="relative flex-1 group overflow-hidden bg-burgundy flex flex-col justify-center items-center text-center p-8 transition-all duration-500 hover:flex-[1.5]">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl text-light-gold mb-4 tracking-wider">
            Mujer
          </h2>
          <p className="text-ivory/90 text-lg mb-8 max-w-xs font-sans font-light tracking-wide">
            Elegancia que abraza tu piel. Descubre nuestra colección insignia.
          </p>

          <Link
            href="/mujer"
            className="inline-flex items-center gap-2 text-gold border-b border-golden pb-1 hover:text-white hover:border-white transition-all uppercase text-sm tracking-widest"
          >
            Explorar <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 2. SECCIÓN HOMBRE (Audaz / Secreto / Lujo Oscuro) */}
      <section className="relative flex-1 group overflow-hidden bg-black flex flex-col justify-center items-center text-center p-8 transition-all duration-500 hover:flex-[1.5] border-y md:border-y-0 md:border-x border-gold/20">
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl text-golden mb-4 tracking-wider">
            Hombre
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xs font-sans font-light tracking-wide">
            Atrévete a redefinir la comodidad. Lujo y libertad, solo para ti.
          </p>

          <Link
            href="/hombre"
            className="inline-flex items-center gap-2 text-golden border-b border-golden pb-1 hover:text-white hover:border-white transition-all uppercase text-sm tracking-widest"
          >
            Descubrir <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 3. SECCIÓN NIÑA (Suave / Puro / Cómodo) */}
      <section className="relative flex-1 group overflow-hidden bg-ivory flex flex-col justify-center items-center text-center p-8 transition-all duration-500 hover:flex-[1.5]">
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl text-burgundy mb-4 tracking-wider">
            Niña
          </h2>
          <p className="text-gray-800 text-lg mb-8 max-w-xs font-sans font-light tracking-wide">
            Suavidad infinita para sus mejores momentos. Confort puro.
          </p>

          <Link
            href="/nina"
            className="inline-flex items-center gap-2 text-burgundy border-b border-burgundy pb-1 hover:text-burgundy-light hover:border-burgundy-light transition-all uppercase text-sm tracking-widest"
          >
            Ver Colección <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
