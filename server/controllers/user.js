
const user = require('../models/user.js');
const jwt = require('koa-jwt');
const bcrypt = require('bcryptjs');


const getUserInfo = async (ctx) => {

  // console.log(ctx.params)
  const id = ctx.params['id'];                  // 获取url里传过来的参数里的id
  // console.log(id)
  const result = await user.getUserById(id);    // 通过异步查询地返回查询结果
  ctx.body  = result;                        // 将请求的结果放到response的body里返回
}


const postUserAuth = async (ctx) => {
  const data = ctx.request.body;      // post过来的数据存在request.body里
  console.log(data);
  const userInfo = await user.getUserByName(data.name);

  if(userInfo != null) {
    if(!bcrypt.compareSync(data.password, userInfo.password)) { // 验证密码是否正确
      ctx.body = {
        success: false,   // success标志位是方便前端判断返回是正确与否
        info: '密码错误！'
      }
    } else {              // 如果密码正确
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secret = 'vue-koa-demo'; // 指定密钥，这是之后用来判断token合法性的标志
      const token = jwt({userToken: secret}); // 签发token
      console.log(token)
      ctx.body = {
        success: true,
        token: token, // 返回token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在！' // 如果用户不存在返回用户不存在
    }
  }
}

module.exports = {
  getUserInfo, // 把获取用户信息的方法暴露出去 
  postUserAuth
}