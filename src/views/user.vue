<template>
  <!--面包屑-->
  <el-card class="box-card">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!--搜索框-->
    <el-row class="searchArea">
      <el-col :span="24">
    <el-input placeholder="请输入内容"  class="searchInput" v-model="searchVal">
      <el-button slot="append" icon="el-icon-search" @click="checkUser()"></el-button>
    </el-input>
    <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
  <!--表格-->
    <el-table
      v-loading="loading"
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
            <el-button type="primary" icon="el-icon-edit" size="mini" plain circle></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" plain circle></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" plain circle></el-button>
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
          searchVal: ''
        }
      },
      // created  页面出现之前

      mounted() {

          this.loadTableDate();
      },
      methods: {
          //查询用户
        checkUser () {
            this.loadTableDate()
        },
          //分页相关方法
        handleSizeChange(val) {
          this.pagesize = val
          this.loadTableDate()
          // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.pagenum= val
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
            if (status ===200) {
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
  .box-card{
    height: 100%;
  }
  .searchArea{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .searchArea .searchInput{
    width: 350px;
  }
</style>
