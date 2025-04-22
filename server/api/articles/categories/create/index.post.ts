import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
mutation addBlogMutation($blog: BlogCreateInput!) {
  blogCreate(blog: $blog) {
    blog {
      id
    }
    userErrors {
      message
      field
    }
  }
}`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.title || !body.handle)
    throw createError({
      status: 400,
      statusText: "Missing fields. Blog title and handle are necessary.",
    });
  const { data } = await shopifyClient.request({
    query,
    variables: { blog: { title: body.title, handle: body.handle } },
  });

  const createdBlog = data.data?.blogCreate;
  const userErrors = createdBlog?.userErrors;
  if (userErrors && userErrors.length > 0) {
    throw createError({
      status: 400,
      statusText: userErrors.map((err: any) => `${err.field}: ${err.message}`),
    });
  }

  return createdBlog.blog?.id.replace("gid://shopify/Blog/", "") || "";
});
