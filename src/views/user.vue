<template>
  <!--面包屑-->
  <el-card class="box-card" v-loading="loading"
  >
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input placeholder="请输入内容" class="searchInput" v-model="searchVal">
          <el-button slot="append" icon="el-icon-search" @click="checkUser()"></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
      </el-col>
    </el-row>
    <!--添加用户的对话框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdduser">
      <el-form :model="formData">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdduser = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑用户对话框-->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdituser">
      <el-form :model="formData">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdituser = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!--分配权限的对话框-->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleSetrole">
      <el-form :model="formData">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          {{currentUserName}}
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="currentRoleId">
            <!--请选择-->
            <el-option disabled label="请选择" :value="-1">

            </el-option>
            <!--遍历数组-->
            <el-option
              v-for="(item,index) in roles"
              :label="item.roleName"
              :key="index"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSetrole = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
    <!--表格-->
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="100">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="100">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="140">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建日期"
        width="180">
        <template slot-scope="scope">
          {{scope.row.create_time | fmtDate('YYYY-MM-DD HH:mm:ss')}}

        </template>
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="120">
        <template slot-scope="scope">
          <!--slot-scope  用来传值的-->
          <!--scope  是随便的命名-->
          <!--scope  是list  -->
          <!--scope.row  就是list 中的每个元素 这里是{}-->
          <!--scope.row.mg_state-->
          <el-switch
            @change="changeSwitchMgstate(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="showEditBox(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain circle @click="showRoleBox(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain circle
                     @click="showDeleBox(scope.row.id)"></el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        list: [],
        //加载动画的值
        loading: false,
        currentPage: 1,
        total: 0,
        pagesize: 2,
        pagenum: 1,
        //搜索关键字
        searchVal: '',
        //添加用户添加框的属性
        dialogFormVisibleAdduser: false,
        formData: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        //对话框input 的宽度
        formLabelWidth: '120px',
        // 编辑用户对话框属性
        dialogFormVisibleEdituser: false,
        // 分配权限的对话框属性
        dialogFormVisibleSetrole: false,
        //当前用户名
        currentUserName: '',
        //当前的角色名
        currentRoleId: -1,
        //所有角色
        roles: [],
        //用户id
        currentUserId: -1
      }
    },
    // created  页面出现之前

    mounted() {

      this.loadTableDate();
    },
    methods: {
      //分配权限- 发送请求
      async setRole () {
        //发送请求
        // users/:id/role  （rid: 角色id）
        const res = await this.$http.put(`users/${this.currentUserId}/role`,{
          rid:this.currentRoleId
        })
        // console.log(res)
        const {meta:{status,msg}} = res.data
        //提示框
        this.$message.success(msg)
        //关闭对话框
        this.dialogFormVisibleSetrole = false
      },
      //分配权限 - 显示对话框
      async showRoleBox (user) {
        //获取用户id
        this.currentUserId = user.id

        this.currentUserName = user.username
        this.dialogFormVisibleSetrole = true
        const res = await this.$http.get('roles')
        // console.log(res)
        const res2 = await this.$http.get(`users/${user.id}`)

        // console.log(res2.data.data.rid)
        this.currentRoleId = res2.data.data.rid
        this.roles = res.data.data
        // console.log(this.roles)

      },
      //编辑用户，发送请求
      async editUser() {
        //关闭对话框
        this.dialogFormVisibleEdituser = false

        const res = await this.$http.put(`users/${this.formData.id}`, this.formData)
        // console.log(res)
        //提示框
        this.$message.success(res.data.meta.msg)
        this.formData = {}

      },
      //显示编辑对话框
      async showEditBox (userId) {
        //显示对话框
        this.dialogFormVisibleEdituser = true
        //发送请球
        const res = await this.$http.get(`users/${userId}`)
        // console.log(res)
        //刷新视图
        this.loadTableDate()
        //提示框
        this.formData = res.data.data
        // console.log(this.formData)


      },
      //添加用户
      async addUser() {
        //关闭对话框
        this.dialogFormVisibleAdduser = false
        //发送请求
        const res = await this.$http.post('users',this.formData)
        // console.log(res)
        const {meta: {status,msg}} = res.data
        //刷新视图
        this.loadTableDate()
        //请求框
        this.$message.success(msg)
        //清空表单
        this.formData = {}

      },
      //显示添加的对话框
      showAddUserDia() {
        this.dialogFormVisibleAdduser = true
      },
      //显示删除提示框
      showDeleBox(userId) {
        this.$confirm('皇上大人，确认要删除么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`users/${userId}`)
          // console.log(res)
          const {meta: {msg, status}} = res.data
          if (status === 200) {
            // 刷新表格
            this.loadTableDate()
            //
            this.$message({
              type: 'success',
              message: msg
            });
          }

        }).catch(() => {

          this.$message({
            type: 'info',
            message: '不好意思，删除失败了'
          });
        });
      },
      //改变用户状态
      async changeSwitchMgstate(user) {
        // users/:uId/state/:type
        //  :uid ->  user.id
        // : type -> true  或者 false
        const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
        // console.log(res)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          this.$message.success(msg)
        }
      },
      //查询用户
      checkUser() {
        this.loadTableDate()
      },
      //分页相关方法
      handleSizeChange(val) {
        this.pagesize = val
        this.loadTableDate()
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pagenum = val
        this.loadTableDate()
        // console.log(`当前页: ${val}`);
      },
      async loadTableDate() {
        this.loading = true
        //除了登陆功能，其他功能的接口都需要加入  token  才有请求的权限
        //header  添加token

        const AUTH_TOKEN = sessionStorage.getItem('token')
        this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchVal}`)
        // console.log(res)

        this.total = res.data.data.total
        // console.log(this.total)
        const {meta: {msg, status}, data: {users}} = res.data
        if (status === 200) {
          this.loading = false
          //分页请求后重置页,让搜索的内容在第一页显示
          this.pagenum = 1

          this.list = users
          // console.log(this.list)
        }
      }
    }
  }
</script>

<style scoped>
  .box-card {
    height: 100%;
  }

  .searchArea {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .searchArea .searchInput {
    width: 350px;
  }
</style>
