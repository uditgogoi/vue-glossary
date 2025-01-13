<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="Name" class="block text-sm font-medium text-gray-700 mb-2"
            >Name</label
          >
          <InputText
            id="email"
            v-model="name"
            type="text"
            class="w-full p-inputtext p-component"
            placeholder="Enter your name"
          />
        </div>
        <div class="mb-4">
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Email</label
          >
          <InputText
            id="email"
            v-model="email"
            type="email"
            class="w-full p-inputtext p-component"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-4">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Password</label
          >
          <Password
            id="password"
            v-model="password"
            toggleMask
            feedback="false"
            class="w-full"
            placeholder="Enter your password"
            fluid
          />
        </div>
        <Button
          label="Login"
          @click="login(email, password)"
          icon="pi pi-sign-in"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white"
        />
        <Button
          label="Register"
          @click="register"
          variant="text"
          class="w-full text-white mt-5"
        />
        <!-- <Button
          label="Logout"
          @click="logout"
          variant="text"
          class="w-full text-white mt-5"
        /> -->
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
// import { account, ID } from "@/db";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/user";

const loggedInUser = ref(null);
const email = ref("");
const password = ref("");
const name = ref("");
const router= useRouter();
const user= useAuthStore();
const login = async (email, password) => {
  try {
    const loggedInUser= await user.login(email,password);
    if(loggedInUser) {
      router.push('/');
    }
  } catch(e) {
    console.log(e)
  }
};
// const logout=async()=> {
//   await user.logout()
// }
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>