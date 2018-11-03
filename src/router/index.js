import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user'
import Rights from '@/views/rights'
import Role from '@/views/role'


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
        },
        {
          path: '/role',
          component: Role
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
