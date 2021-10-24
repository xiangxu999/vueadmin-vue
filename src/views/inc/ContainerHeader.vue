<template>
  <div class="header-avatar">
    <el-avatar size="medium" src="https://cdn.lixingyong.com/2021/01/15/QQ20210115152209.jpg"></el-avatar>
    <el-dropdown>
						<span class="el-dropdown-link">
						Admin<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-link href="https://www.xiangxu999.com" target="_blank">网站</el-link>
  </div>
</template>

<script>
export default {
  name: "ContainerHeader"
}
</script>

<style scoped>
  .header-avatar{
    float: right;
    width: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
</style>