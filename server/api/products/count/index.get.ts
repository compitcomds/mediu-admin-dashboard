import fetchProductCount from "../../shop/_helpers/productCount";

export default defineEventHandler(async () => {
  try {
    const { products } = await fetchProductCount();
    return { count: products };
  } catch (error: any) {
    console.log(error.response.data);
    return error;
  }
});
