import Vue from "vue";
import VueRouter from "vue-router";
import LoggedOut from "@/views/LoggedOut";
import LogIn from "@/views/LogIn";
import SignUp from "@/views/SignUp";
Vue.use(VueRouter);

const routes = [
  // faire un redirect direct dans le router pour aller de / à /loggedout
  {
    path: "/loggedout",
    name: "LoggdOut",
    component: LoggedOut
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
