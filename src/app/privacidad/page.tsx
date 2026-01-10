import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Tracy Lencería",
  description: "Cómo recopilamos, usamos y protegemos tu información personal.",
};

export default function PrivacyPage() {
  return (
    <article className="privacy__container container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="privacy__title text-4xl font-serif font-bold mb-10 text-burgundy text-center">
        Política de Privacidad
      </h1>

      <div className="privacy__content space-y-8 text-black leading-relaxed text-lg">
        <p className="privacy__content-text">
          En Tracy Lencería valoramos tu privacidad y nos comprometemos a
          proteger tus datos personales. Esta política explica cómo tratamos la
          información que recopilamos.
        </p>

        <section className="privacy__section">
          <h2 className="privacy__section-title text-xl font-bold text-burgundy mb-3">
            Recopilación de Información
          </h2>
          <p className="privacy__section-text">
            Recopilamos información que nos proporcionas directamente, como
            cuando creas una cuenta, realizas una compra o te suscribes a
            nuestro boletín. Esto puede incluir tu nombre, dirección de correo
            electrónico, dirección de envío y detalles de pago.
          </p>
        </section>

        <section className="privacy__section">
          <h2 className="privacy__section-title text-xl font-bold text-burgundy mb-3">
            Uso de la Información
          </h2>
          <p className="privacy__section-text">
            Utilizamos tu información para procesar tus pedidos, comunicarnos
            contigo sobre el estado de tus compras, enviarte ofertas
            promocionales (si has aceptado recibirlas) y mejorar nuestra tienda
            y servicios.
          </p>
        </section>

        <section className="privacy__section">
          <h2 className="privacy__section-title text-xl font-bold text-burgundy mb-3">
            Protección de Datos
          </h2>
          <p className="privacy__section-text">
            Implementamos medidas de seguridad técnicas y organizativas para
            proteger tus datos personales contra el acceso no autorizado, la
            pérdida o la alteración. Tus datos de pago son procesados por
            pasarelas seguras y no almacenamos información sensible de tarjetas
            de crédito en nuestros servidores.
          </p>
        </section>

        <section className="privacy__section">
          <h2 className="privacy__section-title text-xl font-bold text-burgundy mb-3">
            Compartir Información
          </h2>
          <p className="privacy__section-text">
            No vendemos ni alquilamos tu información personal a terceros con
            fines de marketing. Podemos compartir datos con proveedores de
            servicios de confianza que nos ayudan a operar nuestro negocio (por
            ejemplo, empresas de transporte), siempre bajo estrictos acuerdos de
            confidencialidad.
          </p>
        </section>

        <section className="privacy__section">
          <h2 className="privacy__section-title text-xl font-bold text-burgundy mb-3">
            Tus Derechos
          </h2>
          <p className="privacy__section-text">
            Tienes derecho a acceder, corregir o eliminar tu información
            personal en cualquier momento. Si deseas ejercer estos derechos, por
            favor contáctanos a través de nuestro correo de atención al cliente.
          </p>
        </section>
      </div>
    </article>
  );
}
