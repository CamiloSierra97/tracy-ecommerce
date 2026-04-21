import { Metadata } from "next";
import PageHero from "@/components/shared/ui/PageHero";
import SalesSidebar from "@/components/shared/marketing/SalesSidebar";

export const metadata: Metadata = {
  title: "Acerca de Nosotros | Tracy Lencería",
  description:
    "Conoce la historia detrás de Tracy Lencería, nuestra misión y compromiso con la calidad y el diseño colombiano.",
  alternates: {
    canonical: "https://www.tracystore.com/acerca-de",
  },
};

export default function AboutPage() {
  return (
    <div className="about-page bg-ivory min-h-screen pb-12">
      <PageHero
        title="Nuestra Historia"
        subtitle="Más que lencería, una tradición de elegancia."
      />

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
          {/* Main Content */}
          <article className="space-y-6 text-black leading-relaxed text-lg">
            <p>
              En <strong>Tracy</strong>, rompemos los moldes de la ropa íntima
              tradicional. Somos una marca multilínea diseñada para acompañar
              cada etapa y estilo de vida, fusionando el arte del diseño con la
              ingeniería del confort.
              <ul className="list-disc">
                <p>
                  <strong>Un Universo para Todos</strong>
                </p>
                <li>
                  Mujer (Lencería y Ropa Interior): Desde básicos de algodón
                  hasta nuestra icónica lencería de blonda con "efecto tatuaje".
                </li>
                <li>
                  Hombre (Lencería Masculina): Diseños audaces en tull y encaje
                  para el hombre que no teme explorar su sensualidad.
                </li>
                <li>
                  Niña (Ropa Interior): Pack de básicos en algodón licrado que
                  garantizan frescura y libertad de movimiento.
                </li>
              </ul>
            </p>

            <h2 className="text-2xl font-serif text-burgundy mt-10 mb-4">
              Nuestra Misión
            </h2>
            <p>
              Empoderar a través del diseño. Nos dedicamos a crear colecciones
              que no solo sean visualmente impactantes, sino también
              increíblemente cómodas para el uso diario o momentos especiales.
              Cada prenda es confeccionada con atención al detalle, asegurando
              una calidad excepcional que perdura.
            </p>

            <h2 className="text-2xl font-serif text-burgundy mt-10 mb-4">
              Diseño y Calidad Colombiana
            </h2>
            <p>
              Nos enorgullece ser una marca 100% colombiana. Trabajamos con
              artesanos locales y utilizamos materiales de la más alta calidad
              para apoyar la industria nacional y llevar el talento colombiano
              al mundo. Desde la selección de las telas hasta el último hilo,
              todo el proceso se realiza con pasión y dedicación.
            </p>

            <h2 className="text-2xl font-serif text-burgundy mt-10 mb-4">
              Nuestro Compromiso
            </h2>
            <p>
              Nos esforzamos por ofrecer una experiencia de compra excepcional.
              Desde el momento en que visitas nuestra tienda online hasta que
              recibes tu paquete, queremos que te sientas especial. Gracias por
              elegir Tracy Lencería y ser parte de nuestra comunidad.
            </p>
          </article>

          <SalesSidebar />
        </div>
      </div>
    </div>
  );
}
