import { database } from "~/server/appwrite/client";
import shopifyClient from "~/server/helpers/shopify-graphql-client";
import getUserAppwriteId from "../[customerId]/profile/get-user-appwrite-id";
import serverConfig from "~/server/helpers/server-config";
import attachUserAppwriteId from "../[customerId]/profile/attach-user-appwrite-id";

const exportCustomersQuery = `
query exportCustomersQuery($first: Int, $query: String, $after: String) {
  customers(first: $first, query: $query, after: $after){
    nodes{
      id: legacyResourceId
      firstName
      lastName
      email
      defaultAddress{
        address1
        address2
        city
        province
        country
        zip
        phone
      }
      numberOfOrders
      amountSpent{
        amount
      }
      createdAt
      appwriteUserId: metafield(key:"appwriteUserId", namespace:"custom"){
        value
      }
    }
    pageInfo{
      hasNextPage
      endCursor
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const reqQuery = getQuery(event);
  const query = reqQuery.query || null;
  const after = reqQuery.after || null;
  const first = 20;
  try {
    const { data } = await shopifyClient.request({
      query: exportCustomersQuery,
      variables: { query, after, first },
    });

    const customerData = data.data.customers;

    const customers: any[] = customerData?.nodes || [];

    return { items: customers, pageInfo: customerData?.pageInfo };
  } catch (error) {
    console.error("ERROR WHILE FETCHING ORDERS FOR EXPORT");
    console.error(error);
  }
  return [];
});
