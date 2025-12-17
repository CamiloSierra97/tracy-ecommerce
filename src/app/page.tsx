import Products from "@/components/product/Products";
import { metadata } from "./layout";
import { roboto_serif } from "@/lib/fonts";
import HeroSection from "@/components/layout/HeroSection";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <main className="main">
        <section
          className={`hero-section flex ${roboto_serif.className} justify-center relative overflow-hidden `}
        >
          <div className="absolute inset-0 z-0 max-md:hidden">
            <Image
              src="/Patron.svg"
              alt="Background Pattern"
              fill
              priority
              className="object-cover blur-xs scale-110"
            />
          </div>
          <HeroSection></HeroSection>
        </section>
        <section>
          <Products title={metadata.title as string} basePath="/"></Products>

        </section>
      </main>
    </>
  );
}
