import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

const Home = () => import('../views/Home')
const Index = () => import('../views/Index')

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
