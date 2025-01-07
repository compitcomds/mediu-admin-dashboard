import shopifyClient from "~/server/helpers/shopify-graphql-client";

const getOrderByIdQuery = `
query MyQuery($id: ID!) {
  order(id: $id) {
    lineItems(first: 100) {
      nodes {
        name
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
        sku
        image {
          url
          altText
        }
        product {
          gstApplied: metafield(key: "gst_applied", namespace: "custom") {
            value
          }
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
    }
    customer {
      displayName
      email
    }
    displayFulfillmentStatus
    appwriteOrderId: metafield(key: "appwriteOrderId", namespace: "custom"){
      value
    }
    prescriptionUrl: metafield(key: "prescriptionUrl", namespace: "custom"){
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
    gstApplied: parseFloat(node.product?.gstApplied?.value || "0"),
    originalTotal: convertShopifAmountToFloat(
      node.originalTotal.presentmentMoney,
    ),
    discountedTotal: convertShopifAmountToFloat(
      node.discountedTotal.presentmentMoney,
    ),
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
