import { Query } from "node-appwrite";
import { users } from "~/server/appwrite/client";

export default async function getUserAppwriteId(email: string) {
  const { users: customers } = await users.list([Query.equal("email", email)]);

  if (customers.length === 0) {
    return null;
  }

  const customer = customers[0];
  return customer.$id;
}
