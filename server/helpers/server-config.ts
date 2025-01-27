const serverConfig = {
  appwrite: {
    endpoint: process.env.VITE_APPWRITE_ENDPOINT as string,
    project: process.env.VITE_APPWRITE_PROJECT_ID as string,
    apiKey: process.env.APPWRITE_API_KEY as string,
    appwriteDatabaseId: process.env.VITE_APPWRITE_DATABASE_ID as string,
    appwriteWalletTransactionsCollectionId: process.env
      .VITE_APPWRITE_WALLET_TRANSACTIONS_COLLECTION_ID as string,
  },
};

export default serverConfig;
