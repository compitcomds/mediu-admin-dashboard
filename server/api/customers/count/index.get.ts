import fetchCustomerCount from "../../shop/_helpers/getCustomerCount";

export default defineEventHandler(async (event) => {
  const customers = await fetchCustomerCount();
  return { customers };
});
