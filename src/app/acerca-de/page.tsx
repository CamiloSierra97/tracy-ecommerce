import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Acerca de Nosotros | Tracy Lencería',
    description: 'Conoce la historia detrás de Tracy Lencería, nuestra misión y compromiso con la calidad y el diseño colombiano.',
};

export default function AboutPage() {
    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-900 border-b pb-6 border-golden/30">Nuestra Historia</h1>

            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                    En <strong>Tracy Lencería</strong>, creemos que la lencería es mucho más que ropa interior;
                    es una expresión de confianza, belleza y amor propio. Fundada en Colombia, nuestra marca
                    nació con el deseo de ofrecer piezas que combinen la delicadeza del encaje, la suavidad
                    de las telas premium y diseños que realzan la figura natural de cada mujer.
                </p>

                <h2 className="text-2xl font-serif text-tracy-burdeos mt-10 mb-4">Nuestra Misión</h2>
                <p>
                    Empoderar a través del diseño. Nos dedicamos a crear colecciones que no solo sean visualmente
                    impactantes, sino también increíblemente cómodas para el uso diario o momentos especiales.
                    Cada prenda es confeccionada con atención al detalle, asegurando una calidad excepcional que perdura.
                </p>

                <h2 className="text-2xl font-serif text-tracy-burdeos mt-10 mb-4">Diseño y Calidad Colombiana</h2>
                <p>
                    Nos enorgullece ser una marca 100% colombiana. Trabajamos con artesanos locales y utilizamos
                    materiales de la más alta calidad para apoyar la industria nacional y llevar el talento
                    colombiano al mundo. Desde la selección de las telas hasta el último hilo, todo el proceso
                    se realiza con pasión y dedicación.
                </p>

                <h2 className="text-2xl font-serif text-tracy-burdeos mt-10 mb-4">Nuestro Compromiso</h2>
                <p>
                    Nos esforzamos por ofrecer una experiencia de compra excepcional. Desde el momento en que
                    visitas nuestra tienda online hasta que recibes tu paquete, queremos que te sientas especial.
                    Gracias por elegir Tracy Lencería y ser parte de nuestra comunidad.
                </p>
            </div>
        </article>
    );
}
