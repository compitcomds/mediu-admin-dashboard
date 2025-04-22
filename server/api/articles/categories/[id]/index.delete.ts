import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
mutation blogDeleteMutation($id: ID!) {
  blogDelete(id: $id) {
    deletedBlogId
    userErrors {
      field
      message
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id)
    throw createError({ status: 400, statusMessage: "Blog Id not provided." });

  const categoryId = `gid://shopify/Blog/${id}`;
  const { data } = await shopifyClient.request({
    query,
    variables: { id: categoryId },
  });

  const userErrors = data.data?.blogDelete?.userErrors;
  if (userErrors && userErrors.length > 0) {
    throw createError({
      status: 400,
      statusText: userErrors.map((err: any) => `${err.field}: ${err.message}`),
    });
  }
});
