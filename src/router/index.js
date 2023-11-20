import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/landingpage/HomeView.vue";
import SignIn from "@/views/auth/sign-in.vue";
import NotFoundView from "@/views/utils/NotFoundView.vue";
import AboutView from "@/views/landingpage/AboutView.vue";

const routes = [
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },

  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/app/ProfileView.vue"),
  },
  {
    path: "/auth/login",
    name: "Login",
    component: SignIn,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/app/DashboardView.vue"),
  },
  {
    path: "/activate-polar",
    name: "PolarConnect",
    component: () => import("@/views/app/ActivatePolarView.vue"),
  },
  {
    path: "/activities",
    name: "Activities",
    component: () => import("@/views/app/ActivitiesView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
