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
import Home from '@/views/Home'
import PatchBoard from '@/components/PatchBoard'

import app from '@/feathers-client'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/loggedout'
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
    path: '/oauth',
    name: 'OAuth'
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot
  },
  {
    path: '/:userName',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/:userName',
        name: 'user_id',
        component: User
      },
      {
        name: 'boardId',
        path: '/:userName/:id',
        component: BoardView
      },
      {
        path: '/:userName/:id',
        name: 'PatchBoard',
        component: PatchBoard
      },
      {
        name: 'columnId',
        path: '/:userName/:id',
        component: ColumnView
      },
      {
        name: 'taskId',
        path: '/:userName/:id',
        component: TaskView
      }
    ]
  },
  {
    path: '*',
    redirect: '/loggedout'
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Ab router.beforeEach(async(to, from, next) => {
  /* try {
  const auth = await store.state.activeUser
  if (!auth) {
    console.log(this)
    next({ namerouter.beforeEach((to, from, next) => {out.vue") */
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {
  console.log(' beforeeach from ', from.path, 'to ', to.path)
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    try {
      // necessary: in case of reload, or to check if token is still valid
      await app.reAuthenticate()
      next()
    } catch (err) {
      next('/loggedout')
    }
  } else if (to.path === '/oauth') {
    // goes here after signin or signup with Google etc. (oAuth)
    // app.reAuthenticate() is MANDATORY - otherwise jwt is not in LocalStorage

    // ??? app.reAuthenticate() causes /oauth to be accessed a second time, with no access token
    if (to.hash !== '') {
      try {
        await app.logout()
        let { user } = await app.reAuthenticate()
        console.log('after oauth user', user)
        next({ name: 'user_id', params: { userName: user.nickname } })
      } catch {
        next('/loggedout')
      }
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
