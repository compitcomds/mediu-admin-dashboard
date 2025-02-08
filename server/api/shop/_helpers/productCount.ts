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
  const productCountPromise = shopifyClient.request({
    query: productCountQuery,
  });
  const collectionCountPromise = shopifyClient.request({
    query: collectionCountQuery,
  });
  const [{ data }, { data: collectionData }] = await Promise.all([
    productCountPromise,
    collectionCountPromise,
  ]);
  return {
    products: data.data.productsCount.count,
    collections: collectionData.data.collectionsCount.count,
  };
}
