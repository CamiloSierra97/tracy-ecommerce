import { Metadata } from "next";
import Products from "@/components/product/Products";
import { notFound } from "next/navigation";

// Define the valid categories to match the static links
const VALID_CATEGORIES = ["nina", "mujer", "hombre", "promociones"];

type Props = {
    params: Promise<{ category: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Generate dynamic metadata for SEO
export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { category } = await params;

    if (!VALID_CATEGORIES.includes(category)) {
        return {
            title: "Página no encontrada",
        };
    }

    const title = category.charAt(0).toUpperCase() + category.slice(1);
    return {
        title: `${title} - Tracy E-commerce`,
        description: `Explora nuestra colección exclusiva de lencería y ropa interior para ${category}.`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;

    // Validate category to prevent random URLs from loading this page, return 404 if invalid
    if (!VALID_CATEGORIES.includes(category)) {
        notFound();
    }

    // Format title for display (e.g., "mujer" -> "Mujer")
    const displayTitle = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <main className="main-category">
            <Products title={displayTitle} basePath={`/${category}`} />
        </main>
    );
}
