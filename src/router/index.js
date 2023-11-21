import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/landingpage/HomeView.vue";
import SignIn from "@/views/auth/sign-in.vue";
import NotFoundView from "@/views/utils/NotFoundView.vue";
import AboutView from "@/views/landingpage/AboutView.vue";
import store from "@/store";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
    meta: { requiresAuth: false },
  },

  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: false },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/app/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/auth/login",
    name: "Login",
    component: SignIn,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/app/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/activate-polar",
    name: "PolarConnect",
    component: () => import("@/views/app/ActivatePolarView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/activities",
    name: "Activities",
    component: () => import("@/views/app/ActivitiesView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.user.loggedIn) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
