import axios from "axios";
import formatDateForShiprocket from "~/utils/formatDateForShiprocket";

const SHIPROCKET_API = process.env.VITE_SHIPROCKET_API_URL;
const SHIPROCKET_PICKUP_LOCATION = process.env.VITE_PICKUP_LOCATION;
const PRODUCTION_API = process.env.VITE_PRODUCTION_API;

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
    order_items: orderData.lineItems.map((item: any) => ({
      name: item.name,
      sku: item.sku,
      units: item.quantity,
      selling_price: item.discountedTotal.amount,
    })),
    payment_method: "Prepaid",
    sub_total: orderData.discountedTotalPriceSet.amount,
    length: dimensions.length,
    breadth: dimensions.breadth,
    height: dimensions.height,
    weight: dimensions.weight,
  };

  try {
    const createdOrder = await axios.post(url, shiprocketOrder, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(createdOrder);

    return { accessToken };
  } catch (error: any) {
    console.log(error.response.data.errors);
    if (error.status === 401 && retry < 3) {
      const newAccessToken = await getNewAcessToken();
      return await createShiprocketOrder(
        newAccessToken,
        orderData,
        dimensions,
        retry + 1,
      );
    }
    throw new Error(
      "Unable to pass the order for shipment right now. Please try again later.",
    );
  }
}

async function getNewAcessToken() {
  const { data } = await axios.get(
    `${PRODUCTION_API}/api/shiprocket/access-token`,
  );
  return data.token as string;
}
