import fetchCustomerCount from "./_helpers/getCustomerCount";
import fetchOrderCount from "./_helpers/getOrdersCount";
import fetchProductCount from "./_helpers/productCount";

export default defineEventHandler(async (event) => {
  const orders = await fetchOrderCount();
  const customers = await fetchCustomerCount();
  const prod = await fetchProductCount();
  return { orders, customers, prod };
});
