<template>
    <!--<div>你好</div>-->
  <!--//面包屑-->
  <!--<rights level1="列表权限" level2="你好"></rights>-->
<el-card class="box-card">
  <my-bread level1="权限管理" level2="权限列表"></my-bread>

</el-card>
</template>

<script>
    export default {
        name: "rights",
      

    }
</script>

<style scoped>
  .box-card {
    height: 100%;
  }
</style>
