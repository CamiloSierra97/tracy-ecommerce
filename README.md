# Tracy Lencería: Frontend Headless de E‑commerce

Frontend para una tienda de lencería desarrollado con **Next.js** y **TypeScript**. Este proyecto opera bajo una arquitectura _headless_, donde la interfaz de usuario se desacopla y consume los datos de productos y transacciones desde una instancia de **WooCommerce** a través de su API REST.

## Descripción

Este repositorio contiene el código del cliente web que muestra los productos, gestiona el carrito, procesa pagos y brinda una experiencia de compra fluida y visualmente atractiva. Todas las interacciones con el backend se realizan mediante llamadas a la API de WooCommerce.

## Tecnologías

- **Framework**: Next.js (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS (clases utilitarias)
- **Gestión de datos**: TanStack Query (React Query) para fetching, caching y paginación de productos
- **Backend/CMS**: WooCommerce REST API (fuente de datos headless)
- **Cliente HTTP**: Axios para peticiones a la API de WooCommerce

### Paleta de Marca

- Borgoña: `#580a1e`
- Borgoña Claro: `#8a505e`
- Dorado: `#ddb153`
- Oro: `#d4af37`
- Oro Claro: `#ffe895`
- Marfil: `#f4f1ec`
- Negro: `#1c1c1c`

## Estructura del código

La estructura sigue el patrón del **App Router** de Next.js, con una organización clara para la lógica de la aplicación:

```text
tracy-ecommerce/
|-- public/               # Archivos estáticos (SVG Sprite, Logos, Patrones, Imágenes)
|-- src/
|   |-- app/              # Rutas principales (ej: /page.tsx, /layout.tsx)
|   |-- components/       # Componentes UI reutilizables (Header, Products, ProductsGrid, CartDrawer, etc.)
|   |-- hooks/            # Lógica de hooks personalizados (ej: useProducts con TanStack Query)
|   |-- lib/              # Utilidades del lado del servidor (ej: importación de fuentes, helpers)
|   |-- providers/        # Componentes de contexto (ej: ReactQueryProvider)
|   |-- types/            # Definiciones de tipos de TypeScript (WooProduct, etc.)
|-- .env.local            # Variables de entorno secretas (API Keys en modo DEV)
|-- next.config.ts        # Configuración de Next.js
|-- package.json          # Dependencias y scripts
|-- tailwind.config.js    # Configuración de Tailwind CSS
```

## Arquitectura de UI y Mejoras (Nuevo)

### Componentes Destacados

- **Hero Carousel**: Carrusel principal optimizado con transiciones suaves, navegación por gestos (en desarrollo) y paginación estilo "glassmorphism".
  - **Animaciones**: Flechas con efecto "pulso" y desplazamiento al hover para invitar a la interacción.
  - **Indicadores**: Diseño premium con barra dorada activa y puntos expansibles.

### Metodología y Estándares

- **BEM (Block, Element, Modifier)**: Se ha adoptado estrictamente la convención BEM en componentes críticos (`HeroSection`, `TripleBanner`, `HeroCarousel`) para garantizar estilos encapsulados y mantenibles.
  - Ejemplo: `.hero-carousel__slide--active`, `.triple-banner__content`.

### Optimización de Performance (Mobile First)

- **Carga Condicional de Imágenes**:
  - Se evita la descarga de imágenes pesadas de escritorio en dispositivos móviles mediante Media Queries en CSS (`globals.css`).
  - Mobile: Fondo de color sólido o degradado ligero (0 bytes de imagen).
  - Desktop: Carga diferida de imágenes de alta resolución (`background-image: url(...)`).
- **Sprite SVG**: Uso de un archivo único `Sprite.svg` para iconos (`<use href="...">`), reduciendo el tamaño del DOM y mejorando el caché.

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/tracy-ecommerce.git
   cd tracy-ecommerce
   ```
2. **Instalar dependencias**
   ```bash
   npm install
   ```
3. **Crear archivo de variables de entorno**
   Copia el ejemplo y configura tus credenciales de WooCommerce:
   ```bash
   cp .env.example .env.local
   ```
   Edita `.env.local` con los valores correctos (`NEXT_PUBLIC_WC_URL`, `NEXT_PUBLIC_WC_CONSUMER_KEY`, `NEXT_PUBLIC_WC_CONSUMER_SECRET`).
4. **Ejecutar el proyecto en modo desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

## Configuración

- **Tailwind CSS**: El archivo `tailwind.config.js` contiene la configuración de colores personalizados y extensiones de tipografía.
- **Next.js**: En `next.config.ts` puedes habilitar la generación de imágenes optimizadas y definir dominios permitidos.
- **React Query**: El `ReactQueryProvider` envuelve la aplicación para gestionar el caché y la revalidación de datos.
- **Accesibilidad**: Se han añadido atributos ARIA en componentes críticos como `CartDrawer`, `AuthModal` y `UserDropdown` para mejorar la experiencia de usuarios con lectores de pantalla.

## Scripts útiles

| Script          | Descripción                                                 |
| --------------- | ----------------------------------------------------------- |
| `npm run dev`   | Inicia el servidor de desarrollo en modo hot‑reload.        |
| `npm run build` | Genera la versión de producción optimizada.                 |
| `npm run start` | Ejecuta la versión construida (`npm run build` primero).    |
| `npm run lint`  | Ejecuta ESLint para detectar problemas de estilo y errores. |
| `npm run test`  | Ejecuta los tests (si están configurados).                  |

## Contribución

1. **Fork** el repositorio.
2. Crea una rama para tu feature o corrección:
   ```bash
   git checkout -b mi-feature
   ```
3. Realiza tus cambios y asegura que el proyecto sigue compilando sin errores.
4. Abre un **Pull Request** describiendo los cambios y su motivo.

> **Nota:** Mantén los comentarios del código en español para coherencia con la base del proyecto.

## Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

## Contacto

- **Autor**: SierraDev (Camilo Sierra)
- **Correo**: camilo.sierra@example.com
- **Sitio web**: https://tracy-lenceria.com

---

_¡Gracias por usar Tracy Lencería! Esperamos que disfrutes desarrollando y extendiendo esta solución de e‑commerce headless._
