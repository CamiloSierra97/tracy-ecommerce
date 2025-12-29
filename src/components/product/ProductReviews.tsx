import { Review } from "@/services/WooCommerceService";
import StarRating from "@/components/ui/StarRating";
import ReviewForm from "./ReviewForm";
import DOMPurify from "isomorphic-dompurify";

interface ProductReviewsProps {
  reviews: Review[];
  productId: number;
  productName: string;
}

export default function ProductReviews({
  reviews,
  productId,
  productName,
}: ProductReviewsProps) {
  // Calcular calificación promedio
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  return (
    <section className="product-reviews py-16 bg-white border-t border-gray-100">
      <div className="product-reviews__container max-w-[1400px] mx-auto px-4 md:px-8">
        <h2 className="product-reviews__title text-3xl font-serif text-burgundy mb-10 text-center">
          Opiniones de Clientes
        </h2>

        {reviews.length === 0 ? (
          <div className="product-reviews__empty text-center text-gray-500 py-10 bg-gray-50 rounded-xl mb-12">
            <p>
              Aún no hay opiniones para este producto. ¡Sé el primero en
              comentar!
            </p>
          </div>
        ) : (
          <div className="product-reviews__content grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Columna de Resumen */}
            <div className="product-reviews__summary lg:col-span-4 flex flex-col items-center p-8 bg-gray-50 rounded-2xl h-fit sticky top-24">
              <div className="text-6xl font-bold text-burgundy mb-2 font-secondary">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={averageRating} size={24} className="mb-4" />
              <p className="text-gray-500 font-medium">
                Basado en {reviews.length}{" "}
                {reviews.length === 1 ? "opinión" : "opiniones"}
              </p>
            </div>

            {/* Columna de Lista de Opiniones */}
            <div className="product-reviews__list lg:col-span-8 space-y-8">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="review-card border-b border-gray-100 pb-8 last:border-0 animation-fade-in"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="review-card__header">
                      <h4 className="font-bold text-gray-900 text-lg mb-1">
                        {review.reviewer}
                      </h4>
                      <StarRating rating={review.rating} size={14} />
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(review.date_created).toLocaleDateString(
                        "es-CO",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <div
                    className="review-card__content text-gray-600 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(review.review),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulario de Opinión */}
        <div className="product-reviews__form-container max-w-3xl mx-auto">
          <ReviewForm productId={productId} productName={productName} />
        </div>
      </div>
    </section>
  );
}
