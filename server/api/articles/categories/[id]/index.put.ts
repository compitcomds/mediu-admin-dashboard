import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
mutation blogUpdateMutation($blog: BlogUpdateInput!, $id: ID!) {
  blogUpdate(blog: $blog, id: $id) {
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

  const body = await readBody(event);
  if (!body.title || !body.handle)
    throw createError({
      status: 400,
      statusText: "Missing fields. Blog title and handle are necessary.",
    });

  const categoryId = `gid://shopify/Blog/${id}`;
  const { data } = await shopifyClient.request({
    query,
    variables: { id: categoryId, blog: body },
  });

  const userErrors = data.data?.blogUpdate?.userErrors;
  if (userErrors && userErrors.length > 0) {
    throw createError({
      status: 400,
      statusText: userErrors.map((err: any) => `${err.field}: ${err.message}`),
    });
  }
});
