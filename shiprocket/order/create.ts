import axios from "axios";
import { getAccessToken, setShiprocketAccessToken } from "../auth";

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
  const accessToken = getAccessToken();
  const { data } = await axios.post("/api/shiprocket/order/create", {
    accessToken,
    orderData,
    dimensions,
  });
  if (data?.accessToken && data.accessToken !== accessToken)
    setShiprocketAccessToken(data.accessToken);
}
