import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user'
import Rights from '@/views/rights'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/user',
          component: User
        },
        {
          path: '/right',
          component: Rights
        }
      ]
    },
    {
      name: 'login',
     path: '/login',
     component: Login
    }
  ]
})
