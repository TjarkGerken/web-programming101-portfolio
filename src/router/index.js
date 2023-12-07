import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/landingpage/HomeView.vue";
import SignIn from "@/views/auth/SignInView.vue";
import NotFoundView from "@/views/utils/NotFoundView.vue";
import AboutView from "@/views/landingpage/AboutView.vue";
import store from "@/store";
import RegisterView from "@/views/auth/RegisterView.vue";

/**
 * The routes of the application
 * @type {[{path: string, component: {}, meta: {requiresAuth: boolean}, name: string},{path: string, component: {}, meta: {requiresAuth: boolean}, name: string},{path: string, component: (function(): Promise<{}>), meta: {requiresAuth: boolean}, name: string},{path: string, component: {}, meta: {requiresAuth: boolean, isAuth: boolean}, name: string},{path: string, component: {}, meta: {requiresAuth: boolean, isAuth: boolean}, name: string},null,null,null,null,null]}
 */
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
    meta: { requiresAuth: false, isAuth: true },
  },
  {
    path: "/auth/register",
    name: "Register",
    component: RegisterView,
    meta: { requiresAuth: false, isAuth: true },
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
    path: "/activity/:id",
    name: "Activity",
    component: () => import("@/views/app/ActivityView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: { requiresAuth: false },
  },
];
/**
 *  The Router with Create Web History
 * @type {Router}
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * The Router Guard that checks if the user is logged in or not. Additionally redirects a logged in user to the dashboard if they try to access an authentication page.
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.user.loggedIn) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.isAuth)) {
    if (store.state.user.loggedIn) {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
