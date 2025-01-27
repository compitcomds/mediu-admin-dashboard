import { Client, Account, Databases, Users } from "node-appwrite";
import serverConfig from "../helpers/server-config";

export const client = new Client();
client.setEndpoint(serverConfig.appwrite.endpoint);
client.setProject(serverConfig.appwrite.project);
client.setKey(serverConfig.appwrite.apiKey);

export const account = new Account(client);

export const users = new Users(client);

export const database = new Databases(client);
