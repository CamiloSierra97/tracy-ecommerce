/**
 * Constantes de configuración de la aplicación
 * Centraliza "magic numbers" y valores configurables
 */

// Configuración de imágenes
export const PRIORITY_IMAGES_COUNT = 4; // Primeras 4 imágenes en viewport inicial (above-the-fold)

// Configuración de productos
export const PRODUCTS_PER_PAGE = 8; // Productos por página en listados
export const MAX_DESCRIPTION_LENGTH = 160; // Longitud máxima para meta descriptions

// Configuración de zoom en modales
export const ZOOM_MIN_SCALE = 1; // Escala mínima de zoom
export const ZOOM_MAX_SCALE = 5; // Escala máxima de zoom
export const ZOOM_STEP = 0.5; // Paso de incremento/decremento de zoom

// Configuración de IntersectionObserver para scroll infinito
export const INFINITE_SCROLL_ROOT_MARGIN = "200px"; // Margen para cargar antes de llegar al final
