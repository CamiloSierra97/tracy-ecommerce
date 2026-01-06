// Componente Footer (movido a la carpeta layout)
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="footer bg-burgundy text-ivory py-12 px-4 font-sans"
    >
      <div className="footer__container max-w-6xl mx-auto">
        <div className="footer__divider border-t-2 border-burgundy-light/50 pt-8"></div>
        <div className="footer__grid grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="footer__section">
            <h2 className="footer__title font-roboto-serif font-semibold text-xl mb-4 text-gold">
              Tracy
            </h2>
            <p className="footer__description text-ivory/80">
              Tu tienda de ropa interior premium en línea.
            </p>
          </div>
          <div className="footer__section">
            <h3 className="footer__title font-roboto-serif font-semibold mb-4 text-gold">
              Enlaces Rápidos
            </h3>
            <ul className="footer__list space-y-2 text-ivory/80">
              <li>
                <Link
                  href="/"
                  className="footer__link hover:text-gold transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/tienda"
                  className="footer__link hover:text-gold transition-colors"
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  href="/acerca-de"
                  className="footer__link hover:text-gold transition-colors"
                >
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__section">
            <h3 className="footer__title font-roboto-serif font-semibold mb-4 text-gold">
              Atención al Cliente
            </h3>
            <ul className="footer__list space-y-2 text-ivory/80">
              <li>
                <Link
                  href="/contacto"
                  className="footer__link hover:text-gold transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="footer__link hover:text-gold transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/envios"
                  className="footer__link hover:text-gold transition-colors"
                >
                  Envíos
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__section">
            <h3 className="footer__title font-roboto-serif font-semibold mb-4 text-gold">
              Información Legal
            </h3>
            <ul className="footer__list space-y-2 text-ivory/80">
              <li>
                <Link
                  href="/terminos"
                  className="footer__link hover:text-gold transition-colors"
                >
                  Términos
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="footer__link hover:text-gold transition-colors"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="footer__link hover:text-gold transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom border-t-2 border-burgundy-light/50 pt-8">
          <p className="footer__copyright text-center text-ivory/60 text-sm">
            © 2025 Tracy Lencería®. Todos los derechos reservados.
          </p>
          <p className="footer__credit text-center text-ivory/60 text-sm mt-2">
            Made with 💖 by SierraDev
          </p>
        </div>
      </div>
    </footer>
  );
}
