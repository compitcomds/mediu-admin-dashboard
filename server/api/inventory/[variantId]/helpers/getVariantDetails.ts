import shopifyClient from "~/server/helpers/shopify-graphql-client";
import getVariantInventoryDetails from "./getVariantInventoryDetails";

const inventoryProductVariantQuery = `
query inventoryProductVariantQuery($variantId: ID!) {
  productVariant(id: $variantId) {
    price
    sku
    product {
      title
      handle
      id: legacyResourceId
      featuredImage {
        url
        altText
      }
    }
    selectedOptions {
      name
      value
    }
  }
}
`;

export default async function getVariantDetails(variantId: string) {
  const { data } = await shopifyClient.request({
    query: inventoryProductVariantQuery,
    variables: { variantId: `gid://shopify/ProductVariant/${variantId}` },
  });
  if (!data.data.productVariant)
    throw new Error("Invalid variant id. Please provide a valid variant.");
  const inventory = await getVariantInventoryDetails(variantId);
  const variant = data.data.productVariant as {
    price: string;
    sku: string;
    product: {
      id: string;
      title: string;
      handle: string;
      featuredImage: null | { url: string; altText: string | null };
    };
    selectedOptions: Array<{ name: string; value: string }>;
  };
  return {
    title: variant.product.title,
    productId: variant.product.id,
    inventoryQuantity: inventory.inventoryQuantity,
    featuredImage: variant.product.featuredImage,
    price: variant.price,
    sku: variant.sku,
    productHandle: variant.product.handle,
    selectedOptions: variant.selectedOptions.filter(
      (opt) => !opt.name.toLowerCase().includes("title"),
    ),
  };
}
