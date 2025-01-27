import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
query getCustomerProfile($id: ID!) {
  customer(id: $id){
    firstName
    lastName
    email
    phone
    numberOfOrders
    amountSpent{
      amount
      currencyCode
    }
    defaultAddress{
      address1
      address2
      province
      zip
      country
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const customerId = event.context.params?.customerId;
  if (!customerId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Customer ID is required",
    });
  }

  const { data } = await shopifyClient.request({
    query,
    variables: { id: `gid://shopify/Customer/${customerId}` },
  });
  const customer = data.data?.customer;
  if (!customer) {
    throw createError({
      statusCode: 404,
      statusMessage: "Customer not found",
    });
  }

  return customer;
});
