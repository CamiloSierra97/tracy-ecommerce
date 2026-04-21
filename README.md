# Tracy E-commerce

Tracy E-commerce es un frontend de comercio electrónico headless construido para consumir datos de productos y transacciones desde una API REST de WooCommerce. Está diseñado para proveer una experiencia de compra en línea robusta, rápida y escalable. La arquitectura desacopla la interfaz de usuario del CMS del backend, permitiendo interacciones del cliente altamente responsivas mientras mantiene la gestión de contenido estructurada del lado del servidor.

## Stack Tecnológico

- **Framework**: Next.js (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Herramientas**: React Query, Framer Motion, ESLint
- **Enfoque Arquitectónico**: Next.js App Router con Server Components, Server Actions para mutaciones de datos e integración headless con el backend de WooCommerce.

## Estructura del Proyecto

El proyecto sigue una estructura de archivos modular y orientada al dominio, optimizada para el App Router de Next.js:

- `src/app`: Contiene la configuración de enrutamiento basado en el sistema de archivos. Actúa como el punto de entrada para todas las páginas y layouts.
- `src/components`: Aloja componentes de interfaz de usuario reutilizables, organizados por dominios funcionales.
- `src/services`: Encapsula la lógica de obtención de datos y la comunicación con APIs externas, específicamente con la API REST de WooCommerce.
- `src/actions`: Contiene los Server Actions de Next.js para el manejo seguro de formularios del lado del servidor y mutaciones de datos.
- `src/hooks` y `src/context`: Gestión del estado en el lado del cliente y hooks personalizados de React.
- `src/lib` y `src/utils`: Funciones utilitarias puras y lógica compartida de la aplicación.

## Principios Arquitectónicos

- **Server Components por Defecto**: Maximizamos el uso de React Server Components (RSC) para reducir los payloads de JavaScript del lado del cliente, mejorar los tiempos de carga inicial y asegurar un manejo de datos seguro.
- **Client Components bajo Demanda**: La directiva `"use client"` se restringe a las hojas del árbol de componentes y se utiliza únicamente cuando la interactividad, los hooks o las APIs del navegador son estrictamente necesarios.
- **Mentalidad Centrada en el Rendimiento**: La aplicación prioriza el cumplimiento óptimo de los Core Web Vitals, aprovechando el almacenamiento en caché, el renderizado estático donde sea posible y el code splitting.
- **Desarrollo Orientado al SEO**: El SEO técnico está integrado desde la base, asegurando HTML semántico, etiquetas canónicas correctas, metadatos y una estructura rastreable para una mejor indexación en motores de búsqueda.

## Primeros Pasos

Para ejecutar el proyecto localmente, asegúrate de tener Node.js instalado y sigue estos pasos:

1. Instala las dependencias:
```bash
npm install
```

2. Configura las variables de entorno creando un archivo `.env.local` con las credenciales requeridas de WooCommerce.

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre la aplicación en el navegador en `http://localhost:3000`.

## Scripts

- `npm run dev`: Inicia el servidor de desarrollo de Next.js con Fast Refresh.
- `npm run build`: Crea una compilación optimizada de la aplicación para producción.
- `npm run start`: Inicia la aplicación en modo producción utilizando la compilación generada.
- `npm run lint`: Ejecuta ESLint para analizar estáticamente el código y aplicar las guías de estilo.

## Notas de Rendimiento y SEO

- **Obtención de Datos del Lado del Servidor**: El catálogo de productos y los datos críticos se obtienen en el servidor utilizando los métodos de fetching de Next.js, apoyándose en React Query para el almacenamiento en caché subsecuente del lado del cliente.
- **Optimización de Imágenes**: Los recursos multimedia utilizan el componente `<Image>` de Next.js para optimización automática de formatos, carga diferida (lazy loading) y prevención de cambios de diseño (layout shift).
- **Uso de Metadatos**: Las páginas dinámicas y estáticas implementan la API de Metadatos de Next.js para generar etiquetas de título precisas, meta descripciones y etiquetas Open Graph para una indexación óptima.

## Estado

En progreso. La estructura central de la aplicación, el enrutamiento del catálogo de productos y la integración headless están establecidos. El desarrollo activo se centra en refinar la arquitectura y preparar las funcionalidades para su despliegue en producción.

## Futuras Mejoras

- Implementación de autenticación segura de usuarios.
- Finalización del flujo completo de pago (checkout) e integración de pasarelas de pago.
- Mejoras en la persistencia del carrito y validación de stock en tiempo real.
- Introducción de suites exhaustivas de pruebas (testing).
