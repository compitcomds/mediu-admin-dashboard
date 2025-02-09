import fetchOrderCount from "../../shop/_helpers/getOrdersCount";

export default defineEventHandler(async () => {
  const ordersCount = await fetchOrderCount();
  return {
    ...ordersCount,
    count: ordersCount.total,
  };
});
