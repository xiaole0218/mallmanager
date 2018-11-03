<template>
    <!--<div>你好</div>-->
  <!--//面包屑-->
  <!--<rights level1="列表权限" level2="你好"></rights>-->
<el-card class="box-card">
  <my-bread level1="权限管理" level2="权限列表"></my-bread>
  <!--表格-->
  <el-table
    :data="list"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>

</el-card>
</template>

<script>
    export default {
        name: "rights",
      created() {
          this.loadTableData()
      },
      methods: {
          async loadTableData() {
            // rights/:type
            //一次性设置授权  = token
            const res = await this.$http.get(`rights/list`)
            console.log(res)
          }
      }
      

    }
</script>

<style scoped>
  .box-card {
    height: 100%;
  }
</style>
