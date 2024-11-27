import { Query } from "appwrite";
import { database } from "../config";
import config from "~/utils/config";

export default async function getConsultancyCustomerBookings() {
  return await database.listDocuments(
    config.appwriteDatabaseId,
    config.appwriteConsultancyBookingCollectionId,
    [Query.limit(200), Query.orderDesc("$createdAt")]
  );
}
