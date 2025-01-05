import fetchOrderCount from "../../shop/_helpers/getOrdersCount";

export default defineEventHandler(async () => {
  return await fetchOrderCount();
});
