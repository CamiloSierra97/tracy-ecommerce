// import Products from "@/components/Products";
// import { metadata } from "./layout";
import HeroSection from "@/components/HeroSection";
import { roboto_serif } from "@/lib/fonts";

export default function Page() {
  return (
    <>
      <main className="main w-lvw">
        <section
          className={`hero-section flex ${roboto_serif.className} justify-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 z-0 bg-[url(/Patron.svg)] blur-xs scale-110"></div>
          <HeroSection></HeroSection>
        </section>
        <section>
          <article>
            {/* <Products title={metadata.title as string} basePath="/"></Products> */}
          </article>
        </section>
      </main>
    </>
  );
}
