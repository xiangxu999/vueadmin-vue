import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'

const Index = () => import('../views/Index')
const Menu = () => import('../views/sys/SysMenu')
const Role = () => import('../views/sys/SysRole')
const User = () => import('../views/sys/SysUser')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/system/menu',
        name: 'Menu',
        component: Menu
      },
      {
        path: '/system/Role',
        name: 'Role',
        component: Role
      },
      {
        path: '/system/User',
        name: 'User',
        component: User
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
