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
    <el-input placeholder="请输入内容"  class="searchInput">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
  <!--表格-->
  <!--分页-->
  </el-card>
</template>

<script>
    export default {
        name: "user"
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
