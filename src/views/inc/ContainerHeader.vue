<template>
  <div>
    <div class="header-bread">
      <div style="margin-left: -10px;cursor: pointer;">
        <i :class="this.$store.state.menu.iconMenu" @click="changeMenuStatus"></i>
      </div>
      <div style="margin-left: 15px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="header-avatar">
      <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
      <el-dropdown>
						<span class="el-dropdown-link">
						{{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toUserCenter">
            个人中心
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-link href="https://www.xiangxu999.com" target="_blank">网站</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContainerHeader",
  data() {
    return {
      userInfo: {
        id: null,
        username: null,
        avatar: null
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$axios.get('/system/userInfo').then(res => {
        this.userInfo = res.data.data
      })
    },
    toUserCenter() {
      // todo 存在一定问题
      this.$store.commit("addTab", {name: 'UserCenter', title: '个人中心'})
      this.$router.push('/user/center')
    },
    logout() {
      this.$axios.post('/logout').then(res => {
        localStorage.clear()
        sessionStorage.clear()

        this.$store.commit('resetState')

        this.$store.commit('resetMenu')

        this.$router.push('/login')
      })
    },
    changeMenuStatus() {
      this.$store.commit("changeMenuStatus")
    }
  }
}
</script>

<style scoped lang="scss">
.header-bread {
  float: left;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px
}

.header-avatar {
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