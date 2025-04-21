import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
query getArticleQuery($id: ID!) {
  article(id: $id) {
    title
    summary
    handle
    body
    author{
      name
    }
    isPublished
    publishDate: publishedAt
    tags
    image {
      url
      altText
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id)
    throw createError({ status: 400, statusMessage: "Blog Id not provided." });

  const blogId = `gid://shopify/Article/${id}`;
  const { data } = await shopifyClient.request({
    query,
    variables: { id: blogId },
  });
  const article = data.data.article;
  return article;
});
