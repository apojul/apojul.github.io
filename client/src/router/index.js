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
    //meta: { requiresAuth: false }
  },
  {
    path: '/loggedout',
    name: 'LoggedOut',
    component: LoggedOut
    //meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
    //meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
    // meta: { requiresAuth: false }
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
    path: '/forgot',
    name: 'Forgot',
    component: Forgot
    //meta: { requiresAuth: false }
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
  } else {
    next() // make sure to always call next()!
  }
})
// })

/* 
router.beforeEach((to, from, next) => {
  const publicPages = ['/loggedout', '/login', '/signup']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('feathers-jwt')

  if (authRequired && !loggedIn) {
    next('/loggedout')
  }
  next()
})
try {
        if (!paylorouter.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.activeUser) {
      next({
        path: '/loggeout',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})F
          return await app.authenticate({
            strategy: 'local',
            ...payload
          })
        }
      } catch (error) {
        router.push('LoggedOut')
      }
       */
// router.beforeE next()p
//     .reAuthenticate()
//     .then(() => {
//       next()
//     })
//     .catch(() => loggedout?redirect=%2Fuser{
//       next('/loggedout')
//     })
// })
/* router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.activeUser) {
      next({
        path: '/loggeout',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
}) */

export default router
