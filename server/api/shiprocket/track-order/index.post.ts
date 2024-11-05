import axios from "axios";

const SHIPROCKET_API_URL = process.env.VITE_SHIPROCKET_API_URL;
const PRODUCTION_API = process.env.VITE_PRODUCTION_API;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.orderId) throw new Error("Order id not provided.");

  const { data: accessToken } = await axios.get(
    `${PRODUCTION_API}/api/shiprocket/access-token`
  );

  const { data } = await axios.get(
    `${SHIPROCKET_API_URL}/courier/track?order_id=${body.orderId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.token}`,
      },
    }
  );

  if (data.length > 0 && data[0].tracking_data) {
    const trackingData = data[0].tracking_data;
    return trackingData;
  }

  throw new Error(
    "Unable to fetch the order status at the time. Please try again later."
  );
});
