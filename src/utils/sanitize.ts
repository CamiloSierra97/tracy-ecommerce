/**
 * Utilidades para sanitización de contenido HTML
 */

/**
 * Sanitiza y limpia HTML de una descripción de producto
 * @param description - Descripción HTML que puede contener tags
 * @param maxLength - Longitud máxima opcional (útil para meta descriptions)
 * @returns String limpio sin tags HTML
 */
export function sanitizeProductDescription(
  description: string | undefined,
  maxLength?: number,
): string {
  if (!description) return "";

  // Eliminar todos los tags HTML
  const clean = description.replace(/<[^>]*>?/gm, "");

  // Aplicar longitud máxima si se especifica
  if (maxLength && clean.length > maxLength) {
    return clean.slice(0, maxLength);
  }

  return clean;
}

/**
 * Limpia HTML preservando saltos de línea básicos
 * @param html - Contenido HTML
 * @returns String limpio con saltos de línea preservados
 */
export function sanitizeWithBreaks(html: string | undefined): string {
  if (!html) return "";

  return html
    .replace(/<br\s*\/?>/gi, "\n") // Convertir <br> a saltos de línea
    .replace(/<[^>]*>?/gm, "") // Eliminar otros tags
    .trim();
}
