<template>
    <!--<div>你好</div>-->
  <!--//面包屑-->
  <!--<rights level1="列表权限" level2="你好"></rights>-->
<el-card class="box-card">
  <my-bread level1="权限管理" level2="权限列表"></my-bread>
  <!--表格-->
  <el-table
    class="table"
    :data="list"
    border
    height="700"
    style="width: 100%">
    <el-table-column
      type="index"
      label="#"
      width="80">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="100">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="80">
    </el-table-column>
    <el-table-column
      prop="level"
      label="层级">
      <template slot-scope="scope">
        <span v-if="scope.row.level==='0'">一级</span>
        <span v-else-if="scope.row.level==='1'">二级</span>
        <span v-else-if="scope.row.level==='2'">三级</span>
      </template>
    </el-table-column>
  </el-table>

</el-card>
</template>

<script>
    export default {
        name: "rights",
      data() {
        return {
          list: []
        }
      },
      created() {
          this.loadTableData()
      },
      methods: {
          async loadTableData() {
            // rights/:type
            //一次性设置授权  = token
            const res = await this.$http.get(`rights/list`)
            console.log(res)
            this.list = res.data.data
          }
      }
      

    }
</script>

<style scoped>
  .box-card {
    height: 100%;
  }
  .table {
    margin-top: 25px;
  }
</style>
