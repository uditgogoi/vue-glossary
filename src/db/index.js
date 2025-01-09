import { Client,Account } from 'appwrite';
const client = new Client();
client
.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
.setProject(import.meta.env.VITE_APPWRITE_TOKEN);

export const account = new Account(client);
export {ID} from 'appwrite';