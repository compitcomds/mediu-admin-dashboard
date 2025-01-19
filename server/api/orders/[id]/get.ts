import shopifyClient from "~/server/helpers/shopify-graphql-client";

const getOrderByIdQuery = `
query getOrderByIdQuery($id: ID!) {
  order(id: $id) {
    id: legacyResourceId
    createdAt
    processedAt
    billingAddress {
      firstName
      lastName
      address1
      address2
      city
      zip
      province
      country
      phone
    }
    lineItems(first: 100) {
      nodes {
        name
        title
        quantity
        discountedTotal: discountedTotalSet(withCodeDiscounts: true) {
          presentmentMoney {
            amount
            currencyCode
          }
        }
        originalTotal: originalTotalSet {
          presentmentMoney {
            amount
            currencyCode
          }
        }
        unitPrice: originalUnitPriceSet {
          presentmentMoney {
            amount
            currencyCode
          }
        }
        sku
        image {
          url
          altText
        }
        product {
          id: legacyResourceId
          gstApplied: metafield(key: "gst_applied", namespace: "custom") {
            value
          }
        }
        variant {
          id: legacyResourceId
        }
      }
    }
    createdAt
    discountCodes
    originalTotalPriceSet {
      presentmentMoney {
        amount
        currencyCode
      }
    }
    discountedTotalPriceSet: currentTotalPriceSet {
      presentmentMoney {
        amount
        currencyCode
      }
    }
    shippingAddress {
      name
      address1
      address2
      city
      province
      country
      zip
      phone
      firstName
      lastName
    }
    customer {
      displayName
      email
      phone
      firstName
      lastName
    }
    displayFulfillmentStatus
    appwriteOrderId: metafield(key: "appwriteOrderId", namespace: "custom") {
      value
    }
    prescriptionUrl: metafield(key: "prescriptionUrl", namespace: "custom") {
      value
    }
  }
}
`;

export default async function getOrderById(id: string) {
  const { data } = await shopifyClient.request({
    query: getOrderByIdQuery,
    variables: { id: `gid://shopify/Order/${id}` },
  });
  const order = data.data?.order;
  if (!order) return null;

  const lineItems = order.lineItems.nodes.map((node: any) => ({
    ...node,
    id: node.product?.id,
    variantId: node.variant?.id,
    gstApplied: parseFloat(node.product?.gstApplied?.value || "0"),
    originalTotal: convertShopifAmountToFloat(
      node.originalTotal.presentmentMoney,
    ),
    discountedTotal: convertShopifAmountToFloat(
      node.discountedTotal.presentmentMoney,
    ),
    unitPrice: convertShopifAmountToFloat(node.unitPrice.presentmentMoney),
  }));
  return {
    ...order,
    lineItems,
    originalTotalPriceSet: convertShopifAmountToFloat(
      order.originalTotalPriceSet.presentmentMoney,
    ),
    discountedTotalPriceSet: convertShopifAmountToFloat(
      order.discountedTotalPriceSet.presentmentMoney,
    ),
  };
}

function convertShopifAmountToFloat(obj: any) {
  return {
    ...obj,
    amount: parseFloat(obj.amount),
  };
}
