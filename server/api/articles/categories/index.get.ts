import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
query getAllBlogsQUery {
  blogs(first: 200) {
    nodes{
      title
      handle
      id
    }
  }
}
`;

export default defineEventHandler(async (event) => {
  const { data } = await shopifyClient.request({ query });
  const blogs = data.data.blogs.nodes as {
    title: string;
    handle: string;
    id: string;
  }[];
  return blogs.map((blog) => ({
    ...blog,
    id: blog.id.replace("gid://shopify/Blog/", ""),
  }));
});
