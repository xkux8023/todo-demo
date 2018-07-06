// server/routes/api.js
const todolist = require('../controllers/todolist.js');
const router = require('koa-router')();

router.get('/todolist/:id', todolist.getTodolist); 
router.post('/todolist/:id', todolist.createTodolist);
router.delete('/todolist/:id', todolist.removeTodolist);
router.put('/todolist/:id', todolist.updateTodolist);

module.exports = router; // 导出router规则
