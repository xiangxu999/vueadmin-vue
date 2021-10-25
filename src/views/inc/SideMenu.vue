<template>
  <el-menu
      class="el-menu-vertical"
      background-color="rgb(48, 65, 86)"
      text-color="rgb(191, 203, 217)"
      default-active="/index"
      :router="true"
  >
    <el-menu-item index="/index">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </template>
    </el-menu-item>
    <el-submenu :index="menu.path" v-for="menu in menuList">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{ menu.title }}</span>
      </template>
      <el-menu-item :index="item.path" v-for="item in menu.children">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {}
  },
  computed: {
    menuList: {
      get() {
        return this.$store.state.menu.menuList
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.el-menu-vertical {
  height: 100%;
  overflow: hidden;
}

.el-menu-item:hover {
  background-color: rgb(38, 52, 69) !important;
}

.el-menu-item.is-active {
  background-color: rgb(38, 52, 69) !important;
}
</style>