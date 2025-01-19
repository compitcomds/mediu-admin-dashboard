import shopifyClient from "~/server/helpers/shopify-graphql-client";

const getProductByIdQuery = `
query getProductById($id: ID!) {
  product(id: $id) {
    title
    descriptionHtml
    tags
    status
    images(first: 100) {
      nodes {
        id
        url
        altText
      }
    }
    metafields(first: 100) {
      nodes {
        key
        value
      }
    }
    options {
      name
      id
      position
      optionValues {
        id
        name
      }
    }
    variants(first: 100) {
      nodes {
        id
        price
        compareAtPrice
        sku
        inventoryQuantity
        inventoryItem {
          id
          harmonizedSystemCode
        }
      }
    }
    collections(first: 100) {
      nodes {
        id
        title
      }
    }
  }
}
`;

export default async function getProductById(id: string) {
  const { data } = await shopifyClient.request({
    query: getProductByIdQuery,
    variables: {
      id: `gid://shopify/Product/${id}`,
    },
  });

  return data?.data.product;
}
