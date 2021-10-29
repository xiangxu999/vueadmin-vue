import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'
import axios from "axios";
import store from '../store'

const Index = () => import('../views/Index')
const UserCenter = () => import('../views/UserCenter')

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
                path: '/user/center',
                name: 'UserCenter',
                component: UserCenter
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

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {

    if (!store.state.menu.hasRoute) {
        axios.get('/system/menu/nav', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(res => {
            // 菜单
            store.commit('setMenu', res.data.data.nav)
            // 权限
            // store.commit('setAuth', res.data.data.authorities)


            // 动态绑定路由
            let newRoutes = router.options.routes

            res.data.data.nav.forEach(menu => {
                if (menu.children) {
                    menu.children.forEach(item => {
                        // 转换为路由
                        let route = menuToRoute(item)
                        // 把路由添加到路由管理中
                        if (route) {
                            newRoutes[0].children.push(route)
                        }
                    })
                }
            })
            router.addRoutes(newRoutes)
            store.commit("changeRouteStatus", true)
        })
    }
    next()
})

/**
 * 导航转为路由
 * @param menu
 * @returns {null}
 */
const menuToRoute = (menu) => {
    if (!menu.component) {
        return null
    }

    return {
        name: menu.name,
        path: menu.path,
        component: () => import('@/' + menu.component + '.vue'),
        meta: {
            icon: menu.icon,
            title: menu.title
        }
    }

}

export default router
