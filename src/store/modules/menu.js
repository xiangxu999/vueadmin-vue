import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        menuList: [],
        permList: [],
        hasRoute: false,
        editableTabsValue: 'Index',
        editableTabs: [
            {
                title: '首页',
                name: 'Index',
                path: '/index'
            }
        ],
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
        },
        addTab(state, tab) {
            let index = state.editableTabs.findIndex(e => e.name === tab.name)

            if (index === -1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name
                })
            }
            state.editableTabsValue = tab.name
        }
    },
    actions: {},
    modules: {}
}
