<<<<<<< HEAD
import Vue from "vue";
//import store from "@/store";
import VueRouter from "vue-router";
import Boards from "../views/Boards.vue";
import LogIn from "../views/LogIn"
Vue.use(VueRouter);

const routes = [
  {
    path: "/boards",
    name: "boards",
    component: Boards
=======
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Board from '@/views/Board'
import BoardList from '@/views/BoardList'
import CreateBoard from '@/components/CreateBoard'
import SignIn from '@/views/SignIn'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
>>>>>>> b34a64c0602d118843a391333bf55112e6fb928d
  },
  {
    path: '/board',
    name: 'board',
    component: Board
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn
  },
  {
    path: '/boardNew',
    name: 'boardNew',
    component: CreateBoard
  },
  {
    path: '/boardlist',
    name: 'boardList',
    component: BoardList
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
<<<<<<< HEAD
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Log In",
    component: LogIn
  },
];
=======
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
>>>>>>> b34a64c0602d118843a391333bf55112e6fb928d

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
