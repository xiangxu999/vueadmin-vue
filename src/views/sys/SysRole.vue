<template>
  <div>
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-input v-model="searchForm.name" prefix-icon="el-icon-search" placeholder="请输入要查询的角色名称" clearable/>
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-search" type="success" @click="getRoleList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-plus" type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="确定批量删除吗？" @confirm="delHandle(null)">
          <el-button icon="el-icon-delete" type="danger" slot="reference" :disabled="delBtlStatu">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>

    <el-table size="mini" ref="multipleTable" :data="tableData" tooltip-effect="dark" stripe
              @selection-change="handleSelectionChange">

      <el-table-column type="selection" align="center"/>

      <el-table-column prop="name" label="名称"/>

      <el-table-column prop="code" label="唯一编码" show-overflow-tooltip align="center"/>

      <el-table-column prop="remark" label="描述" show-overflow-tooltip/>

      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.status === 1" type="success">正常</el-tag>
          <el-tag size="mini" v-else-if="scope.row.status === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="permHandle(scope.row.id)">分配权限</el-button>
          <el-divider direction="vertical"></el-divider>

          <el-button size="mini" type="text" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
              <el-button size="mini" type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>

        </template>
      </el-table-column>

    </el-table>


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
        title="角色设置"
        :visible.sync="dialogVisible"
        :before-close="handleClose">

      <el-form size="mini" :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px"
               class="demo-editForm">

        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="editForm.code" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
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

    <el-dialog title="分配权限" :visible.sync="permDialogVisible">

      <el-form :model="permForm">
        <el-tree
            :data="permTreeData"
            show-checkbox
            ref="permTree"
            :default-expand-all=true
            node-key="id"
            :check-strictly=true
            :props="defaultProps">
        </el-tree>
      </el-form>

      <span slot="footer" class="dialog-footer">
			    <el-button size="mini" @click="permDialogVisible = false">取 消</el-button>
			    <el-button size="mini" type="primary" @click="submitPermFormHandle('permForm')">确 定</el-button>
			</span>

    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Role",
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
        name: [
          {required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入唯一编码', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      },

      multipleSelection: [],

      permDialogVisible: false,
      permForm: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      permTreeData: []
    }
  },
  created() {
    this.getRoleList()

    this.$axios.get('/system/menu/list').then(res => {
      this.permTreeData = res.data.data
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
      this.getRoleList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getRoleList()
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    getRoleList() {
      this.$axios.get("/system/role/list", {
        params: {
          name: this.searchForm.name,
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
          this.$axios.post('/system/role/' + (this.editForm.id ? 'update' : 'save'), this.editForm)
              .then(res => {

                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success',
                  onClose: () => {
                    this.getRoleList()
                  }
                });

                this.dialogVisible = false
                this.resetForm(formName)
              })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editHandle(id) {
      this.$axios.get('/system/role/info/' + id).then(res => {
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

      this.$axios.post("/system/role/delete", ids).then(res => {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success',
          onClose: () => {
            this.getRoleList()
          }
        });
      })
    },
    permHandle(id) {
      this.permDialogVisible = true

      this.$axios.get("/system/role/perm/" + id).then(res => {
        this.$refs.permTree.setCheckedKeys(res.data.data.menuIds)
        this.permForm = res.data.data
        console.log(this.permForm)
      })
    },

    submitPermFormHandle(formName) {
      var menuIds = this.$refs.permTree.getCheckedKeys()

      console.log(menuIds)

      this.$axios.post('/system/role/perm/' + this.permForm.id, menuIds).then(res => {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success',
          onClose: () => {
            this.getRoleList()
          }
        });
        this.permDialogVisible = false
        this.resetForm(formName)
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