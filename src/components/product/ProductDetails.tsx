import { Product } from "@/services/WooCommerceService";
import Icon from "@/components/ui/Icon";
import ProductGallery from "./ProductGallery";
import AddToCartBtn from "./AddToCartBtn";

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const images = product.images && product.images.length > 0
        ? product.images
        : [{ id: 0, src: "/placeholder.png", name: product.name }];

    return (
        <article className="product-details max-w-[1400px] mx-auto px-4 md:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
                {/* --- Left Column: Images (Client Component) --- */}
                <ProductGallery images={images} productName={product.name} />

                {/* --- Right Column: Info (Server Component) --- */}
                <div className="product-details__info flex flex-col sticky top-24 self-start">
                    <div className="mb-2">
                        <span className="text-sm uppercase tracking-widest text-gray-500 font-medium font-secondary">New Collection</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-serif text-burgundy mb-4 leading-tight">{product.name}</h1>

                    <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 font-secondary">
                        ${new Intl.NumberFormat('es-CO').format(parseInt(product.price) || 0)}
                    </div>

                    <div className="prose prose-stone mb-10 text-gray-600 leading-relaxed max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: product.description || product.short_description }} />
                    </div>

                    <div className="flex flex-col gap-6 border-t border-gray-100 pt-8">
                        {/* Add to Cart Button (Client Component) */}
                        <AddToCartBtn product={product} />
                    </div>

                    {/* Additional Info / Trust Badges */}
                    <div className="grid grid-cols-2 gap-4 mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-burgundy shadow-sm">
                                <Icon name="icon-truck" size={20} />
                            </div>
                            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Envío Seguro</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-burgundy shadow-sm">
                                <Icon name="icon-refresh" size={20} />
                            </div>
                            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Cambios Fáciles</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
