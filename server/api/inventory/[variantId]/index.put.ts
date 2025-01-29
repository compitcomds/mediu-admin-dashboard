import updateVariantInventoryQuantity from "./helpers/updateVariantQuantity";

export default defineEventHandler(async (event) => {
  const variantId = event.context.params?.variantId;
  if (!variantId) throw new Error("Variant id not provided.");
  const body = await readBody(event);
  const delta = body.delta;
  const absolute = body.absolute;

  const inValidDelta =
    delta === undefined || delta === null || typeof delta !== "number";

  const inValidAbsolute =
    absolute === undefined || absolute === null || typeof absolute !== "number";

  if (inValidDelta && inValidAbsolute)
    throw createError({
      statusCode: 400,
      statusMessage:
        "Please provide either a change in value (delta) or an absolute value (absolute).",
    });

  if (!!delta && inValidDelta)
    throw createError({
      statusCode: 400,
      statusMessage: "The provided value of delta is not number.",
    });

  if (!!absolute && inValidAbsolute)
    throw createError({
      statusCode: 400,
      statusMessage: "The provided value of absolute is not a number.",
    });

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
