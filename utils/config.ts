const config = {
  shopifyDomain: "dev-mediu.myshopify.com",
  shopifyAccessToken: "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",

  SHOPIFY_PUBLIC_ACCESS_TOKEN: "4613954f879d5c1c13daafc9b902387b",

  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteAlertCollectionId: import.meta.env.VITE_APPWRITE_ALERT_COLLECTION_ID,
  appwriteConsultancyProductsCollectionId: import.meta.env
    .VITE_APPWRITE_CONSULTANCY_PRODUCTS_COLLECTION_ID,
  appwriteConsultancyBookingCollectionId: import.meta.env
    .VITE_APPWRITE_CONSULTANCY_COLLECTION_ID,
  appwriteInventoryCollectionId: import.meta.env
    .VITE_APPWRITE_INVENTORY_COLLECTION_ID,
  appwriteHelpAndSupportCollectionId: import.meta.env
    .VITE_APPWRITE_HELP_AND_SUPPORT_COLLECTION_ID,
  appwriteHelpAndSupportBucketId: import.meta.env
    .VITE_APPWRITE_HELP_AND_SUPPORT_BUCKET_ID,
};

export default config;
