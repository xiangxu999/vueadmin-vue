import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        menuList: [],
        permList: [],
        hasRoute: false,
        isCollapse: false,
        iconMenu: 'el-icon-s-fold',
        menuWidth: '200px',
        editableTabsValue: 'Index',
        editableTabs: [
            {
                title: '首页',
                name: 'Index'
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
        },
        resetMenu(state) {
            state.menuList = []
            state.permList = []
            state.hasRoute = false
            state.editableTabsValue = 'Index'
            state.editableTabs = [
                {
                    title: '首页',
                    name: 'Index'
                }
            ]
        },
        changeMenuStatus(state) {
            state.isCollapse = !state.isCollapse
            if (state.isCollapse) {
                state.iconMenu = 'el-icon-s-unfold'
                state.menuWidth = '70px'
            } else {
                state.iconMenu = 'el-icon-s-fold'
                state.menuWidth = '200px'
            }
        }
    },
    actions: {},
    modules: {}
}
