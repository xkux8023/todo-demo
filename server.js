const Koa = require('koa')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const koaJwt = require('koa-jwt')
const fs = require('fs')
const path = require('path')
const serve = require('koa-static')
const historyApiFallback = require('koa-history-api-fallback')
const router = require('./server/routers/index')
const secret = require('./server/middleware/getSecret')



const app = new Koa()
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  })
})



app.use(json())
app.use(logger())
app.use(bodyparser())

// 静态文件serve在koa-router的其他规则之上
// 将webpack打包好的项目目录作为Koa静态文件服务的目录
app.use(serve(path.join(__dirname, './dist')))
app.use(koaJwt({ secret: secret }).unless({ path: [/^\/api\/login/, /^\/api\/signup/] }))
app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(async (ctx, next) => {
  let html = await fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  ctx.body = html
})

app.use(historyApiFallback())

app.listen(8889,() => {
  console.log('Koa is listening in 8889')
})

module.exports = app
