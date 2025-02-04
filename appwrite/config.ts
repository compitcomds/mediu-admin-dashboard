import { Account, Client, Databases, Storage, Teams, Avatars } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);
export const avatars = new Avatars(client);
