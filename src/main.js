import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// These can be imported from other files
const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

// 5. Create and mount the root instance.
const app = Vue.createApp({}).use(router);
// Make sure to _use_ the router instance to make the
// whole app router-aware.

app.mount("#app");

// Now the app has started!
