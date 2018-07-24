<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎注册
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
        <el-button type="primary"  @click="register">注册</el-button>
        <p>已有账号，<router-link to="login">立即登录</router-link></p>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Signup',
    data () {
      return {
        user: '',
        password: ''
      }
    },
    methods: {
      register () {
        const data = {
          name: this.user,
          password: this.password
        }
        if (!data.name || !data.password) {
          this.$message({
            message: '用户名或密码不能为空!',
            type: 'warning'
          })
        } else {
          this.$http.post('/api/signup', data)
            .then(res => {
              if (res.data.success) {
                const token = res.data.token
                localStorage.setItem('token', token)
                // Bearer是JWT的认证头部信息
                this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
                this.$message({
                  message: '注册成功，前往登陆！',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push('/login')
                }, 1500)
              } else {
                this.$message({
                  message: '该用户名已存在!',
                  type: 'warning'
                })
              }
            }).catch(err => {
              this.$message({
                message: '参数错误！',
                type: 'error'
              })
            })
        }
      }
    }
  }
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
