
const user = require('../models/user.js');


const getUserInfo = async (ctx) => {

  // console.log(ctx.params)
  const id = ctx.params['id'];                  // 获取url里传过来的参数里的id
  // console.log(id)
  const result = await user.getUserById(id);    // 通过异步查询地返回查询结果
  ctx.body  = result;                        // 将请求的结果放到response的body里返回
}


module.exports = {
  getUserInfo // 把获取用户信息的方法暴露出去 
}