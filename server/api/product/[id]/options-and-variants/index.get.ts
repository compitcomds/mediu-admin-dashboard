import getAllProductOptionsAndVariants from "./getAllOptionsAndVariants";

export default defineEventHandler(async (event) => {
  const productId = event.context.params?.id;
  if (!productId) throw new Error("Product id not provided.");
  try {
    const productOptionsAndVariants = await getAllProductOptionsAndVariants(
      productId
    );
    if (!productOptionsAndVariants) throw new Error("Product not found.");

    return productOptionsAndVariants;
  } catch (error: any) {
    return error;
  }
});
