import "./assets/main.css";

import { createApp, h } from "vue";

import router from "./router";
import App from "@/App.vue";
import store from "@/store";

const app = createApp({
  render: () => h(App),
}).use(router);
app.use(store);
app.mount("#app");
