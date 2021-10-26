<template>
  <el-container>
    <el-aside width="200px">
      <side-menu></side-menu>
    </el-aside>
    <el-container>
      <el-header>
        <ContainerHeader></ContainerHeader>
      </el-header>
      <el-main>
        <tables></tables>
        <div style="margin: 0 10px">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "./inc/SideMenu";
import ContainerHeader from "./inc/ContainerHeader";
import Tables from "./inc/Tables";

export default {
  name: "Home",
  components: {
    SideMenu,
    ContainerHeader,
    Tables
  }
}
</script>

<style scoped lang="scss">
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  box-shadow: 0 1px 4px #e4e7ed;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
  padding: 0 !important;
}
</style>