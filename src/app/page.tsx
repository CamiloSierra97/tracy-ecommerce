//import Products from "@/components/Products";
//import { metadata } from "./layout";
import HeroSection from "@/components/HeroSection";
import { roboto_serif } from "@/lib/fonts";

export default function Page() {
  return (
    <>
      <main className="main">
        <section className={`hero-section flex ${roboto_serif.className}`}>
          <HeroSection></HeroSection>
        </section>
        <section>
          <article>
            {/*<Products title={metadata.title as string} basePath="/"></Products> */}
          </article>
        </section>
      </main>
    </>
  );
}
