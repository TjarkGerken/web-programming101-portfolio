import "./assets/main.css";

import { createApp, h } from "vue";

import router from "./router";
import App from "@/App.vue";

const app = createApp({
  render: () => h(App),
}).use(router);
app.mount("#app");
