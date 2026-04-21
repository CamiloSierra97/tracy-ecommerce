import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | Tracy Lencería",
  description: "Información sobre el uso de cookies en nuestro sitio web.",
  alternates: {
    canonical: "https://www.tracystore.com/cookies",
  },
};

export default function CookiesPage() {
  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-serif font-bold mb-10 text-burgundy text-center">
        Política de Cookies
      </h1>

      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <p>
          Este sitio web utiliza cookies para mejorar tu experiencia de
          navegación y ofrecerte servicios personalizados. A continuación,
          explicamos qué son las cookies y cómo las utilizamos.
        </p>

        <section>
          <h2 className="text-xl font-bold text-burgundy mb-3">
            ¿Qué son las cookies?
          </h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu
            dispositivo cuando visitas un sitio web. Permiten que el sitio
            recuerde tus acciones y preferencias (como inicio de sesión, idioma,
            tamaño de letra) durante un período de tiempo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-burgundy mb-3">
            Tipos de cookies que utilizamos
          </h2>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong>Cookies esenciales:</strong> Necesarias para el
              funcionamiento básico del sitio, como recordar los artículos en tu
              carrito de compras.
            </li>
            <li>
              <strong>Cookies de rendimiento:</strong> Nos ayudan a entender
              cómo interactúan los visitantes con el sitio, recopilando
              información de forma anónima (por ejemplo, Google Analytics).
            </li>
            <li>
              <strong>Cookies de funcionalidad:</strong> Permiten recordar tus
              preferencias para ofrecer una experiencia más personalizada.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-burgundy mb-3">
            Control de cookies
          </h2>
          <p>
            Puedes controlar y/o eliminar las cookies según desees. Puedes
            eliminar todas las cookies que ya están en tu computadora y puedes
            configurar la mayoría de los navegadores para evitar que se
            coloquen. Sin embargo, si lo haces, es posible que tengas que
            ajustar manualmente algunas preferencias cada vez que visites un
            sitio y que algunos servicios y funcionalidades no funcionen.
          </p>
        </section>
      </div>
    </article>
  );
}
