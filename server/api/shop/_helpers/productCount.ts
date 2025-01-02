import shopifyClient from "~/server/helpers/shopify-graphql-client";

const collectionCountQuery = `
query collectionCount {
  collectionsCount {
    count
  }
}`;

const productCountQuery = `
query productCountQuery {
  productsCount {
    count
  }
}`;

export default async function fetchProductCount() {
  const { data } = await shopifyClient.request({ query: productCountQuery });
  const { data: collectionData } = await shopifyClient.request({
    query: collectionCountQuery,
  });
  return {
    products: data.data.productsCount.count,
    collections: collectionData.data.collectionsCount.count,
  };
}
