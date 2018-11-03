<template>
  <el-card class="box-card">
<my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row>
      <el-col :span="24">
        <el-button class="addbtn" type="primary">添加角色</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table
      :data="rolelist"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">

        </template>
      </el-table-column>
      <el-table-column
        label="#"
        type="index"
        >
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName">
      </el-table-column>
      <el-table-column
        label="角色描述"
        prop="roleDesc">
      </el-table-column>
      <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="showEditBox(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain circle @click="showRoleBox(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain circle
                     @click="showDeleBox(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
    export default {
        name: "role",
      data() {
          return {
            rolelist: []
          }
      },
      created() {
          this.loadTableData()
      },
      methods: {
          async loadTableData () {
            const res = await this.$http.get(`roles`)
            console.log(res)
            this.rolelist = res.data.data
          }
      }
    }
</script>

<style scoped>
  .box-card {
    height: 100%;
  }
  .addbtn {
    margin-top: 20px;
  }
</style>
