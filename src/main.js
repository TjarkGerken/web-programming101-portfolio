import "./assets/main.css";

import { createApp, h } from "vue";
import ToastPlugin from "vue-toast-notification";

import router from "./router";
import App from "@/App.vue";
import store from "@/store";
import "vue-toast-notification/dist/theme-default.css";
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css"; // vue3-openlayers version < 1.0.0-*

const app = createApp({
  render: () => h(App),
}).use(router);
app.use(store);
app.use(OpenLayersMap /* options */);

app.use(ToastPlugin);
app.mount("#app");
