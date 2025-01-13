import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import router from "./router";
import { createPinia } from "pinia";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
// import { user } from "@/store/user";

import "./style.css";
import { definePreset } from "@primevue/themes";
import "primeicons/primeicons.css";
// import ConfirmationService from 'primevue/confirmationservice';

const customPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{violet.50}",
      100: "{violet.100}",
      200: "{violet.200}",
      300: "{violet.300}",
      400: "{violet.400}",
      500: "{violet.500}",
      600: "{violet.600}",
      700: "{violet.700}",
      800: "{violet.800}",
      900: "{violet.900}",
      950: "{violet.950}",
    },
  },
});

async function initialiseApp() {
  // await user.init();
  const pinia = createPinia();
  createApp(App)
    .use(PrimeVue, {
      theme: {
        preset: customPreset,
        options: {
          prefix: "p",
          darkModeSelector: "system",
          cssLayer: false,
        },
      },
    })
    .use(pinia)
    .use(router)
    .use(ConfirmationService)
    .use(ToastService)
    .directive("tooltip", Tooltip)
    .mount("#app");
}

initialiseApp();
