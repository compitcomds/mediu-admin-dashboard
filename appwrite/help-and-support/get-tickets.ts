import { Query } from "appwrite";
import { database } from "../config";
import config from "~/utils/config";

export default async function getTicketsRaisedFromAppwrite() {
  return await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteHelpAndSupportCollectionId,
    [Query.orderDesc("$createdAt")]
  );
}
