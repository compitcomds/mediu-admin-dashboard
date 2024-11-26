import config from "~/utils/config";
import { database } from "../config";

export async function getConsultancyServiceById(id: string) {
  return await database.getDocument(
    config.appwriteDatabaseId,
    config.appwriteConsultancyProductsCollectionId,
    id
  );
}

export async function updateConsultancyService(
  id: string,
  service: Partial<{
    title: string;
    descriptionHtml: string;
    image?: string;
    price: number;
    tags: string[];
  }>
) {
  return await database.updateDocument(
    config.appwriteDatabaseId,
    config.appwriteConsultancyProductsCollectionId,
    id,
    service
  );
}

export async function deleteConsultancyService(id: string) {
  await database.deleteDocument(
    config.appwriteDatabaseId,
    config.appwriteConsultancyProductsCollectionId,
    id
  );
}
