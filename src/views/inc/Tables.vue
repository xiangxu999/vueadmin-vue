<template>
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
    <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import router from '../../router'

export default {
  name: "Tables",
  data() {
    return {}
  },
  computed: {
    editableTabs: {
      get() {
        return this.$store.state.menu.editableTabs;
      },
      set(val) {
        this.$store.state.menu.editableTabs = val
      }
    },
    editableTabsValue: {
      get() {
        return this.$store.state.menu.editableTabsValue;
      },
      set(val) {
        this.$store.state.menu.editableTabsValue = val;
      }
    }
  },
  methods: {
    clickTab(target) {
      console.log(target.name)
      console.log(this.$store.state.menu.editableTabsValue)
      if (this.$store.state.menu.editableTabsValue !== target.name) {
        console.log(111)
        this.$router.push({name: target.name})
      }
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      // 首页不能删除
      if (targetName === "Index") {
        return
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      this.$router.push({name: activeName})
    }
  }
}
</script>

<style scoped>

</style>