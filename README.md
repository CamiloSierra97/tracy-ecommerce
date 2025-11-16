# Tracy Lencería: Headless E-commerce Frontend

Frontend para una tienda de lencería desarrollado con Next.js y TypeScript. Este proyecto opera bajo una arquitectura headless, donde la interfaz de usuario se desacopla y consume los datos de productos y transacciones desde una instancia de WooCommerce a través de su API REST.

# Descripción

Frontend para una tienda de lencería desarrollado con Next.js y TypeScript. Este proyecto opera bajo una arquitectura headless, donde la interfaz de usuario se desacopla y consume los datos de productos y transacciones desde una instancia de WooCommerce a través de su API REST.

# Tecnologías

Este proyecto está construido sobre una pila moderna enfocada en el rendimiento y la escalabilidad:

Framework: Next.js (App Router)

Lenguaje: TypeScript

Estilos: Tailwind CSS (Clases utilitarias)

Paleta de Marca: Borgoña (#580a1e), Borgoña Claro (#8a505e), Dorado (#ddb153), Oro (#d4af37), Oro Claro (#ffe895), Marfil (#f4f1ec), Gris (#5a5856), Negro (#1c1c1c).

Gestión de Datos: TanStack Query (React Query) para manejar el fetching, caching y paginación de los productos.

Backend/CMS: WooCommerce REST API (como fuente de datos Headless).

HTTP Client: Axios para las peticiones a la API de WooCommerce.

#   Estructura del código

La estructura sigue el patrón del App Router de Next.js, con una organización clara para la lógica de la aplicación:

```text
tracy-ecommerce/
|-- public/               # Archivos estáticos (SVG Sprite, Logos, Patrones, Imágenes)
|-- src/
|   |-- app/              # Rutas principales (ej: /page.tsx, /layout.tsx)
|   |-- components/       # Componentes de UI reutilizables (Header, Products, ProductsGrid)
|   |-- hooks/            # Lógica de hooks personalizados (ej: useProducts con TanStack Query)
|   |-- lib/              # Utilidades del lado del servidor (ej: Importación de fuentes)
|   |-- providers/        # Componentes de contexto (ej: ReactQueryProvider)
|   |-- types/            # Definiciones de tipos de TypeScript (WooProduct)
|-- .env.local            # Variables de entorno secretas (API Keys en modo DEV)
|-- next.config.ts        # Configuración de Next.js
|-- package.json          # Dependencias y scripts
|-- tailwind.config.js    # Configuración de Tailwind CSS

