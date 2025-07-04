import axios from "axios";
import formatDateForShiprocket from "~/utils/formatDateForShiprocket";
import getAccessTokenFromShiprocket from "../_helpers/access-token";

const SHIPROCKET_API = process.env.VITE_SHIPROCKET_API_URL;
const SHIPROCKET_PICKUP_LOCATION = process.env.VITE_PICKUP_LOCATION;

export default defineEventHandler(async (event) => {
  const { accessToken, orderData, dimensions } = await readBody(event);
  return await createShiprocketOrder(accessToken, orderData, dimensions, 0);
});

async function createShiprocketOrder(
  accessToken: string,
  orderData: any,
  dimensions: {
    length: number;
    breadth: number;
    height: number;
    weight: number;
  },
  retry: number = 0,
) {
  const paymentMethod =
    orderData.displayFinancialStatus.toLowerCase() === "paid"
      ? "Prepaid"
      : "COD";
  const walletAmountUsed = parseFloat(orderData.walletAmountUsed || "0");

  const url = `${SHIPROCKET_API}/orders/create/adhoc`;
  const shiprocketOrder = {
    order_id: orderData.id,
    order_date: formatDateForShiprocket(orderData.createdAt),
    pickup_location: SHIPROCKET_PICKUP_LOCATION,
    shippingAddress: orderData.shippingAddress.address1,
    billing_customer_name:
      orderData.billingAddress?.firstName ||
      orderData.shippingAddress?.firstName ||
      orderData.customer.firstName,
    billing_last_name:
      orderData.billingAddress?.lastName ||
      orderData.shippingAddress?.lastName ||
      orderData.customer.lastName,
    billing_address:
      orderData.billingAddress.address1 ||
      orderData.shippingAddress?.address1 ||
      "",
    billing_address_2:
      orderData.billingAddress.address2 ||
      orderData.shippingAddress?.address2 ||
      "",
    billing_city:
      orderData.billingAddress.city || orderData.shippingAddress?.city || "",
    billing_pincode:
      orderData.billingAddress.zip || orderData.shippingAddress?.zip || "",
    billing_state:
      orderData.billingAddress.province ||
      orderData.shippingAddress?.province ||
      "",
    billing_country:
      orderData.billingAddress.country ||
      orderData.shippingAddress?.country ||
      "India",
    billing_phone:
      orderData.billingAddress.phone || orderData.shippingAddress?.phone || "",
    billing_email: orderData.customer.email,
    shipping_is_billing: true,
    order_items: formatLineItems(orderData.lineItems),
    payment_method: paymentMethod,
    sub_total: orderData.discountedTotalPriceSet.amount - walletAmountUsed,
    length: dimensions.length,
    breadth: dimensions.breadth,
    height: dimensions.height,
    weight: dimensions.weight,
  };

  try {
    await axios.post(url, shiprocketOrder, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { accessToken };
  } catch (error: any) {
    if (error.status === 422 && error.response?.data?.errors) {
      let errMsg = "";
      const contentErrors = error.response.data.errors;
      for (const key of Object.keys(contentErrors)) {
        errMsg = key + ": " + contentErrors[key].join(", ");
      }
      throw createError({ statusCode: 422, message: errMsg });
    }

    console.error("ERROR OCCURED WHILE CREATING ORDER");
    console.log(error.response.data);
    console.error(`Status Code: ${error.status}, Retry: ${retry}`);
    if ((error.status === 401 || error.status === 403) && retry < 3) {
      const newAccessToken = await getNewAcessToken();
      if (newAccessToken) {
        console.log(`New Access Token: ${newAccessToken}`);
        return await createShiprocketOrder(
          newAccessToken,
          orderData,
          dimensions,
          retry + 1,
        );
      }
    }
    throw new Error(
      "Unable to pass the order for shipment right now. Please try again later.",
    );
  }
}

function formatLineItems(items: any[]) {
  const lineItems = [];
  for (const item of items) {
    let i: Record<string, any> = {
      name: item.name,
      sku: item.sku,
      units: item.quantity,
      selling_price: item.unitPrice.amount,
    };
    if (item.hsnCode) i["hsn"] = item.hsnCode;
    lineItems.push(i);
  }
  return lineItems;
}

async function getNewAcessToken() {
  try {
    const { token } = await getAccessTokenFromShiprocket();
    return token;
  } catch (error) {
    console.error("ERROR OCCURRED WHILE FETCHING ACCESS TOKEN.");
    console.error(error);
    return null;
  }
}
