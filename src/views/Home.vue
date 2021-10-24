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
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "./inc/SideMenu";
import ContainerHeader from "./inc/ContainerHeader";
export default {
  name: "Home",
  components:{
    SideMenu,
    ContainerHeader
  }
}
</script>

<style scoped>
  .el-container{
    padding: 0;
    margin: 0;
    height: 100%;
  }
  .el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>