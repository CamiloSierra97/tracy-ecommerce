import BannerCard from "./BannerCard";
import CarouselScroller from "@/components/ui/CarouselScroller";

export default function TripleBanner() {
  return (
    <div className="triple-banner font-serif h-full w-full relative">
      {/* Headline de categoría — comunica en 3 segundos qué se vende */}
      <h1 className="triple-banner__headline top-0 inset-x-0 z-30 text-center p-2 md:p-4 bg-burgundy/80 backdrop-blur-sm">
        <span className="text-gold font-serif text-2xl md:text-3xl lg:text-4xl tracking-wide drop-shadow-md">
          Ropa Interior & Lencería Premium
        </span>
      </h1>

      <CarouselScroller className="h-full" trackClassName="h-full flex-row w-full">
        {/* 1. SECCIÓN MUJER */}
        <BannerCard
          variant="women"
          title="Women"
          description="Conjuntos, brasiers y pantis diseñados para realzar tu silueta."
          linkHref="/mujer"
          linkText="Explorar"
          bgClass="bg-triple-women bg-top"
          className="w-full shrink-0 snap-start md:w-1/3"
        />

        {/* 2. SECCIÓN HOMBRE */}
        <BannerCard
          variant="men"
          title="Men"
          description="Lencería masculina con telas de máxima comodidad y estilo."
          linkHref="/hombre"
          linkText="Descubrir"
          bgClass="bg-triple-men bg-center"
          className="w-full shrink-0 snap-start md:w-1/3"
        />

        {/* 3. SECCIÓN NIÑA */}
        <BannerCard
          variant="junior"
          title="Junior"
          description="Ropa interior infantil suave y cómoda para el día a día."
          linkHref="/nina"
          linkText="Ver Colección"
          bgClass="bg-triple-junior bg-center"
          className="w-full shrink-0 snap-start md:w-1/3"
        />
      </CarouselScroller>
    </div>
  );
}
