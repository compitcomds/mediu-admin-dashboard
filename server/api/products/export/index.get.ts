import shopifyClient from "~/server/helpers/shopify-graphql-client";

const exportProductsQuery = `
query exportProductsQuery($first: Int, $after: String, $query: String) {
  products(first: $first, after: $after, query: $query) {
    nodes {
      id: legacyResourceId
      handle
      title
      description_html: descriptionHtml
      tags
      status
      options(first: 5) {
        name
        values
      }
      variants(first: 100) {
        nodes {
          sku
          price
          compareAtPrice
          selectedOptions{
            name
            value
          }
        }
      }
      gst_applied: metafield(key: "gst_applied", namespace: "custom") {
        value
      }
      how_to_use: metafield(key: "how_to_use", namespace: "custom") {
        value
      }
      key_benefits: metafield(key: "key_benefits", namespace: "custom") {
        value
      }
      product_subtitle: metafield(key: "productSubtitle", namespace: "custom") {
        value
      }
      requires_prescription: metafield(
        key: "requiresPrescription"
        namespace: "custom"
      ) {
        value
      }
      safety_information_and_precaution: metafield(
        key: "safety_information_precaution"
        namespace: "custom"
      ) {
        value
      }
      collections(first: 100) {
        nodes{
          title
        }
      }
    }
	pageInfo{
      endCursor
      hasNextPage
    }  
  }
}
`;

export default defineEventHandler(async (event) => {
  const reqQuery = getQuery(event);
  const query = reqQuery.query || null;
  const after = reqQuery.after || null;
  const first = 20;
  try {
    const { data } = await shopifyClient.request({
      query: exportProductsQuery,
      variables: { query, after, first },
    });

    const products = data.data.products?.nodes || [];

    return { items: products, pageInfo: data.data.products?.pageInfo };
  } catch (error) {
    console.error("ERROR WHILE FETCHING ORDERS FOR EXPORT");
    console.error(error);
  }
  return [];
});
