// Footer component (moved to layout folder)
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer bg-gray-900 text-gray-200 py-12 px-4 font-(--font-roboto-serif)">
            <div className="footer__container max-w-6xl mx-auto">
                <div className="footer__divider border-t border-gray-800 pt-8"></div>
                <div className="footer__grid grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="footer__section">
                        <h3 className="footer__title font-semibold text-lg mb-4">Tracy</h3>
                        <p className="footer__description text-gray-400">Tu tienda de ropa interior premium en línea.</p>
                    </div>
                    <div className="footer__section">
                        <h4 className="footer__title font-semibold mb-4">Enlaces Rápidos</h4>
                        <ul className="footer__list space-y-2 text-gray-400">
                            <li><Link href="/" className="footer__link hover:text-white transition-colors">Inicio</Link></li>
                            <li><Link href="/tienda" className="footer__link hover:text-white transition-colors">Tienda</Link></li>
                            <li><Link href="/acerca-de" className="footer__link hover:text-white transition-colors">Acerca de</Link></li>
                        </ul>
                    </div>
                    <div className="footer__section">
                        <h4 className="footer__title font-semibold mb-4">Atención al Cliente</h4>
                        <ul className="footer__list space-y-2 text-gray-400">
                            <li><Link href="/contacto" className="footer__link hover:text-white transition-colors">Contacto</Link></li>
                            <li><Link href="/faq" className="footer__link hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/envios" className="footer__link hover:text-white transition-colors">Envíos</Link></li>
                        </ul>
                    </div>
                    <div className="footer__section">
                        <h4 className="footer__title font-semibold mb-4">Información Legal</h4>
                        <ul className="footer__list space-y-2 text-gray-400">
                            <li><Link href="/terminos" className="footer__link hover:text-white transition-colors">Términos</Link></li>
                            <li><Link href="/privacidad" className="footer__link hover:text-white transition-colors">Privacidad</Link></li>
                            <li><Link href="/cookies" className="footer__link hover:text-white transition-colors">Cookies</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer__bottom border-t border-gray-800 pt-8">
                    <p className="footer__copyright text-center text-gray-400">© 2025 Tracy Lencería®. Todos los derechos reservados.</p>
                    <p className="footer__credit text-center text-gray-400">Made with 💖 by SierraDev</p>
                </div>
            </div>
        </footer>
    );
}
