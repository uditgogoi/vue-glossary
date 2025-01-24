
import {account,ID} from './db';
export const authServices= {
    getCurrentUser: async()=> await account.get(),
    register:async(email,password,name)=> await account.create(ID.unique(),email,password,name),
    login:async(email, password)=> await account.createEmailPasswordSession(email,password),
    logout:async()=>await account.deleteSession("current")
}