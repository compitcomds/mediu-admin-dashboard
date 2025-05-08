import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
query getArticleQuery($id: ID!) {
  article(id: $id) {
    title
    summary
    handle
    body
    isPublished
    publishDate: publishedAt
    tags
    author{
      name
    }
    blog{
      id
    }
    image {
      url
      altText
    }
    metafields(first: 3) {
      nodes {
        key
        namespace
        value
      }
    }  
  }
}
`;

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id)
    throw createError({ status: 400, statusMessage: "Blog Id not provided." });

  const articleId = `gid://shopify/Article/${id}`;
  const { data } = await shopifyClient.request({
    query,
    variables: { id: articleId },
  });

  if (!data.data?.article) return null;

  const { blog, ...article } = data.data.article as {
    title: string;
    summary: string;
    handle: string;
    body: string;
    blog: { id: string };
    isPublished: boolean;
    publishedAt: string;
    tags: string[];
    author: { name: string };
    image: { url: string; altText: string };
    metafields: {
      nodes: Array<{ key: string; namespace: string; value: string }>;
    };
  };

  const blogId = blog.id.replace("gid://shopify/Blog/", "");
  const parsedMetafields = parseMetafields(article.metafields.nodes);

  return {
    ...article,
    blogId,
    metafields: parsedMetafields,
  };
});

function parseMetafields(
  metafields?: null | Array<{ key: string; namespace: string; value: string }>,
) {
  const parsedMetafields: Record<string, string> = {
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  };
  if (!metafields) return parsedMetafields;
  for (const m of metafields) {
    parsedMetafields[m.key] = m.value;
  }
  return parsedMetafields;
}
