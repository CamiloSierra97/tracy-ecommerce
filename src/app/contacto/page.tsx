import { Metadata } from "next";
import Icon from "@/components/ui/Icon";
import PageHero from "@/components/ui/PageHero";
import SalesSidebar from "@/components/marketing/SalesSidebar";

export const metadata: Metadata = {
  title: "Contacto | Tracy Lencería",
  description:
    "Contáctanos para atención personalizada, dudas sobre envíos o asesoría de tallas.",
};

export default function ContactPage() {
  return (
    <div className="contact-page bg-ivory min-h-screen pb-12">
      <PageHero
        title="Contáctanos"
        subtitle="Estamos aquí para asesorarte en cada detalle."
      />

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
          {/* Main Content */}
          <div>
            <header className="text-center mb-16">
              <h1
                className={`text-4xl md:text-5xl text-burgundy mb-6 font-serif`}
              >
                Contáctanos
              </h1>
              <div className="w-24 h-1 bg-golden mx-auto opacity-60 rounded-full"></div>
              <p className="mt-6 text-black text-lg max-w-2xl mx-auto">
                Estamos aquí para asesorarte. Escríbenos para cualquier duda
                sobre nuestras prendas, envíos o tallas.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-ivory p-8 md:p-12 rounded-3xl shadow-xl border border-gold/10">
              {/* Info de contacto */}
              <div className="space-y-8">
                <h2
                  className={`text-2xl text-burgundy-light font-medium mb-6 font-serif`}
                >
                  Información
                </h2>

                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-burgundy/15 flex items-center justify-center text-burgundy shrink-0">
                    <Icon name="icon-user" size={24} />
                    {/* Nota: Usando 'icon-user' como placeholder genérico si 'icon-whatsapp'/teléfono no está disponible en el set de íconos aún.
                                    Si tienes el ícono de WhatsApp, cámbialo. */}
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1">
                      WhatsApp & Teléfono
                    </h3>
                    <p className="text-black">+57 320 761 0070</p>
                    <p className="text-sm text-black mt-1">
                      Lunes a Sábado: 9am - 7pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-burgundy/15 flex items-center justify-center text-burgundy shrink-0">
                    <Icon name="icon-truck" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1">
                      Correo Electrónico
                    </h3>
                    <p className="text-black">
                      soportecomercial@tracystore.com
                    </p>
                    <p className="text-sm text-black mt-1">
                      Respondemos en menos de 24h
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-burgundy/15 flex items-center justify-center text-burgundy shrink-0">
                    <Icon name="icon-bag" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1">Dirección</h3>
                    <p className="text-black">Carrera 45 # 108 - 38</p>
                    <p className="text-black">Medellín, Antioquia, Colombia</p>
                  </div>
                </div>
              </div>

              {/* Formulario simple */}
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black mb-2"
                  >
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-black focus:border-golden focus:ring-1 focus:ring-golden outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black mb-2"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-black focus:border-golden focus:ring-1 focus:ring-golden outline-none transition-all"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-black mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-black focus:border-golden focus:ring-1 focus:ring-golden outline-none transition-all"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-burgundy text-golden py-4 rounded-xl font-bold tracking-widest hover:bg-opacity-90 transition-all uppercase shadow-lg hover:shadow-xl transform hover:-translate-y-"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <SalesSidebar />
        </div>
      </div>
    </div>
  );
}
