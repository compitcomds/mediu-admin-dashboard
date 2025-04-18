import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
mutation articleCreateMutation($article: ArticleCreateInput!}) {
  articleCreate(article: $article) {
    article {
      handle
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const article = body.article;
  await shopifyClient.request({
    query,
    variables: {
      ...article,
    },
  });
});
