<template>
  <div>
    <el-form :inline="true" size="mini">
      <el-form-item>
        <!--搜索部分 todo后续完成 -->
        <el-input placeholder="请输入菜单名称" prefix-icon="el-icon-search"/>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="success">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <!--操作部分-->
        <el-button icon="el-icon-plus" type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="tableData" size="small" row-key="id" stripe lazy :tree-props="{children: 'children'}">
      <el-table-column prop="name" label="名称"/>

      <el-table-column prop="perms" label="权限编码"/>

      <el-table-column prop="path" label="菜单URL"/>

      <el-table-column prop="component" label="菜单组件"/>

      <el-table-column prop="icon" label="图标" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.type === 0">目录</el-tag>
          <el-tag size="mini" v-else-if="scope.row.type === 1" type="success">菜单</el-tag>
          <el-tag size="mini" v-else-if="scope.row.type === 2" type="warning">按钮</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.status === 1" type="success">正常</el-tag>
          <el-tag size="mini" v-else-if="scope.row.status === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="sort" label="排序号" align="center"/>

      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <template>
            <el-popconfirm title="确定删除吗？" @confirm="delHandle(scope.row.id)">
              <el-button size="mini" type="text" icon="el-icon-delete" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!--新增对话框-->
    <el-dialog title="菜单管理" :visible.sync="dialogVisible" :before-close="handleClose">

      <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="demo-editForm" size="mini">
        <el-form-item label="上级菜单" prop="parentId" label-width="100px">
          <el-select v-model="editForm.parentId" placeholder="请选择上级菜单">
            <template v-for="item in tableData">
              <el-option :label="item.name" :value="item.id"></el-option>
              <template v-for="child in item.children">
                <el-option :label="child.name" :value="child.id">
                  <span>{{ "- " + child.name }}</span>
                </el-option>
              </template>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off"/>
        </el-form-item>

        <el-form-item label="权限编码" prop="perms" label-width="100px">
          <el-input v-model="editForm.perms" autocomplete="off"/>
        </el-form-item>

        <el-form-item label="图标" prop="icon" label-width="100px">
          <el-input v-model="editForm.icon" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="菜单URL" prop="path" label-width="100px">
          <el-input v-model="editForm.path" autocomplete="off"/>
        </el-form-item>

        <el-form-item label="菜单组件" prop="component" label-width="100px">
          <el-input v-model="editForm.component" autocomplete="off"/>
        </el-form-item>

        <el-form-item label="类型" prop="type" label-width="100px">
          <el-radio-group v-model="editForm.type">
            <el-radio-button :label=0>目录</el-radio-button>
            <el-radio-button :label=1>菜单</el-radio-button>
            <el-radio-button :label=2>按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态" prop="status" label-width="100px">
          <el-switch
              v-model="editForm.status"
              :active-value=1
              :inactive-value=0
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="排序号" prop="sort" label-width="100px">
          <el-input-number v-model="editForm.sort" :min="1" label="排序号"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('editForm')" size="mini">保 存</el-button>
        <el-button @click="resetForm('editForm')" size="mini">取 消</el-button>
      </div>
    </el-dialog>


  </div>

</template>

<script>
export default {
  name: "SysMenu",
  data() {
    return {
      dialogVisible: false,
      editForm: {},
      editFormRules: {
        parentId: [
          {required: true, message: '请选择上级菜单', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        perms: [
          {required: true, message: '请输入权限编码', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请填入排序号', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'blur'}
        ]
      },
      tableData: []
    }
  },
  created() {
    this.getMenuTree()
  },
  methods: {
    getMenuTree() {
      this.$axios.get("/system/menu/list").then(res => {
        this.tableData = res.data.data
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/system/menu/' + (this.editForm.id ? 'update' : 'save'), this.editForm)
              .then(res => {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success',
                  onClose: () => {
                    this.getMenuTree()
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
      this.$axios.get('/system/menu/info/' + id).then(res => {
        this.editForm = res.data.data

        this.dialogVisible = true
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.editForm = {}
    },
    handleClose() {
      this.resetForm('editForm')
    },
    delHandle(id) {
      this.$axios.post("/system/menu/delete/" + id).then(res => {
        this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success',
          onClose: () => {
            this.getMenuTree()
          }
        });
      })
    }
  }
}
</script>

<style scoped>

</style>