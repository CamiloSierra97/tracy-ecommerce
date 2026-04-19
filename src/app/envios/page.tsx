import { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SalesSidebar from "@/components/marketing/SalesSidebar";

export const metadata: Metadata = {
  title: "Envíos y Devoluciones | Tracy Lencería",
  description:
    "Conoce nuestra política de envíos y devoluciones. Envíos seguros a toda Colombia.",
  alternates: {
    canonical: "https://www.tracystore.com/envios",
  },
};

export default function EnviosPage() {
  return (
    <div className="envios-page bg-ivory min-h-screen pb-12">
      <PageHero
        title="Envíos y Devoluciones"
        subtitle="Entregamos comodidad y confianza en cada paquete."
      />

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="space-y-12 font-roboto-serif text-gray-700">
            {/* Policy Section 1 */}
            <article className="bg-white p-8 rounded-2xl shadow-sm border border-gold/10">
              <h2 className="text-2xl font-bold text-burgundy mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-golden rounded-full inline-block"></span>
                Política de Envíos
              </h2>
              <div className="prose prose-stone max-w-none">
                <p className="mb-4">
                  En Tracy Lencería, nos aseguramos de que tu pedido llegue en
                  perfectas condiciones y con la mayor discreción posible.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Tiempo de procesamiento:</strong> Los pedidos se
                    procesan en 1-2 días hábiles.
                  </li>
                  <li>
                    <strong>Tiempo de entrega:</strong> 2-5 días hábiles
                    dependiendo de la ciudad de destino.
                  </li>
                  <li>
                    <strong>Costo:</strong> Envío gratis por compras superiores
                    a $200.000 COP.
                  </li>
                  <li>
                    <strong>Seguimiento:</strong> Recibirás un número de guía
                    para rastrear tu paquete tan pronto sea despachado.
                  </li>
                </ul>
              </div>
            </article>

            {/* Policy Section 2 */}
            <article className="bg-white p-8 rounded-2xl shadow-sm border border-gold/10">
              <h2 className="text-2xl font-bold text-burgundy mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-golden rounded-full inline-block"></span>
                Política de Cambios y Garantías
              </h2>
              <div className="prose prose-stone max-w-none">
                <p className="mb-4">
                  Por higiene y seguridad,{" "}
                  <strong>
                    la ropa interior (panties, bodies, lencería inferior) no
                    tiene cambio
                  </strong>
                  , salvo por defectos de fábrica.
                </p>
                <p className="mb-4">
                  Los brasieres y pijamas pueden cambiarse en un plazo máximo de{" "}
                  <strong>5 días hábiles</strong> después de recibido el
                  producto, siempre y cuando:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    La prenda esté en perfecto estado, sin usar y sin lavar.
                  </li>
                  <li>Conserve todas las etiquetas y empaques originales.</li>
                </ul>
                <p className="mt-4 text-sm text-gray-500 italic">
                  Nota: Los costos de envío por cambios de talla corren por
                  cuenta del cliente.
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <SalesSidebar />
        </div>
      </div>
    </div>
  );
}
