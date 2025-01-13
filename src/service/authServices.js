import { Client,Account } from 'appwrite';
const client = new Client();
client
.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
.setProject(import.meta.env.VITE_APPWRITE_TOKEN);

export const account = new Account(client);
export {ID} from 'appwrite';
export const authServices= {
    getCurrentUser: async()=> await account.get(),
    register:async(email,password,name)=> await account.create(ID.unique(),email,password,name),
    login:async(email, password)=> await account.createEmailPasswordSession(email,password),
    logout:async()=>await account.deleteSession("current")
}