<template>
  <div>
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-input v-model="searchForm.username" prefix-icon="el-icon-search" placeholder="请输入查询的用户名"
                  clearable/>
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-search" type="success" @click="getUserList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true" v-if="hasAuth('system:user:save')">新增</el-button>
        <!--<el-button icon="el-icon-plus" type="primary" @click="dialogVisible = true">新增</el-button>-->
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">
          <el-button type="danger" slot="reference" :disabled="delBtlStatu" v-if="hasAuth('system:user:delete')">批量删除
          </el-button>
          <!--<el-button icon="el-icon-delete" type="danger" slot="reference" :disabled="delBtlStatu">批量删除</el-button>-->
        </el-popconfirm>
      </el-form-item>
    </el-form>

    <el-table
        size="mini"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        stripe
        @selection-change="handleSelectionChange">

      <el-table-column type="selection"/>

      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名" align="center"/>

      <el-table-column prop="code" label="角色名称" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" v-for="item in scope.row.roles" :index="item.id" :key="item.id">{{ item.name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="email" label="邮箱" align="center"/>

      <el-table-column prop="phone" label="手机号" align="center"/>


      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.status === 1" type="success">正常</el-tag>
          <el-tag size="mini" v-else-if="scope.row.status === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="created" label="创建时间" align="center"/>

      <el-table-column prop="icon" label="操作" width="250px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="roleHandle(scope.row.id)">分配角色</el-button>
          <el-divider direction="vertical"></el-divider>

          <el-button size="mini" type="text" @click="repassHandle(scope.row.id, scope.row.username)">重置密码</el-button>
          <el-divider direction="vertical"></el-divider>

          <el-button size="mini" type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="确定删除吗？" @confirm="delHandle(scope.row.id)">
              <el-button size="mini" type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="current"
        :page-size="size"
        :total="total">
    </el-pagination>


    <!--新增对话框-->
    <el-dialog
        title="用户设置"
        :visible.sync="dialogVisible"
        :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm" size="mini">
        <el-form-item label="用户名" prop="username" label-width="100px">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
          <el-alert
              title="初始密码为888888"
              :closable="false"
              type="info"
              style="line-height: 12px;"
          ></el-alert>
        </el-form-item>

        <el-form-item label="邮箱" prop="email" label-width="100px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" label-width="100px">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status" label-width="100px">
          <el-switch
              v-model="editForm.status"
              :active-value=1
              :inactive-value=0
          >
          </el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="resetForm('editForm')">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配权限对话框 -->
    <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible" width="600px">

      <el-form :model="roleForm" size="mini">
        <el-tree
            :data="roleTreeData"
            show-checkbox
            ref="roleTree"
            :check-strictly=checkStrictly
            node-key="id"
            :props="defaultProps">
        </el-tree>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="roleDialogFormVisible=false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitRoleHandle('roleForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "SysRole",
  data() {
    return {
      searchForm: {},
      delBtlStatu: true,

      total: 0,
      size: 10,
      current: 1,

      dialogVisible: false,
      editForm: {},

      tableData: [],

      editFormRules: {
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      },

      multipleSelection: [],

      roleDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleForm: {},
      roleTreeData: [],
      treeCheckedKeys: [],
      checkStrictly: true

    }
  },
  created() {
    this.getUserList()

    this.$axios.get("/system/role/list").then(res => {
      this.roleTreeData = res.data.data.records
    })
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log("勾选")
      console.log(val)
      this.multipleSelection = val;

      this.delBtlStatu = val.length == 0
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getUserList()
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },

    getUserList() {
      this.$axios.get("/system/user/list", {
        params: {
          username: this.searchForm.username,
          current: this.current,
          size: this.size
        }
      }).then(res => {
        this.tableData = res.data.data.records
        this.size = res.data.data.size
        this.current = res.data.data.current
        this.total = res.data.data.total
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/system/user/' + (this.editForm.id ? 'update' : 'save'), this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success',
                  onClose: () => {
                    this.getUserList()
                  }
                });

                this.dialogVisible = false
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editHandle(id) {
      this.$axios.get('/system/user/info/' + id).then(res => {
        this.editForm = res.data.data

        this.dialogVisible = true
      })
    },
    delHandle(id) {

      var ids = []

      if (id) {
        ids.push(id)
      } else {
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
      }

      console.log(ids)

      this.$axios.post("/system/user/delete", ids).then(res => {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success',
          onClose: () => {
            this.getUserList()
          }
        });
      })
    },
    roleHandle(id) {
      this.roleDialogFormVisible = true

      this.$axios.get('/system/user/info/' + id).then(res => {
        this.roleForm = res.data.data

        let roleIds = []
        res.data.data.roles.forEach(row => {
          roleIds.push(row.id)
        })
        this.$refs.roleTree.setCheckedKeys(roleIds)
      })
    },
    submitRoleHandle(formName) {
      let roleIds = this.$refs.roleTree.getCheckedKeys()

      console.log(roleIds)

      this.$axios.post('/system/user/role/' + this.roleForm.id, roleIds).then(res => {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success',
          onClose: () => {
            this.getUserList()
          }
        });
        this.roleDialogFormVisible = false
      })
    },
    repassHandle(id, username) {

      this.$confirm('将重置用户【' + username + '】的密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/system/user/repass", id).then(res => {
          this.$message({
            showClose: true,
            message: '操作成功',
            type: 'success',
            onClose: () => {
            }
          });
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">

.el-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>