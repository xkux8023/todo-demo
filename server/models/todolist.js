const db = require('../config/db.js');
const todoModel = '../schema/list.js';  // 引入list的表结构
const TodolistDB = db.Todolist;         // 引入数据库




const Todolist = TodolistDB.import(todoModel); 

const getTodolistById = async (id) => {
  const todolist = await Todolist.findAll({
    where: {
      user_id: id
    },
    attributes: ['id', 'content', 'status']     // 只需返回这三个字段的结果即可
  });

  return todolist; // 返回数据
}


const createTodolist = async (data) => {      // 给某个用户创建一条todolist
  await Todolist.create({
    user_id: data.id,
    content: data.content,
    status: data.status
  })
  return true;
}



const removeTodolist = async (id, user_id) => {
  await Todolist.destroy({
    where: { id, user_id }
  });

  return true;
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