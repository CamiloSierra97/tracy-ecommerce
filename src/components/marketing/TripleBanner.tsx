import BannerCard from "./BannerCard";

export default function TripleBanner() {
  return (
    <div className="triple-banner flex flex-col md:flex-row font-serif h-full w-full">
      {/* 1. SECCIÓN MUJER */}
      <BannerCard
        title="Women"
        description="Elegancia que abraza tu piel. Descubre nuestra colección insignia."
        linkHref="/mujer"
        linkText="Explorar"
        bgClass="bg-triple-women bg-top"
        overlayClass="bg-burgundy/50 group-hover:bg-burgundy/40"
      />

      {/* 2. SECCIÓN HOMBRE */}
      <BannerCard
        title="Men"
        description="Atrévete a redefinir la comodidad. Lujo y libertad, solo para ti."
        linkHref="/hombre"
        linkText="Descubrir"
        bgClass="bg-triple-men bg-center"
        overlayClass="bg-black/70 group-hover:bg-black/40"
        linkBorderColor="border-golden"
        linkColor="text-golden"
      />

      {/* 3. SECCIÓN NIÑA */}
      <BannerCard
        title="Junior"
        description="Suavidad infinita para sus mejores momentos. Confort puro."
        linkHref="/nina"
        linkText="Ver Colección"
        bgClass="bg-triple-junior bg-center"
        overlayClass="bg-pink/50 group-hover:bg-pink/20"
        titleColor="text-golden"
        linkBorderColor="border-ivory"
        linkColor="text-ivory"
        linkHoverColor="text-pink"
        linkHoverBorderColor="border-pink"
      />
    </div>
  );
}
