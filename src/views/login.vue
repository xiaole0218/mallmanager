<template>
<div class="login-wrap">
  <el-form class="login-form" label-position="top" label-width="80px">
    <h2>用户登陆</h2>
    <el-form-item label="用户名">
      <el-input v-model="formdata.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formdata.password"></el-input>
    </el-form-item>
    <el-button  @keyup.enter="handleLogin()" @click="handleLogin()" class="login-button" type="primary">登陆</el-button>
  </el-form>
</div>
</template>

<script>
    export default {
        name: "login",
      data() {
          return {
            formdata: {
              username: '',
              password: ''
            }
          }
      },
      // async   await  处理异步操作
      methods: {
        async handleLogin() {
          const res = await this.$http.post('login', this.formdata)
           console.log(res)
          const {meta} = res.data
                if (meta.status === 200) {
                  const token = res.data.data.token
                  sessionStorage.setItem('token',token)
                  this.$router.push('/')
                  this.$message.success(meta.msg);
                } else {
                  //提示框
                  this.$message.warning(meta.msg);
                }
        }
        // handleLogin() {
        //   this.$http.post('login', this.formdata)
        //     .then((res) => {
        //       // console.log(res)
        //       const {meta} = res.data
        //       if (meta.status === 200) {
        //         this.$message.success(meta.msg);
        //       } else {
        //         //提示框
        //         this.$message.warning(meta.msg);
        //       }
        //     })
        // }
      }
    }
</script>

<style scoped>
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-wrap .login-form {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
  }

  .login-wrap .login-form .login-button {
    width: 100%;
  }
</style>
