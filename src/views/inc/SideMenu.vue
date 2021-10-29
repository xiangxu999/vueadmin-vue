<template>
  <el-menu
      class="el-menu-vertical"
      background-color="rgb(48, 65, 86)"
      text-color="rgb(191, 203, 217)"
      :default-active="this.$store.state.menu.editableTabsValue"
      :router="true"
      :collapse="isCollapse"
  >
    <el-menu-item index="Index" route="/index" @click="selectMenu({name:'Index', title:'首页'})">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </template>
    </el-menu-item>
    <el-submenu :index="menu.name" v-for="menu in menuList" :key="menu.name">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{ menu.title }}</span>
      </template>
      <el-menu-item :index="item.name" :key="item.name" :route="item.path" v-for="item in menu.children"
                    @click="selectMenu(item)">
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
    },
    isCollapse: {
      get() {
        return this.$store.state.menu.isCollapse
      }
    }
  },
  methods: {
    selectMenu(item) {
      this.$store.commit('addTab', item)
    }
  }
}
</script>

<style scoped lang="scss">
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