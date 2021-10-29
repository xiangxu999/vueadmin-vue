import Vue from 'vue'
import request from "./axios";

Vue.mixin({
    methods: {
        hasAuth(perm) {
            let authority = this.$store.state.menu.permList
            return authority.indexOf(perm) > -1
        }
    }
})

export default global