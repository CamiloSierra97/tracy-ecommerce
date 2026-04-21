import Image from "next/image";
import Link from "next/link";
import WooCommerceService from "@/services/WooCommerceService";
import { formatPrice } from "@/lib/utils/currency";
import CarouselScroller from "@/components/shared/ui/CarouselScroller";

export default async function FeaturedProducts() {
  const { products } = await WooCommerceService.getProducts({
    per_page: 8,
    orderby: "popularity",
    order: "desc",
  });

  if (!products.length) return null;

  return (
    <section className="featured-products py-12 md:py-16 bg-white overflow-hidden">
      <div className="featured-products__inner max-w-[1920px] mx-auto px-6">

        {/* Cabecera */}
        <div className="featured-products__header text-center mb-8">
          <h2 className="featured-products__title font-serif text-3xl md:text-4xl text-gray-900">
            Recomendados para ti
          </h2>
          <div className="w-16 h-px bg-burgundy/40 mx-auto mt-3" />
        </div>

        {/* Carrusel horizontal — envuelto en Client Component para las flechas */}
        <CarouselScroller trackClassName="gap-4 md:gap-6 pb-4 pt-2 px-1">
          {products.map((product, i) => {
            const imageSrc = product.images?.[0]?.src ?? "/placeholder.png";
            const price = product.sale_price || product.price;
            const isOnSale = !!product.sale_price;

            return (
              <Link
                key={product.id}
                href={`/productos/${product.slug ?? product.id}`}
                className="featured-products__card group snap-start shrink-0
                           w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12
                           flex flex-col"
              >
                {/* Imagen */}
                <div className="featured-products__card-image relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-gray-50">
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    priority={i < 3}
                    sizes="(max-width: 640px) 66vw, (max-width: 768px) 41vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
                    className="object-cover transition-transform duration-500 ease-out lg:group-hover:scale-105"
                  />
                  {isOnSale && (
                    <span className="absolute top-2 left-2 bg-burgundy text-ivory text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Oferta
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="featured-products__card-info mt-3 px-1">
                  <p className="featured-products__card-name text-sm font-medium text-gray-800 line-clamp-2 leading-snug lg:group-hover:text-burgundy transition-colors">
                    {product.name}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-bold text-gray-900">
                      {formatPrice(price)}
                    </span>
                    {isOnSale && product.regular_price && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.regular_price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </CarouselScroller>

        {/* CTA */}
        <div className="featured-products__cta text-center mt-8">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 border border-black px-8 py-3 text-sm uppercase tracking-widest font-medium transition-all hover:bg-black hover:text-white"
          >
            Ver toda la colección
          </Link>
        </div>
      </div>
    </section>
  );
}
