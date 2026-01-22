import Link from "next/link";
import Icon from "../ui/Icon";

export default function TripleBanner() {
  return (
    <div className="triple-banner flex flex-col md:flex-row font-serif h-full w-full">
      {/* 1. SECCIÓN MUJER */}
      <section className="triple-banner__section triple-banner__section--women relative flex-1 group overflow-hidden flex flex-col justify-center items-center text-center p-10 cursor-pointer h-full">
        {/* Background Image with Scale Animation (No Reflow) */}
        <div className="absolute inset-0 bg-triple-women bg-cover bg-top bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110 z-0" />

        {/* Overlay */}
        <div className="triple-banner__overlay absolute inset-0 bg-burgundy/50 group-hover:bg-burgundy/40 transition-colors duration-500 z-10" />

        <div className="triple-banner__content relative z-20 flex flex-col items-center transform transition-transform duration-500 group-hover:-translate-y-2">
          <h2 className="triple-banner__title text-5xl md:text-6xl text-gold font-serif italic mb-4 tracking-wider drop-shadow-lg">
            Women
          </h2>
          <p className="triple-banner__description text-ivory text-lg mb-8 max-w-xs font-sans font-light tracking-wide drop-shadow-sm">
            Elegancia que abraza tu piel. Descubre nuestra colección insignia.
          </p>

          <Link
            href="/mujer"
            className="triple-banner__link inline-flex items-center gap-2 text-gold border-b border-golden pb-1 hover:text-ivory hover:border-ivory transition-all uppercase text-sm tracking-widest"
          >
            Explorar <Icon name="icon-arrow-right-dashed" size={16} />
          </Link>
        </div>
      </section>

      {/* 2. SECCIÓN HOMBRE */}
      <section className="triple-banner__section triple-banner__section--men relative flex-1 group overflow-hidden flex flex-col justify-center items-center text-center p-10 cursor-pointer h-full">
        {/* Background Image with Scale Animation (No Reflow) */}
        <div className="absolute inset-0 bg-triple-men bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110 z-0" />

        <div className="triple-banner__overlay absolute inset-0 bg-black/70 group-hover:bg-black/40 transition-colors duration-500 z-10" />

        <div className="triple-banner__content relative z-20 flex flex-col items-center transform transition-transform duration-500 group-hover:-translate-y-2">
          <h2 className="triple-banner__title text-5xl md:text-6xl text-gold font-serif italic mb-4 tracking-wider drop-shadow-lg">
            Men
          </h2>
          <p className="triple-banner__description text-ivory text-lg mb-8 max-w-xs font-sans font-light tracking-wide drop-shadow-sm">
            Atrévete a redefinir la comodidad. Lujo y libertad, solo para ti.
          </p>

          <Link
            href="/hombre"
            className="triple-banner__link inline-flex items-center gap-2 text-golden border-b border-golden pb-1 hover:text-ivory hover:border-ivory transition-all uppercase text-sm tracking-widest"
          >
            Descubrir <Icon name="icon-arrow-right-dashed" size={16} />
          </Link>
        </div>
      </section>

      {/* 3. SECCIÓN NIÑA */}
      <section className="triple-banner__section triple-banner__section--junior relative flex-1 group overflow-hidden flex flex-col justify-center items-center text-center p-8 cursor-pointer h-full pb-16">
        {/* Background Image with Scale Animation (No Reflow) */}
        <div className="absolute inset-0 bg-triple-junior bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110 z-0" />

        <div className="triple-banner__overlay absolute inset-0 bg-pink/50 group-hover:bg-pink/20 transition-colors duration-500 z-10" />

        <div className="triple-banner__content relative z-20 flex flex-col items-center transform transition-transform duration-500 group-hover:-translate-y-2">
          <h2 className="triple-banner__title text-5xl md:text-6xl text-golden font-serif italic mb-4 tracking-wider drop-shadow-lg">
            Junior
          </h2>
          <p className="triple-banner__description text-ivory text-lg mb-8 max-w-xs font-sans font-light tracking-wide drop-shadow-sm">
            Suavidad infinita para sus mejores momentos. Confort puro.
          </p>

          <Link
            href="/nina"
            className="triple-banner__link inline-flex items-center gap-2 text-ivory border-b border-ivory pb-1 hover:text-pink hover:border-pink transition-all uppercase text-sm tracking-widest"
          >
            Ver Colección <Icon name="icon-arrow-right-dashed" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
