import "./assets/main.css";

import { createApp, h } from "vue";
import ToastPlugin from "vue-toast-notification";

import router from "./router";
import App from "@/App.vue";
import store from "@/store";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import "vue-toast-notification/dist/theme-default.css";
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css";

const app = createApp({
  render: () => h(App),
}).use(router);
app.use(store);
app.use(VueTailwindDatepicker);
app.use(OpenLayersMap);

app.use(ToastPlugin);
app.mount("#app");
