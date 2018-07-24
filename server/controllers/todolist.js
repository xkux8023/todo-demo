const TodolistModel = require('../models/todolist');

class TodolistController {

  /**
   * 某个用户的所有todolist
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async getTodolistByUserId (ctx) {            // 获取某个用户的所有todolist
    const userId = ctx.params['userId']                 // 获取url里传过来的参数里的id
    const result = await TodolistModel.getTodolistByUserId(userId)    // 通过异步查询地返回查询结果
    ctx.body  = result                       // 将请求的结果放到response的body里返回
  }

  /**
   * 创建todoList
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async createTodolist (ctx) {         // 给某个用户创建一条todolist
    const data = ctx.request.body                // post请求，数据是在request.body里的
    console.log(data)
    const result = await TodolistModel.createTodolist(data)

    ctx.body = { success: true }
  }

  /**
   * 删除 todoList
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async removeTodolist (ctx) {
    const id = ctx.params['id']
    const user_id = ctx.params['userId']
    const result = await TodolistModel.removeTodolist(id, user_id)
    ctx.body = {
      success: true
    }
  }

  /**
   * 更新事项的状态
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async updateTodolist (ctx) {
    const id = ctx.params['id']
    const user_id = ctx.params['userId']
    let status = ctx.params['status']
    status == '0' ? status = true : status = false
    const result = await TodolistModel.updateTodolist(id, user_id, status)
    ctx.body = {
      success: true
    }
  }
}

module.exports = TodolistController

