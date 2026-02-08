import Icon from "@/components/ui/Icon";
import ProductGallery from "./ProductGallery";
import ProductInteraction from "./ProductInteraction";
import ProductPrice from "./ProductPrice";
import sanitizeHtml from "sanitize-html";
import WooCommerceService from "@/services/WooCommerceService";
import { Product, ProductVariation } from "@/services/WooCommerceService";

interface ProductDetailsProps {
  product: Product;
}

export default async function ProductDetails({ product }: ProductDetailsProps) {
  // SSR: Obtener variaciones si el producto es variable
  let variations: ProductVariation[] = [];
  if (product.type === "variable") {
    variations = await WooCommerceService.getProductVariations(product.id);
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [{ id: 0, src: "/placeholder.png", name: product.name }];

  // Usar utilidad de sanitización
  const cleanDescription =
    product.description || product.short_description || "";

  return (
    <article className="product-details max-w-[1400px] mx-auto px-4 md:px-8 py-10">
      <div className="product-details__grid grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* --- Columna Izquierda: Imágenes --- */}
        <ProductGallery images={images} productName={product.name} />

        {/* --- Columna Derecha: Información --- */}
        <div className="product-details__info flex flex-col sticky top-24 self-start">
          <div className="product-details__badge-container mb-2">
            <span className="product-details__badge text-sm uppercase tracking-widest text-gray-500 font-medium font-secondary">
              New Collection
            </span>
          </div>

          <h1 className="product-details__title text-3xl md:text-5xl font-serif text-burgundy mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Precio Dinámico */}
          <ProductPrice basePrice={product.price} />

          <div className="product-details__description prose prose-stone mb-10 text-gray-600 leading-relaxed max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(cleanDescription),
              }}
            />
          </div>

          {/* Lógica de Selección y Compra (Componente Cliente wrapper) */}
          <ProductInteraction product={product} variations={variations} />

          {/* Información Adicional / Insignias de Confianza */}
          <div className="product-details__trust-badges grid grid-cols-2 gap-4 mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="trust-badge flex items-center gap-3">
              <div className="trust-badge__icon-box size-10 rounded-full bg-ivory flex items-center justify-center text-burgundy shadow-sm">
                <Icon name="icon-truck" size={20} />
              </div>
              <span className="trust-badge__text text-xs font-medium text-gray-600 uppercase tracking-wide">
                Envío Seguro
              </span>
            </div>
            <div className="trust-badge flex items-center gap-3">
              <div className="trust-badge__icon-box size-10 rounded-full bg-ivory flex items-center justify-center text-burgundy shadow-sm">
                <Icon name="icon-refresh" size={20} />
              </div>
              <span className="trust-badge__text text-xs font-medium text-gray-600 uppercase tracking-wide">
                Cambios Fáciles
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
