import config from "~/utils/config";
import { database } from "../config";
import { ID } from "appwrite";

export default async function createConsultancyService(service: {
  title: string;
  descriptionHtml: string;
  image?: string;
  price: number;
  tags: string[];
}) {
  return await database.createDocument(
    config.appwriteDatabaseId,
    config.appwriteConsultancyProductsCollectionId,
    ID.unique(),
    service
  );
}
