const Router = require('koa-router')
const TodolistController = require('../controllers/todolist')
const UserController = require('../controllers/user')

const router = new Router({
  prefix: '/api'
})


router
  .post('/login', UserController.postLogin)  // 登录
  .post('/signup', UserController.createUser) // 注册
  .get('/user', UserController.getUserInfo) // 获取用户信息

  .get('/todolist/:userId', TodolistController.getTodolistByUserId) // 获取todolist
  .post('/todolist', TodolistController.createTodolist)  // 创建todolist
  .delete('/todolist/:userId/:id', TodolistController.removeTodolist)  // 删除todolist
  .put('/todolist/:userId/:id/:status', TodolistController.updateTodolist)  // 更新todolist



module.exports = router