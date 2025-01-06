import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";

import Login from "@/pages/auth/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Glossary from "@/pages/Glossary.vue";
import Document from "@/pages/Document.vue";
import Home from "@/pages/Home.vue";
import {useGlossaryStore} from "@/store";
const routes = [
  {
    path: "/login",
    component: Login,
    name:'Login'
  },
  {
    path: "",
    component: Dashboard,
    name:'Dashboard',
    children: [
      {
        path:'',
        component: Home,
        name:'Home'
      },
      {
        path: "glossary/:id",
        component: Glossary,
        name:'Glossary'
      },
      {
        path: "document/create",
        component: Document,
        name:'createDocument'
      },
    ],
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

export default router;
