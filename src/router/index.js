import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),

      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),

      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/UserView.vue"),

      meta: {
        requiresAuth: true,
      },
    },

  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn || loggedIn === "null")
      next({ path: "/login", params: { nextUrl: to.fullPath } });
    else next();
  } else {
    next();
  }
});

export default router;
