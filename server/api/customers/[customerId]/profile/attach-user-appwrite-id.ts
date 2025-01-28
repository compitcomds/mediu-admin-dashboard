import shopifyClient from "~/server/helpers/shopify-graphql-client";

const attachUserAppwriteIdQuery = `
mutation attachUserAppwriteId($input: CustomerInput!) {
  customerUpdate(input: $input) {
    customer {
      id
    }
  }
}
`;

export default async function attachUserAppwriteId(
  customerId: string,
  appwriteUserId: string,
) {
  const input = {
    id: `gid://shopify/Customer/${customerId}`,
    metafields: [
      {
        namespace: "custom",
        key: "appwriteUserId",
        type: "single_text_field",
        value: appwriteUserId,
      },
    ],
  };
  const { data } = await shopifyClient.request({
    query: attachUserAppwriteIdQuery,
    variables: {
      input,
    },
  });

  if (data.data?.customerUpdate?.customer?.id) {
    return true;
  }

  return false;
}
