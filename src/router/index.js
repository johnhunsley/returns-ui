import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import Return from '@/components/Return'
import Callback from '@/components/Callback'

Vue.use(Router)

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
      props: true
    },
    {
      path: '/return',
      name: 'Return',
      component: Return,
      props: true
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

export default router
