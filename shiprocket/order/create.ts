import axios from "axios";
import formatDateForShiprocket from "~/utils/formatDateForShiprocket";
import { getAccessToken, getNewAcessToken } from "../auth";

const SHIPROCKET_API = import.meta.env.VITE_SHIPROCKET_API_URL;
const SHIPROCKET_PICKUP_LOCATION = import.meta.env.VITE_PICKUP_LOCATION;

export default async function createShiprocketOrder(
  orderData: any,
  dimensions: {
    length: number;
    breadth: number;
    height: number;
    weight: number;
  }
) {
  const url = `${SHIPROCKET_API}/orders/create/adhoc`;
  const accessToken = getAccessToken();

  try {
    const { data } = await axios.post(
      url,
      {
        order_id: orderData.id,
        order_date: formatDateForShiprocket(orderData.created_at),
        pickup_location: SHIPROCKET_PICKUP_LOCATION,
        billing_customer_name: orderData.billing_address.first_name,
        billing_last_name: orderData.billing_address.last_name,
        billing_address: orderData.billing_address.address1,
        billing_address_2: orderData.billing_address.address2 || "",
        billing_city: orderData.billing_address.city,
        billing_pincode: orderData.billing_address.zip,
        billing_state: orderData.billing_address.province,
        billing_country: orderData.billing_address.country,
        billing_phone: orderData.billing_address.phone,
        billing_email: orderData.customer.email,
        shipping_is_billing: true,
        order_items: orderData.line_items.map((item: any) => ({
          name: item.name,
          sku: item.sku,
          units: item.fulfillable_quantity,
          selling_price: item.price,
        })),
        payment_method: "Prepaid",
        sub_total: orderData.current_subtotal_price,
        length: dimensions.length,
        breadth: dimensions.breadth,
        height: dimensions.height,
        weight: dimensions.weight,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error: any) {
    if (error.status === 401) {
      await getNewAcessToken();
      return await createShiprocketOrder(orderData, dimensions);
    }
    throw new Error(
      "Unable to pass the order for shipment right now. Please try again later."
    );
  }
}
