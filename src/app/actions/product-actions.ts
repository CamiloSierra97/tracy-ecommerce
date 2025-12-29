"use server";

import WooCommerceService from "@/services/WooCommerceService";
import { revalidatePath } from "next/cache";

import { z } from "zod";

const ReviewSchema = z.object({
  productId: z.number().min(1, "ID de producto inválido"),
  rating: z.number().min(1).max(5),
  review: z
    .string()
    .min(3, "La reseña es muy corta")
    .max(1000, "La reseña es muy larga"),
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Email inválido"),
});

export async function submitReview(formData: FormData) {
  const rawData = {
    productId: Number(formData.get("productId")),
    rating: Number(formData.get("rating")),
    review: formData.get("review") as string,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
  };

  const validation = ReviewSchema.safeParse(rawData);

  if (!validation.success) {
    const errorMessage = validation.error.issues[0].message;
    return { success: false, message: errorMessage };
  }

  const { productId, rating, review, name, email } = validation.data;

  const result = await WooCommerceService.createProductReview({
    product_id: productId,
    rating,
    review,
    reviewer: name,
    reviewer_email: email,
  });

  if (result.success) {
    revalidatePath(`/productos/${productId}`);
    return { success: true };
  } else {
    return { success: false, message: result.message };
  }
}
