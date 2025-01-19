import shopifyClient from "~/server/helpers/shopify-graphql-client";
import getVariantInventoryDetails from "./getVariantInventoryDetails";

const inventoryAdjustmentMutation = `
mutation inventoryAdjustmentMutation($delta: Int!, $inventoryItemId: ID!, $locationId: ID!, $reason: String!) {
  inventoryAdjustQuantities(
    input: {reason: $reason, name: "available", changes: {delta: $delta, inventoryItemId: $inventoryItemId, locationId: $locationId}}
  ) {
    inventoryAdjustmentGroup {
      id
    }
    userErrors {
      code
      field
      message
    }
  }
}`;

function getInventoryUpdateReason(delta: number) {
  if (delta > 0) return "received";
  return "correction";
}

export default async function updateVariantInventoryQuantity(
  variantId: string,
  delta?: number,
  absolute?: number,
) {
  const { inventoryItemId, inventory } =
    await getVariantInventoryDetails(variantId);

  if (!delta && !absolute)
    throw new Error("Neither delta nor absolute provided.");

  let change = !!delta ? delta : (absolute as number) - inventory.quantity;

  const { data } = await shopifyClient.request({
    query: inventoryAdjustmentMutation,
    variables: {
      delta: change,
      inventoryItemId,
      locationId: inventory.location,
      reason: getInventoryUpdateReason(change),
    },
  });
  if (data.data?.inventoryAdjustQuantities?.inventoryAdjustmentGroup?.id)
    return;
  const errors: string = data.errors.map((err: any) => err.message).join(", ");
  if (errors.length > 0) throw new Error(errors);
  const userErrors = data.data.userErrors;
  if (userErrors.length > 0)
    throw new Error(userErrors.map((err: any) => err.message).join(", "));
  throw new Error(
    "Unable to update the quantity of the item right now. Please try again later.",
  );
}
