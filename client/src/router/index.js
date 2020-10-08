import Vue from "vue";
//import store from "@/store";
import VueRouter from "vue-router";
import Boards from "../views/Boards.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/boards",
    name: "boards",
    component: Boards
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
