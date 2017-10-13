import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import Callback from '@/components/Callback'
import AuthService from './../auth/AuthService'

Vue.use(Router)

const auth = new AuthService()

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
      props: true
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      props: true,
      beforeEnter: (to, from, next) => {
        if (!auth.isAuthenticated() || !auth.isAdmin()) {
          next(false)
        } else {
          next()
        }
      }
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

export default router
