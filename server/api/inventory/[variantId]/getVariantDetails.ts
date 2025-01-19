import shopifyClient from "~/server/helpers/shopify-graphql-client";

const DEFAULT_LOCATION_ID = "gid://shopify/Location/69352587337";
const productVariantInventoryQuery = `
query productVariantInventoryQuery($id: ID!) {
  productVariant(id: $id) {
    id
    inventoryQuantity
    inventoryItem {
      id
      inventoryLevels(first: 1) {
        nodes {
          location {
            id
          }
          quantities(names: "available") {
            quantity
          }
        }
      }
    }
  }
}`;

export default async function getVariantInventoryDetails(variantId: string) {
  const { data } = await shopifyClient.request({
    query: productVariantInventoryQuery,
    variables: { id: `gid://shopify/ProductVariant/${variantId}` },
  });
  const variant = data.data.productVariant as null | {
    id: string;
    inventoryQuantity: number;
    inventoryItem: {
      id: string;
      inventoryLevels: {
        nodes: Array<{
          location: { id: string };
          quantities: Array<{ quantity: number }>;
        }>;
      };
    };
  };
  if (!variant) throw new Error("Invalid variant id. No such variant exists.");
  const inventoryLevels = variant.inventoryItem?.inventoryLevels?.nodes.map(
    (node) => ({
      location: node.location.id,
      quantity: node.quantities[0]?.quantity || 0,
    }),
  );

  const defaultLevel = inventoryLevels.find(
    (loc) => loc.location === DEFAULT_LOCATION_ID,
  );

  const toUpdateInventoryLevel =
    inventoryLevels.length > 0
      ? defaultLevel || inventoryLevels[0]
      : { location: DEFAULT_LOCATION_ID, quantity: 0 };

  return {
    ...variant,
    inventoryItemId: variant.inventoryItem.id,
    inventory: toUpdateInventoryLevel,
  };
}
