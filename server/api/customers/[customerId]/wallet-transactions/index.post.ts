import { Query } from "node-appwrite";
import { database, users } from "~/server/appwrite/client";
import serverConfig from "~/server/helpers/server-config";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { users: customers } = await users.list([
    Query.equal("email", body.email),
  ]);

  if (customers.length === 0) {
    return createError({
      statusCode: 404,
      statusMessage: "Customer not found",
    });
  }
  const customer = customers[0];

  const { documents: transactions } = await database.listDocuments(
    serverConfig.appwrite.appwriteDatabaseId,
    serverConfig.appwrite.appwriteWalletTransactionsCollectionId,
    [Query.equal("userId", customer.$id), Query.orderDesc("$createdAt")],
  );

  return transactions;
});
