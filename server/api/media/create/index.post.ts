import shopifyClient from "~/server/helpers/shopify-graphql-client";

const query = `
mutation uploadMutation($input: [StagedUploadInput!]!) {
  stagedUploadsCreate(input: $input) {
    stagedTargets {
      resourceUrl
      url
      parameters {
        name
        value
      }
    }
    userErrors {
      field
      message
    }
  }
}`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const input = body.input;
  const { data } = await shopifyClient.request({
    query,
    variables: {
      input: input.map((inp: any) => ({ ...inp, httpMethod: "POST" })),
    },
  });
  if (
    !data ||
    data.errors ||
    (data.data?.stagedUploadsCreate?.userErrors &&
      data.data.stagedUploadsCreate.userErrors.length > 0)
  ) {
    throw createError(
      data?.errors?.[0]?.message ||
        data?.data?.stagedUploadsCreate?.userErrors?.[0]?.message ||
        "Error creating staged upload",
    );
  }

  return data.data.stagedUploadsCreate.stagedTargets;
});
