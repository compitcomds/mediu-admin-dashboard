import axios from "axios";
import config from "~/utils/config";

const SHOPIFY_GRAPHQL_API = `https://${config.shopifyDomain}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = config.shopifyAccessToken;

const getAllProductsAfterQuery = `
query getAllProductsQuery($query: String, $after: String) {
  products(first: 50, query: $query, after: $after) {
    nodes {
      id
      featuredImage {
        url
        altText
        height
        width
      }
      title
      status
      totalInventory
      productType
      vendor
      variants(first: 100) {
        nodes {
          legacyResourceId
          sku
          inventoryQuantity
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`;

const getAllProductsBeforeQuery = `
query getAllProductsQuery($query: String, $before: String) {
  products(last: 50, query: $query, before: $before) {
    nodes {
      id
      featuredImage {
        url
        altText
        height
        width
      }
      title
      status
      totalInventory
      productType
      vendor
      variants(first: 100) {
        nodes {
          legacyResourceId
          sku
          inventoryQuantity
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const { data } = await axios.post(
      SHOPIFY_GRAPHQL_API,
      {
        query: !!query.before
          ? getAllProductsBeforeQuery
          : getAllProductsAfterQuery,
        variables: {
          query: !!query.query ? `title:*${query.query}*` : null,
          after: query.after || null,
          before: query.before || null,
        },
      },
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    const products = data.data.products;
    return {
      products: products.nodes.map((prod: any) => ({
        ...prod,
        id: prod.id.replace("gid://shopify/Product/", ""),
        variants: prod.variants.nodes,
      })),
      pageInfo: products.pageInfo,
    };
  } catch (error: any) {
    console.log(error.response.data);
    return error;
  }
});
