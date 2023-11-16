import "./assets/main.css";

import { createApp, h } from "vue";
import ToastPlugin from "vue-toast-notification";

import router from "./router";
import App from "@/App.vue";
import store from "@/store";
import "vue-toast-notification/dist/theme-default.css";

const app = createApp({
  render: () => h(App),
}).use(router);
app.use(store);
app.use(ToastPlugin);
app.mount("#app");
