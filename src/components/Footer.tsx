//import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-black py-12 px-4 font-(--font-roboto-serif)">
      {/*<Image src={"/Pattern.svg"} alt="Pattern" width={1300} height={1300}/>*/}
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-gray-800 pt-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Tracy Lencería</h3>
            <p className="text-gray-400">
              Tu tienda de lencería premium en línea.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <a href="/shop" className="hover:text-white transition-colors">
                  Tienda
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  Acerca de
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Atención al Cliente</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Envíos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Información Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            © 2025 Tracy Lencería®. Todos los derechos reservados.
          </p>
          <p className="text-center text-gray-400">Made with 💖 by SierraDev</p>
        </div>
      </div>
    </footer>
  );
}
