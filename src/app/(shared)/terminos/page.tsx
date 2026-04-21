import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Tracy Lencería",
  description:
    "Conoce los términos y condiciones de uso de nuestro sitio web y servicios.",
  alternates: {
    canonical: "https://www.tracystore.com/terminos",
  },
};

export default function TermsPage() {
  return (
    <article className="terms__container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="terms__title text-4xl font-serif font-bold mb-10 text-burgundy text-center">
        Términos y Condiciones
      </h1>
      <p className="terms__subtitle text-sm text-gray-500 mb-10 text-center">
        Última actualización: Diciembre 2025
      </p>

      <div className="terms__content space-y-8 text-gray-700 text-base leading-relaxed">
        <section className="terms__section">
          <h2 className="terms__section-title text-xl font-bold text-burgundy mb-3">
            1. Aceptación de los Términos
          </h2>
          <p className="terms__section-text">
            Al acceder y utilizar este sitio web, aceptas estar sujeto a los
            siguientes términos y condiciones. Si no estás de acuerdo con alguna
            parte de estos términos, te recomendamos no utilizar nuestros
            servicios.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__section-title text-xl font-bold text-burgundy mb-3">
            2. Uso del Sitio
          </h2>
          <p className="terms__section-text">
            Te comprometes a utilizar nuestro sitio web únicamente con fines
            legales y de una manera que no infrinja los derechos de, restrinja o
            inhiba el uso y disfrute del sitio por parte de cualquier tercero.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__section-title text-xl font-bold text-burgundy mb-3">
            3. Propiedad Intelectual
          </h2>
          <p className="terms__section-text">
            Todo el contenido incluido en este sitio, como texto, gráficos,
            logotipos, imágenes y software, es propiedad de Tracy Lencería o de
            sus proveedores de contenido y está protegido por las leyes de
            propiedad intelectual.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__section-title text-xl font-bold text-burgundy mb-3">
            4. Productos y Precios
          </h2>
          <p className="terms__section-text">
            Nos esforzamos por mostrar con la mayor precisión posible los
            colores y características de nuestros productos. Sin embargo, no
            podemos garantizar que la visualización en tu monitor sea exacta.
            Los precios están sujetos a cambios sin previo aviso.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__section-title text-xl font-bold text-burgundy mb-3">
            5. Limitación de Responsabilidad
          </h2>
          <p className="terms__section-text">
            Tracy Lencería no será responsable de ningún daño directo,
            indirecto, incidental, consecuente o punitivo que surja del uso o la
            imposibilidad de uso de este sitio.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__section-title text-xl font-bold text-burgundy mb-3">
            6. Ley Aplicable
          </h2>
          <p className="terms__section-text">
            Estos términos se regirán e interpretarán de acuerdo con las leyes
            de Colombia, sin tener en cuenta sus disposiciones sobre conflictos
            de leyes.
          </p>
        </section>
      </div>
    </article>
  );
}
