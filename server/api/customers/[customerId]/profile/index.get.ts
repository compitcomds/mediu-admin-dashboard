import shopifyClient from "~/server/helpers/shopify-graphql-client";
import getUserAppwriteId from "./get-user-appwrite-id";
import attachUserAppwriteId from "./attach-user-appwrite-id";

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
    appwriteUserId: metafield(key:"appwriteUserId", namespace:"custom"){
      value
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

  if (customer.appwriteUserId?.value) {
    return {
      ...customer,
      appwriteUserId: customer.appwriteUserId.value,
    };
  }

  const appwriteUserId = await getUserAppwriteId(customer.email);

  if (!appwriteUserId) {
    console.error("Customer not found in Appwrite but present in Shopify");
  } else {
    const successfullyAttached = await attachUserAppwriteId(
      customerId,
      appwriteUserId,
    );
    if (!successfullyAttached) {
      console.error(
        `Error: Attaching appwrite<${appwriteUserId}> to shopfiy<${customerId}>`,
      );
    }
  }

  return {
    ...customer,
    appwriteUserId,
  };
});
