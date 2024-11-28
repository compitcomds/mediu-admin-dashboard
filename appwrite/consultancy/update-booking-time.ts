import { database } from "../config";
import config from "~/utils/config";

export default async function updateConsultancyBooking(
  id: string,
  bookingTime: Date
) {
  return await database.updateDocument(
    config.appwriteDatabaseId,
    config.appwriteConsultancyBookingCollectionId,
    id,
    {
      bookingTime,
    }
  );
}
