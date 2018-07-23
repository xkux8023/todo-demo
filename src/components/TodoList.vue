<template>
  <el-row class="content">
    <el-col :xs="{span: 20,offset: 2}" :sm="{span: 6,offset: 9}">
      <span>
        欢迎：{{name}}！你的待办事项是：
      </span>
      <el-input v-model="todos" placeholder="请输入待办事项" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!Done">
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.status == false">
                  <span class="item">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="update(index)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                </div>
              </template>
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in list">
              <div class="todo-list" v-if="item.status == true">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="update(index)">还原</el-button>
                </span>
              </div>
            </template>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import jwt from 'jsonwebtoken'

export default {
  name: 'Todolist',
  data () {
    return {
      id: '',
      name: '',
      activeName: 'first',
      todos: '',
      list: [],
      count: 0
    };
  },
  created() {
    const userInfo = this.getUserInfo()
    if (userInfo != 'null' && userInfo != null) {
      this.name = userInfo.name
      this.id = userInfo.id
    } else {
      this.name = ''
      this.id = ''
    }
    this.getTodolist()
  },
  computed: {
    Done() {
      let count = 0
      let length = this.list.length
      for (let i in this.list) {
        this.list[i].status === 1 ? count += 1 : count += 0
      }
      this.count = count
      if (count == length || length == 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addTodos() {
      if (this.todos == '') return
      let obj = { status: false, content: this.todos, id: this.id }
      this.$http.post('/api/todolist', obj)
        .then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '创建成功！'
            })
            this.getTodolist()
          }else{
            this.$message.error('创建失败了！')
          }
        }, (err) => {
          this.$message.error('创建失败啦！')
          console.log(err)
        })
      this.todos = ''
    },
    update(index) {
      this.$http.put('/api/todolist/'+ this.id + '/' + this.list[index].id + '/' + this.list[index].status)
        .then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '任务状态更新成功！'
            })
            this.getTodolist()
          }else{
            this.$message.error('任务状态更新失败了！')
          }
        }, (err) => {
          this.$message.error('任务状态更新失败啦！')
          console.log(err)
        })
    },
    remove(index) {
      this.$http.delete('/api/todolist/'+ this.id + '/' + this.list[index].id)
        .then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '任务删除成功！'
            })
            this.getTodolist()
          }else{
            this.$message.error('任务删除失败了！')
          }
        }, (err) => {
          this.$message.error('任务删除失败啦！')
          console.log(err)
        })
    },
    getUserInfo() {
      const token = sessionStorage.getItem('token')
      if (token != null && token != 'null') {
        let decode = jwt.decode(token)
        return decode
      } else {
        return null
      }
    },
    getTodolist() {
      this.$http.get('/api/todolist/' + this.id)
        .then((res) => {
          console.log(res.data)
          if (res.data.length) {
            this.list = res.data
          } else {
            this.$message({
              type: 'success',
              message: '该用户暂无事件记录！'
            })
          }
        }, (err) => {
          this.$message.error('获取列表失败啦！')
          console.log(err)
        })
    }
  }
};
</script>

<style lang="stylus" scoped>
  .el-input
    margin 20px auto
  .todo-list
    width 100%
    margin-top 8px
    padding-bottom 8px
    border-bottom 1px solid #eee
    overflow hidden
    text-align left
    .item
      font-size 20px
      &.finished
        text-decoration line-through
        color #ddd
  .pull-right
    float right
</style>
