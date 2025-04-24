import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
mutation articleCreateMutation($article: ArticleCreateInput!) {
  articleCreate(article: $article) {
    article {
      handle
      id
    }
    userErrors {
      field
      message
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const article = body.article;
  if (article?.isPublished) article.publishDate = undefined;

  const { data } = await shopifyClient.request({
    query,
    variables: {
      article: { ...article, blogId: `gid://shopify/Blog/${article.blogId}` },
    },
  });

  const createdArticle = data.data?.articleCreate;
  if (createdArticle?.userErrors?.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: createdArticle.userErrors
        .map((err: any) => `${err.field}: ${err.message}`)
        .join("\n"),
    });
  }

  return {
    id: createdArticle.article.id.replace("gid://shopify/Article/", ""),
  };
});
