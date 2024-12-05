import { defineEventHandler } from "h3";
import config from "~/utils/config";
import axios from "axios";

export default defineEventHandler(async () => {
  const apiUrl = `https://${config.shopifyDomain}/admin/api/2024-07/orders.json?status=any`;
  const { data } = await axios.get(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": config.shopifyAccessToken,
    },
  });
  return { orders: data.orders };
});
