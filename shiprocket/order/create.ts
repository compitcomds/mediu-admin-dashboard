import axios from "axios";
import {
  getAccessToken,
  setShiprocketAccessToken,
  getNewAcessToken,
} from "../auth";

export default async function createShiprocketOrder(
  orderData: any,
  dimensions: {
    length: number;
    breadth: number;
    height: number;
    weight: number;
  }
) {
  console.log("Access token: ", await getNewAcessToken());
  throw new Error("Access token obtained from shiprockeet.");
  const accessToken = getAccessToken();
  const { data } = await axios.post("/api/shiprocket/create-order", {
    accessToken,
    orderData,
    dimensions,
  });
  if (data?.accessToken && data.accessToken !== accessToken)
    setShiprocketAccessToken(data.accessToken);
}
