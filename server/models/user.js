const db = require('../config/db')
const TodolistDB = db.Todolist
const User = TodolistDB.import('../schema/user.js') // 用sequelize的import方法引入表结构，实例化了User。


class UserModel {

  /**
   * 查询用户信息
   * @param id
   * @returns {Promise.<*>}
   */
  static async getUserById (id) {
    const userInfo = await User.findOne({
      where: {
        id: id
      }
    })

    return userInfo
  }

  /**
   * 查询用户信息
   * @param name  姓名
   * @returns {Promise.<*>}
   */
  static async getUserByName (name) {
    const userInfo = await User.findOne({
      where: {
        user_name: name
      }
    })

    return userInfo
  }

  /**
   * 创建用户
   * @param user
   * @returns {Promise.<boolean>}
   */
  static async createUser (user) {
    await User.create({
      user_name: user.name,
      password: user.password
    })
    return true
  }
}


module.exports = UserModel
