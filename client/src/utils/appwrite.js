import { Client,ID,Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite endpoint
  .setProject("67b75725001e624bd1d0"); // Your Appwrite project ID

const storage = new Storage(client);

export { storage, ID };
