import {ID} from "appwrite";
import {account} from "@/db";
import { reactive } from "vue";

export const user= reactive({
    currentUser:null,
    async init() {
        try {
            this.currentUser= await account.get();
        } catch(e) {
            this.currentUser=null;
        } finally {
            return true
        }
    },

    async register(email,password,name) {
        try {
            const account= await account.create(ID.unique(),email,password,name);
            return account;
        } catch(e) {
            return new Error('Account creation failed')
        }  
    },

    async login(email,password) {
        try {
            const loggedInUser= await account.createEmailPasswordSession(email,password);
            this.currentUser=loggedInUser;
            return loggedInUser;
        } catch(e) {
            return new Error('Login Error')
        }
    },

    async logout() {
        await account.deleteSession("current");
        this.currentUser=null;
    }
 })