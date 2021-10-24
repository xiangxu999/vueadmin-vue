<template>
  <el-menu
      class="el-menu-vertical"
      background-color="rgb(48, 65, 86)"
      text-color="rgb(191, 203, 217)"
      default-active="0"
  >
    <el-menu-item index="0">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </template>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-operation"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item index="1-1">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-2">
        <template slot="title">
          <i class="el-icon-rank"></i>
          <span slot="title">角色管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="1-3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">菜单管理</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>系统工具</span>
      </template>
      <el-menu-item index="2-2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span slot="title">数字字典</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu"
}
</script>

<style scoped>
  .el-menu-vertical{
    height: 100%;
    overflow: hidden;
  }
  .el-menu-item:hover{
    background-color: rgb(38, 52, 69) !important;
  }
  .el-menu-item.is-active {
    background-color: rgb(38, 52, 69) !important;
  }
</style>