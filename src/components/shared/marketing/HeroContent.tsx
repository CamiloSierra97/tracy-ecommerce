import Link from "next/link";
import ScrollButton from "@/components/shared/ui/ScrollButton";

const BRAND_SLOGAN = "Libera tu cuerpo, abraza tu libertad.";

export default function HeroContent() {
  return (
    <article className="hero-section__content w-full h-full md:w-1/2 lg:w-2/5 py-15 px-6 md:pt-6 md:px-12 lg:px-20 z-10 bg-burgundy-light md:backdrop-blur-sm flex flex-col justify-between items-stretch relative gap-4 text-center">
      <h2 className="hero-section__title inline-block font-serif text-5xl md:text-6xl text-gold mx-0 my-2 tracking-wide drop-shadow-sm">
        <span className="hero-section__title--text">Tracy</span>
      </h2>

      {/* Subtítulo descriptivo — comunica categoría de producto */}
      <p className="hero-section__category text-ivory/90 font-sans flex text-sm md:text-base uppercase tracking-[0.2em] -mt-2">
        Ropa Interior & Lencería Premium
      </p>

      {/* 🌟 Aplicación del Lema 🌟 */}
      <p
        className={`hero-section__slogan text-xl md:text-2xl font-serif italic pb-2 text-golden drop-shadow-md`}
      >
        {BRAND_SLOGAN}
      </p>
      <p className="hero-section__description text-white mb-6 opacity-100 text-base md:text-lg leading-relaxed text-pretty text-center max-w-sm md:max-w-none mx-auto drop-shadow-sm">
        Conjuntos, brasiers y pantis diseñados para celebrar cada silueta. Telas
        colombianas que se sienten como una segunda piel, con la comodidad que
        mereces todos los días.
      </p>

      <div className="hero-section__scroll-container flex flex-col items-center gap-4">
        <Link
          href="/mujer"
          className="hero-section__cta btn-animate absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-in-out"
        >
          Comprar Ahora
        </Link>
        <ScrollButton />
      </div>
    </article>
  );
}
