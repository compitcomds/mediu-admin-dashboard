import getVariantDetails from "./helpers/getVariantDetails";

export default defineEventHandler(async (event) => {
  const variantId = event.context.params?.variantId;
  if (!variantId) throw new Error("Variant id not provided.");

  try {
    return await getVariantDetails(variantId);
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message || "Unable to fint the variant.",
    });
  }
});
