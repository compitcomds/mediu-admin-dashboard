import config from "~/utils/config";
import { storage } from "./config";
import { ID } from "appwrite";

const buckets = {
  "help-and-support": config.appwriteHelpAndSupportBucketId,
};

export default async function uploadImageInAppwrite(
  file: File,
  bucket: keyof typeof buckets = "help-and-support"
) {
  const createdFile = await storage.createFile(
    buckets[bucket],
    ID.unique(),
    file
  );
  return storage.getFileView(buckets[bucket], createdFile.$id);
}
