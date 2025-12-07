import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Preguntas Frecuentes (FAQ) | Tracy Lencería',
    description: 'Respuestas a las preguntas más comunes sobre envíos, tallas, pagos y devoluciones.',
};

export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Preguntas Frecuentes</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">¿Cómo sé cuál es mi talla?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Manejamos una tabla de medidas estándar. Te recomendamos revisar nuestra guía de tallas disponible en cada producto.
                        Si tienes dudas específicas, puedes contactarnos por WhatsApp para asesoría personalizada.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">¿Cuánto tiempo tarda el envío?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Los pedidos se procesan en 1-2 días hábiles. El tiempo de entrega depende de la transportadora y tu ubicación,
                        generalmente entre 2 a 5 días hábiles para ciudades principales en Colombia.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">¿Qué métodos de pago aceptan?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Aceptamos tarjetas de crédito, débito (PSE), Nequi, Daviplata y pagos en efectivo a través de nuestros aliados.
                        Todas las transacciones son seguras y procesadas a través de pasarelas de pago certificadas.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">¿Puedo cambiar o devolver productos de lencería?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Por razones de higiene y salud, <strong>no aceptamos cambios ni devoluciones en panties o bodys</strong>,
                        salvo por defectos de fabricación. Los brasieres pueden tener cambio si están en perfecto estado, con etiquetas y sin uso.
                        Te recomendamos revisar bien tu talla antes de comprar.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">¿Hacen envíos internacionales?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Actualmente nos enfocamos en el mercado nacional (Colombia), pero estamos trabajando para habilitar envíos internacionales pronto.
                        Suscríbete a nuestro boletín para enterarte de las novedades.
                    </p>
                </section>
            </div>
        </div>
    );
}
