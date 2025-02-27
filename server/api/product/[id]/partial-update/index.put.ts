import shopifyClient from "~/server/helpers/shopify-graphql-client";

const partialUpdateProductMutation = `
mutation partialUpdateProduct($product: ProductUpdateInput!) {
  productUpdate(product: $product) {
    product{
      id: legacyResourceId
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const productId = event.context.params?.id;
  if (!productId) throw new Error("Product id not provided.");
  const body = await readBody(event);

  await shopifyClient.request({
    query: partialUpdateProductMutation,
    variables: {
      product: {
        ...body,
        id: `gid://shopify/Product/${productId}`,
      },
    },
  });
  return {
    message: "Successfully updated the product.",
  };
});
