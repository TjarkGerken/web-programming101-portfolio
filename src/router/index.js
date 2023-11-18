import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/landingpage/HomeView.vue";
import ProfileView from "@/views/app/ProfileView.vue";
import SignIn from "@/views/auth/sign-in.vue";
import NotFoundView from "@/views/utils/NotFoundView.vue";
import ActivatePolarView from "@/views/app/ActivatePolarView.vue";
import DashboardView from "@/views/app/DashboardView.vue";
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
    component: ProfileView,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: SignIn,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
  },
  {
    path: "/activate-polar",
    name: "PolarConnect",
    component: ActivatePolarView,
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
