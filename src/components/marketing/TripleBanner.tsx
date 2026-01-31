import BannerCard from "./BannerCard";

export default function TripleBanner() {
  return (
    <div className="triple-banner flex flex-col md:flex-row font-serif h-full w-full">
      {/* 1. SECCIÓN MUJER */}
      <BannerCard
        variant="women"
        title="Women"
        description="Elegancia que abraza tu piel. Descubre nuestra colección insignia."
        linkHref="/mujer"
        linkText="Explorar"
        bgClass="bg-triple-women bg-top"
      />

      {/* 2. SECCIÓN HOMBRE */}
      <BannerCard
        variant="men"
        title="Men"
        description="Atrévete a redefinir la comodidad. Lujo y libertad, solo para ti."
        linkHref="/hombre"
        linkText="Descubrir"
        bgClass="bg-triple-men bg-center"
      />

      {/* 3. SECCIÓN NIÑA */}
      <BannerCard
        variant="junior"
        title="Junior"
        description="Suavidad infinita para sus mejores momentos. Confort puro."
        linkHref="/nina"
        linkText="Ver Colección"
        bgClass="bg-triple-junior bg-center"
      />
    </div>
  );
}
