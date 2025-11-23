export function formatPrice(price: string | number): string {
  const num = typeof price === "string" ? Number.parseFloat(price) : price
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(num)
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}
