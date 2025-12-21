import { Metadata } from "next";
import { playfair, roboto_serif } from "@/lib/fonts";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Contacto | Tracy Lencería",
  description:
    "Contáctanos para atención personalizada, dudas sobre envíos o asesoría de tallas.",
};

export default function ContactPage() {
  return (
    <main
      className={`main-contact min-h-screen bg-ivory py-16 px-6 md:px-12 ${roboto_serif.className}`}
    >
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1
            className={`text-4xl md:text-5xl text-burgundy mb-6 ${playfair.className}`}
          >
            Contáctanos
          </h1>
          <div className="w-24 h-1 bg-golden mx-auto opacity-60 rounded-full"></div>
          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
            Estamos aquí para asesorarte. Escríbenos para cualquier duda sobre
            nuestras prendas, envíos o tallas.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gold/10">
          {/* Info de contacto */}
          <div className="space-y-8">
            <h2
              className={`text-2xl text-burgundy-light font-medium mb-6 ${playfair.className}`}
            >
              Información
            </h2>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-burgundy/5 flex items-center justify-center text-burgundy shrink-0">
                <Icon name="icon-user" size={24} />
                {/* Note: Using 'icon-user' as generic placeholder if 'icon-whatsapp'/phone not available in Icon set yet. 
                                    If you have whatsapp icon, switch to it. */}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">
                  WhatsApp & Teléfono
                </h3>
                <p className="text-gray-600">+57 300 123 4567</p>
                <p className="text-sm text-gray-500 mt-1">
                  Lunes a Viernes: 9am - 6pm
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-burgundy/5 flex items-center justify-center text-burgundy shrink-0">
                <Icon name="icon-truck" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">
                  Correo Electrónico
                </h3>
                <p className="text-gray-600">contacto@tracylenceria.com</p>
                <p className="text-sm text-gray-500 mt-1">
                  Respondemos en menos de 24h
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-burgundy/5 flex items-center justify-center text-burgundy shrink-0">
                <Icon name="icon-bag" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Showroom</h3>
                <p className="text-gray-600">Calle 123 # 45 - 67</p>
                <p className="text-gray-600">Bogotá, Colombia</p>
              </div>
            </div>
          </div>

          {/* Formulario simple */}
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-golden focus:ring-1 focus:ring-golden outline-none transition-all"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-golden focus:ring-1 focus:ring-golden outline-none transition-all"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-golden focus:ring-1 focus:ring-golden outline-none transition-all"
                placeholder="¿En qué podemos ayudarte?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-burgundy text-golden py-4 rounded-xl font-bold tracking-widest hover:bg-opacity-90 transition-all uppercase shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
