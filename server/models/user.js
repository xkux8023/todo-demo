const db = require('../config/db.js');
const userModel = '../schema/user.js';  // 引入user的表结构
const TodolistDB = db.Todolist;         // 引入数据库




const User = TodolistDB.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。

const getUserById = async (id) => {
  const userInfo = await User.findOne({
    where: {
      id: id
    }
  });

  return userInfo; // 返回数据
}


module.exports = {
  getUserById  // 导出getUserById的方法，将会在controller里调用
}