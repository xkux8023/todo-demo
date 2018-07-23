const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secret = require('../middleware/getSecret')
// const secret = require('../config/secret')


class UserController {

  /**
   * 获取用户信息
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async getUserInfo (ctx) {
    const id = ctx.params['id']                  // 获取url里传过来的参数里的id
    const result = await userModel.getUserById(id)    // 通过异步查询地返回查询结果
    ctx.body  = result                        // 将请求的结果放到response的body里返回
  }

  /**
   * 创建用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async createUser(ctx) {
    const user = ctx.request.body
    if (user.password && user.name) {
      const userInfo = await userModel.getUserByName(user.name);
      if (userInfo) {
        ctx.body = {
          success: false,
          info: '用户已存在！'
        }
      } else {
        // 密码加密
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
        await userModel.createUser(user)
        const newUser = await userModel.getUserByName(user.name)

        // 签发token
        const userToken = {
          name: newUser.user_name,
          id: newUser.id
        }
        const token = jwt.sign(userToken, secret, {expiresIn: '1h'})
        console.log("token: " + token)
        ctx.body = {
          success: true,
          token: token // 返回token
        }
      }
    } else {
      ctx.body = {
        success: false,   // success标志位是方便前端判断返回是正确与否
        info: '参数错误！'
      }
    }
  }

  /**
   * 登录
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async postLogin (ctx) {
    const data = ctx.request.body      // post过来的数据存在request.body里
    const userInfo = await userModel.getUserByName(data.name)

    if (userInfo) {
      if (bcrypt.compareSync(data.password, userInfo.password)) {  //如果密码正确
        // 用户token
        const userToken = {
          name: userInfo.user_name,
          id: userInfo.id
        }
        const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  // 签发token
        ctx.body = {
          success: true,
          token: token // 返回token
        }
      } else {
        ctx.body = {
          success: false,
          info: '用户名或密码错误！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        info: '该用户不存在！'
      }
    }
  }
}

module.exports = UserController


/*
const getUserInfo = async (ctx) => {

  // console.log(ctx.params)
  const id = ctx.params['id'];                  // 获取url里传过来的参数里的id
  // console.log(id)
  const result = await userModel.getUserById(id);    // 通过异步查询地返回查询结果
  ctx.body  = result;                        // 将请求的结果放到response的body里返回
}


const postUserAuth = async (ctx) => {
  const data = ctx.request.body;      // post过来的数据存在request.body里
  console.log(data);
  const userInfo = await userModel.getUserByName(data.name);

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
      const token = jwt.sign(userToken, secret); // 签发token
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

*/
