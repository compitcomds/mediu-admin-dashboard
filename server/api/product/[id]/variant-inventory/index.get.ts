import shopifyClient from "~/server/helpers/shopify-graphql-client";

const productVariantInventoryQuantityQuery = `
query productVariantInventoryQuantity($id: ID!) {
  product(id: $id) {
    variants(first: 100) {
      nodes {
        id: legacyResourceId
        inventoryQuantity
      }
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const productId = event.context.params?.id;
  if (!productId) throw new Error("Product id not provided.");
  const { data } = await shopifyClient.request({
    query: productVariantInventoryQuantityQuery,
    variables: { id: `gid://shopify/Product/${productId}` },
  });
  if (!data.data.product) return null;
  return data.data.product.variants?.nodes || [];
});
