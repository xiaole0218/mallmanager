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
        <template slot-scope="scope">
          <el-row class="level1" v-for="(item1,index) in scope.row.children" :key="index">
            <el-col :span="4">
              <el-tag @close="deleRole(scope.row,item1.id)" closable type="success">{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row class="level2" v-for="(item2,index) in item1.children" :key="index">
                <el-col :span="4">
                  <el-tag @close="deleRole(scope.row,item2.id)" closable type="warning">{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag @close="deleRole(scope.row,item3.id)" closable type="error" v-for="(item3,index) in item2.children" :key="index">{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length ===0">
            未分配任何权限
          </el-row>
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
          <el-button type="primary" icon="el-icon-edit" size="mini" plain circle ></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain circle @click="showSetRightDia(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain circle
                     ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分配权限的对话框-->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="50%"
      >
      <template slot-scope="scope">
        <!--属性结构-->
        <el-tree
          node-key="id"
          :data="treelist"
          :props="defaultProps"
          :default-expanded-keys="expandeArr"
          :default-checked-keys="checkedArr"
          show-checkbox></el-tree>
      </template>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="setRight()">确 定</el-button>
  </span>
    </el-dialog>
  </el-card>
</template>

<script>
    export default {
        name: "role",
      data() {
          return {
            rolelist: [],
            dialogVisible: false,
            treelist: [],
            defaultProps: {
              children: 'children',
              label: 'authName'
            },
            //展开节点的id 数组
            expandeArr:[],

            checkedArr: [],
            roleId: -1
          }
      },
      created() {
          this.loadTableData()
      },
      methods: {
          //修改权限
        setRight() {
          this.dialogVisible = true
          // roles/:roleId/rights
          //获取全选的ID值
          // getCheckedKeys
          //获取半选的id值
          // getHalfCheckedKeys

        },
          //显示分配权限对话框+请求列表数据
        async showSetRightDia (role) {
          this.roleId = role.id
          // console.log(role)
          this.dialogVisible = true
          const res = await this.$http.get(`rights/tree`)
          console.log(res)
          this.treelist = res.data.data
          //expandeArr  赋值
          const arr = []
            res.data.data.forEach(item1 => {
            // arr.push(item1.id)
            item1.children.forEach(item2 => {
              // arr.push(item2.id)
              item2.children.forEach(item3 => {
                arr.push(item3.id)
              })
            })
          })
          // console.log(arr)
          //默认展开的素组
          this.expandeArr = arr
          //默认选中的数组
          const arrcheck = []
          role.children.forEach(item1 => {
            arrcheck.push(item1.id)
            item1.children.forEach(item2 => {
              arrcheck.push(item2.id)
              item2.children.forEach(item3 => {
                arrcheck.push(item3.id)

              })
            })
          })
          this.checkedArr = arrcheck
        },
          //删除权限
      async deleRole (roleId,rightId) {
          // roles/:roleId/rights/:rightId
        const res = await this.$http.delete(`roles/${roleId.id}/rights/${rightId}`)
        // console.log(res)
        // this.loadTableData()
        //更新当前的children  -> scope.row
        //返回的响应中， 有当前角色剩余的权限信息
        //只更新当前children 的值
        roleId.children = res.data.data

        },
          async loadTableData () {
            const res = await this.$http.get(`roles`)
            // console.log(res)
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
  .level1{
    margin-bottom: 10px;
  }
  .level2{
    margin-bottom: 10px;
  }

</style>
