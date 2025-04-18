import shopifyClient from "~/server/helpers/shopify-graphql-client";

const afterQuery = `
query getArticlesQuery($query: String, $after: String) {
  articles(first: 20, query: $query, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
      handle
      title
      createdAt
      isPublished
    }
  }
}`;

const beforeQuery = `
query getArticlesQuery($query: String, $before: String) {
  articles(last: 20, query: $query, before: $before) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
      handle
      title
      createdAt
      isPublished
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const { data } = await shopifyClient.request({
      query: !!query.before ? beforeQuery : afterQuery,
      variables: {
        query: !!query.query ? `title:*${query.query}*` : null,
        after: query.after || null,
        before: query.before || null,
      },
    });
    const articles = data.data.articles;
    return {
      articles: articles.nodes,
      pageInfo: articles.pageInfo,
    };
  } catch (error: any) {
    console.log(error.response.data);
    return error;
  }
});
