import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
import { useAuthStore } from "@/store/user";
import Login from "@/pages/auth/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Glossary from "@/pages/Glossary.vue";
import Document from "@/pages/NewDocument.vue";
import Home from "@/pages/Home.vue";
import { useGlossaryStore } from "@/store";

const routes = [
  {
    path: "/login",
    component: Login,
    name: "Login",
  },
  {
    path: "",
    component: Dashboard,
    name: "Dashboard",
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: Home,
        name: "Home",
      },
      {
        path: "glossary/:id",
        component: Glossary,
        name: "Glossary",
      },
      {
        path: "document/create",
        component: Document,
        name: "createDocument",
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  const store = useGlossaryStore();
  store.setCurrentPage(to.name || to.path);
});

router.beforeEach(async (to, from, next) => {
  const user = useAuthStore();
  if (user.currentUser === null) {
    await user.getLoggedInUser();
  }
  const loggedInUser = user.currentUser;
  if (to.name === "Login" && loggedInUser) {
    next({ name: "Dashboard" });
  }
  
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !loggedInUser) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
