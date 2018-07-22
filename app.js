const Koa = require('koa')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const koaJwt = require('koa-jwt')
const historyApiFallback = require('koa-history-api-fallback')
const router = require('./server/routers/index')
const err = require('./server/middleware/error')
const secret = require('./server/config/secret.json')
 
const app = new Koa()


app.use(err())
app.use(json())
app.use(logger())
app.use(bodyparser())


app.use(koaJwt({secret: secret.sign}).unless({path: [/^\/api\/login/, /^\/api\/signup/]}))

app
  .use(router.routes())
  .use(router.allowedMethods())


app.use(historyApiFallback())

app.listen(8889,() => {
  console.log('Koa is listening in 8889')
})

module.exports = app