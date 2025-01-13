import { defineStore } from "pinia";
import { authServices } from "@/service/authServices";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null,
  }),
  getters: {
    loggedInUser: (state)=> state.currentUser || null,
  },
  actions: {
    async getLoggedInUser() {
      try {
        console.log("running init")
        this.currentUser = await authServices.getCurrentUser();
        
      } catch (e) {
        this.currentUser = null;
      }
    },

    async register(email, password, name) {
      try {
        const account = await authServices.register(email, password, name);
        return account;
        // return the account currently. check the logic later since the flow after register is not completed.
      } catch (e) {
        return new Error("Account creation failed");
      }
    },
    async login(email, password) {
      try {
        const loggedInUser = await authServices.login(email, password);
        this.currentUser = loggedInUser;
        return loggedInUser;
      } catch (e) {
        return new Error("Login Error");
      }
    },

    async logout() {
      await authServices.logout();
      this.currentUser = null;
    },
  },
});
