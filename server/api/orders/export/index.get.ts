import shopifyClient from "~/server/helpers/shopify-graphql-client";
import { calculateGSTApplied } from "~/utils/calculateGSTApplied";

const exportOrdersQuery = `
query exportOrdersQuery($first: Int!, $query: String, $after: String) {
  orders(first: $first, query: $query, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    nodes{
      id: legacyResourceId
      email
      createdAt
      processedAt
      cancelledAt
      displayFulfillmentStatus
      displayFinancialStatus
      discountCodes
      customer{
        firstName
        lastName
        phone
      }
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
          title: name
          quantity
          sku
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
          product {
            id: legacyResourceId
            gstApplied: metafield(key: "gst_applied", namespace: "custom") {
              value
            }
          }
        }
      }
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
      cartDiscountAmountSet {
        presentmentMoney {
          amount
          currencyCode
        }
      }
      prescriptionUrl: metafield(key: "prescriptionUrl", namespace: "custom") {
        value
      }
      walletAmountUsed: metafield(key: "walletAmountUsed", namespace: "custom") {
        value
      }
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
      query: exportOrdersQuery,
      variables: { query, after, first },
    });
    const orderData = data.data.orders;

    const orders: any[] = orderData.nodes.map((node: any) => ({
      ...node,
      lineItems: parseLineItems(node.lineItems.nodes),
      originalTotalAmount: convertShopifAmountToFloat(
        node.originalTotalPriceSet.presentmentMoney,
      ),
      discountedAmount: convertShopifAmountToFloat(
        node.discountedTotalPriceSet.presentmentMoney,
      ),
      cartDiscountAmount: !!node.cartDiscountAmountSet?.presentmentMoney
        ? convertShopifAmountToFloat(
            node.cartDiscountAmountSet.presentmentMoney,
          )
        : { amount: 0 },
    }));

    return { items: orders, pageInfo: orderData?.pageInfo };
  } catch (error) {
    console.error("ERROR WHILE FETCHING ORDERS FOR EXPORT");
    console.error(error);
  }
  return [];
});

function parseLineItems(lineItems: any[]) {
  return lineItems.map((node) => ({
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
}

function convertShopifAmountToFloat(obj: any) {
  return {
    ...obj,
    amount: parseFloat(obj.amount),
  };
}
