import { createApp } from "vue";
import App from "./App.vue";
import "virtual:uno.css";
import {
  type RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/page1",
    name: "page1",
    component: () => import("@/pages/Page1.vue"),
  },
  {
    path: "/page2",
    name: "page2",
    component: () => import("@/pages/Page2.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const root = document.createElement("div");
root.id = "app";
document.body.appendChild(root);
const app = createApp(App);

app.use(router);
app.mount("#app");
