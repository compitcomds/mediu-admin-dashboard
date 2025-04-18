import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
mutation deleteArticleQuery($id: ID!) {
  articleDelete(id: $id) {
    deletedArticleId
    userErrors {
      field
      message
    }
  }
}`;

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id)
    throw createError({ status: 400, statusMessage: "Blog Id not provided." });

  const blogId = `gid://shopify/Article/${id}`;
  const { data } = await shopifyClient.request({
    query,
    variables: { id: blogId },
  });
  const deletedArticle = data.data?.articleDelete;
  if (deletedArticle?.userErrors?.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: deletedArticle.userErrors
        .map((err: any) => `${err.field}: ${err.message}`)
        .join("\n"),
    });
  }
});
