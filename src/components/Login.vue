<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎登录
      </span>
      <el-row>
        <el-input
          v-model="user"
          placeholder="账号"
          type="text">
        </el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password">
        </el-input>
        <el-button type="primary"  @click="loginToDo">登录</el-button>
        <p>没有账号，<router-link to="signup">立即注册</router-link>
        </p>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    loginToDo() {
      let obj = {
        name: this.user,
        password: this.password
      }
      this.$http.post('/api/login', obj)
        .then((res) => {
          if(res.data.success) {
            sessionStorage.setItem('token', res.data.token)
            this.$message({
              type: 'success',
              message: '登录成功！'
            })
            this.$router.push('/todolist')
          } else {
            this.$message({
              message: '请输入正确的用户名或密码!',
              type: 'warning'
            })
            sessionStorage.setItem('token',null)
          }
        }, (err) => {
          this.$message.error('请求错误: ' + err)
          sessionStorage.setItem('token',null)
        })
    }
  }
};
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding 16px
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px
</style>
