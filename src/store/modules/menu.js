import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        menuList: [],
        permList: [],
        hasRoute: false
    },
    mutations: {
        setMenu(state, menu) {
            state.menuList = menu
        },
        setAuth(state, auth) {
            state.permList = auth
        },
        changeRouteStatus(state, hasRoute) {
            state.hasRoute = hasRoute

            sessionStorage.setItem("hasRoute", hasRoute)
        }
    },
    actions: {},
    modules: {}
}
