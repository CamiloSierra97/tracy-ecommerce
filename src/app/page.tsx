import Products from "@/components/Products";
import { metadata } from "./layout";
import { roboto_serif } from "@/lib/fonts";
import HeroSection from "@/components/HeroSection";

export default function Page() {
  return (
    <>
      <main className="main scroll-smooth">
        <section
          className={`hero-section flex ${roboto_serif.className} justify-center relative overflow-hidden `}
        >
          <div className="absolute inset-0 z-0 bg-[url(/Patron.svg)] blur-xs scale-110 sm:hidden"></div>
          <HeroSection></HeroSection>
        </section>
        <section>
         <Products title={metadata.title as string} basePath="/"></Products>*
          {/* Ejemplo de cómo hacer un background paralelo con scroll */}
          {/*<div className="w-full flex justify-center">
              <div className="text-ivory bg-fixed bg-[url(/FondoTinto.svg)] bg-cover w-full">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et molestiae quae, obcaecati aliquam corrupti explicabo alias laborum consequatur facilis aliquid non eligendi labore excepturi ea eveniet veniam eaque ex nisi.
              </div>
            </div>*/}
        </section>
      </main>
    </>
  );
}
