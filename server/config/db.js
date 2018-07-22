const Sequelize = require('sequelize'); // 引入sequelize
const config = {
  database: 'todolist',
  username: 'xkux8023',
  password: 'xkux8023',
  host: '127.0.0.1',
  port: 3306
}


// 使用url连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码
const Todolist = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql', // 数据库方言
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
})

module.exports = {
  Todolist // 将Todolist暴露出接口方便Model调用
}