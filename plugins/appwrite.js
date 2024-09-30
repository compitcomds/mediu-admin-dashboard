import { Client, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('66b484e30002414e1009'); // Your project ID

const databases = new Databases(client);

export { databases };

