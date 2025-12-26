import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function SecretoPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row font-serif">
      {/* 1. SECCIÓN MUJER (Clásico / Elegante) */}
      <section className="relative flex-1 group overflow-hidden bg-burgundy flex flex-col justify-center items-center text-center p-8 transition-all duration-500 hover:flex-[1.3] hover:bg-burgundy/40 cursor-pointer">
        {/* Background Image */}
        <Image
          src="/MujerBanner-optimized.webp"
          alt="Lencería para mujer"
          fill
          className="object-cover opacity-60 group-hover:scale-102 transition-transform duration-700"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-burgundy/50 group-hover:bg-burgundy/40 transition-colors duration-500" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl text-gold font-serif italic mb-4 tracking-wider drop-shadow-md">
            Women
          </h2>
          <p className="text-ivory/70 text-lg mb-8 max-w-xs font-sans font-light tracking-wide drop-shadow-sm">
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
      <section className="relative flex-1 group overflow-hidden flex flex-col justify-center items-center text-center p-8 transition-all duration-500 hover:flex-[1.5] cursor-pointer">
        <Image
          src="/HombreBanner-optimized.webp"
          alt="Colección Hombre"
          fill
          className="object-cover opacity-70 group-hover:scale-102 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-black/70 group-hover:bg-black/40 transition-colors duration-500" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl text-gold font-serif italic mb-4 tracking-wider drop-shadow-md">
            Men
          </h2>
          <p className="text-ivory/60 text-lg mb-8 max-w-xs font-sans font-light tracking-wide drop-shadow-sm">
            Atrévete a redefinir la comodidad. Lujo y libertad, solo para ti.
          </p>

          <Link
            href="/hombre"
            className="inline-flex items-center gap-2 text-golden border-b border-golden pb-1 hover:text-ivory hover:border-ivory transition-all uppercase text-sm tracking-widest"
          >
            Descubrir <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 3. SECCIÓN NIÑA (Suave / Puro / Cómodo) */}
      <section className="relative flex-1 group overflow-hidden flex flex-col justify-center items-center text-center p-8 transition-all duration-500 hover:flex-[1.5] cursor-pointer">
        <Image
          src="/Ninabanner-optimized.webp"
          alt="Colección Niña"
          fill
          className="object-cover opacity-80 group-hover:scale-102 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-pink/50 group-hover:bg-pink/20 transition-colors duration-500" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl text-golden font-serif italic mb-4 tracking-wider drop-shadow-md">
            Junior
          </h2>
          <p className="text-ivory text-lg mb-8 max-w-xs font-sans font-light tracking-wide drop-shadow-sm">
            Suavidad infinita para sus mejores momentos. Confort puro.
          </p>

          <Link
            href="/nina"
            className="inline-flex items-center gap-2 text-ivory border-b border-ivory pb-1 hover:text-pink hover:border-pink transition-all uppercase text-sm tracking-widest"
          >
            Ver Colección <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
