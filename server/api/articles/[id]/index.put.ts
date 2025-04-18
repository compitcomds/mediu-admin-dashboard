import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
mutation updateArticleQuery($article: ArticleUpdateInput!, $id: ID!) {
  articleUpdate(article: $article, id: $id) {
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
  const body = await readBody(event);

  const article = body.article;

  if (article?.isPublished) article.publishDate = undefined;

  const { data } = await shopifyClient.request({
    query,
    variables: { id: blogId, article: article },
  });

  const updatedArticle = data.data?.articleUpdate;
  if (updatedArticle?.userErrors?.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: updatedArticle.userErrors
        .map((err: any) => `${err.field}: ${err.message}`)
        .join("\n"),
    });
  }
});
