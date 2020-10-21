import Vue from 'vue'
import VueRouter from 'vue-router'
import LoggedOut from '@/views/LoggedOut'
import LogIn from '@/views/LogIn'
import SignUp from '@/views/SignUp'
import User from '@/views/User'
import Forgot from '@/views/ForgotPassWord'
import BoardView from '@/views/BoardView'
import ColumnView from '@/views/ColumnView'
import TaskView from '@/views/TaskView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'LoggedOut',
    component: LoggedOut
  },
  {
    path: '/loggedout',
    name: 'LoggedOut',
    component: LoggedOut
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/user',
    name: 'user_id',
    component: User,
    children: [
      {
        name: 'boardId',
        path: ':id',
        component: BoardView
      },
      {
        name: 'columnId',
        path: ':id',
        component: ColumnView
      },
      {
        name: 'taskId',
        path: ':id',
        component: TaskView
      }
    ]
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
