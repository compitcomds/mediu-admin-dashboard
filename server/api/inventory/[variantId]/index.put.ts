import updateVariantInventoryQuantity from "./updateVariantQuantity";

export default defineEventHandler(async (event) => {
  const variantId = event.context.params?.variantId;
  if (!variantId) throw new Error("Variant id not provided.");
  const body = await readBody(event);
  const delta = body.delta;
  const absolute = body.absolute;
  if (!delta && !absolute)
    throw new Error(
      "Please provide either a change in value (delta) or an absolute value (absolute).",
    );

  if (!!delta && typeof delta !== "number")
    throw new Error("The provided value of delta is not number.");

  if (!!absolute && typeof absolute !== "number")
    throw new Error("The provided value of absolute is not a number.");

  try {
    await updateVariantInventoryQuantity(variantId, delta, absolute);
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage:
        error.message ||
        "Unable to create the inventory at the time. Please try again later.",
    });
  }
});
