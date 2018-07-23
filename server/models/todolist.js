const db = require('../config/db')
const TodolistDB = db.Todolist       // 引入数据库
const Todolist = TodolistDB.import('../schema/list')  // 引入list表结构


class TodolistModel {
  /**
   * 获取todolist
   * @param userId  用户ID
   * @returns {Promise.<*>}
   */
  static async getTodolistByUserId (userId) {
    const todolist = await Todolist.findAll({
      where: {
        user_id: userId
      },
      attributes: ['id', 'content', 'status']     // 只需返回这三个字段的结果即可
    })

    return todolist; // 返回数据
  }

  /**
   * 创建一条todolist的数据
   * @param data
   * @returns {Promise.<boolean>}
   */
  static async createTodolist (data) {
    await Todolist.create({
      user_id: data.id,
      content: data.content,
      status: data.status
    })
    return true
  }

  /**
   * 删除todolist
   * @param id listID
   * @returns {Promise.<boolean>}
   */
  static async removeTodolist (id, user_id) {
    await Todolist.destroy({
      where: { id, user_id }
    })

    return true
  }

  /**
   * 更新数据的状态
   * @param id  用户ID
   * @param status  事项的状态
   * @returns {Promise.<boolean>}
   */

  static async updateTodolist (id, user_id, status) {
    await Todolist.update(
      { status },
      { where: { id, user_id } }
    );

    return true
  }
}

module.exports = TodolistModel

/*
const getTodolistById = async (id) => {
  const todolist = await Todolist.findAll({
    where: {
      user_id: id
    },
    attributes: ['id', 'content', 'status']     // 只需返回这三个字段的结果即可
  })

  return todolist; // 返回数据
}


const createTodolist = async (data) => {      // 给某个用户创建一条todolist
  await Todolist.create({
    user_id: data.id,
    content: data.content,
    status: data.status
  })
  return true
}



const removeTodolist = async (id, user_id) => {
  await Todolist.destroy({
    where: { id, user_id }
  });

  return true
}

const updateTodolist = async (id, user_id, status) => {
  await Todolist.update(
    { status },
    { where: { id, user_id } }
  );

  return true;
}


module.exports = {
  getTodolistById,  // 导出getTodolistById的方法，将会在controller里调用
  createTodolist,
  removeTodolist,
  updateTodolist
}

*/
