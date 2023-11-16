import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import HomeView from "@/views/landingpage/HomeView.vue";
import ProfileView from "@/views/landingpage/ProfileView.vue";
import SignIn from "@/views/auth/sign-in.vue";
import NotFoundView from "@/views/utils/NotFoundView.vue";

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
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(
        /* webpackChunkName: "about" */ "../views/landingpage/AboutView.vue"
      );
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
