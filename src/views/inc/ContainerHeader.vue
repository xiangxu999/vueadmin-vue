<template>
  <div class="header-avatar">
    <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
    <el-dropdown>
						<span class="el-dropdown-link">
						{{ userInfo.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
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
</template>

<script>
export default {
  name: "ContainerHeader",
  data() {
    return {
      userInfo: {
        id: null,
        userName: null,
        avatar: null
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$axios.get('/sys/userInfo').then(res => {
        this.userInfo = res.data.data
      })
    },
    toUserCenter() {
      this.$router.push('/user/center')
    },
    logout() {
      this.$axios.post('/logout').then(res => {
        localStorage.clear()
        sessionStorage.clear()

        this.$store.commit('resetState')

        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
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