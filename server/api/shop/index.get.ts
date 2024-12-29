import fetchOrderCount from "./_helpers/getOrdersCount";

export default defineEventHandler(async (event) => {
  const orders = await fetchOrderCount();
  return { orders };
});
