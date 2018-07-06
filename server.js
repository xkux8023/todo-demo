const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const koaJwt = require('koa-jwt');
const auth = require('./server/routers/auth.js');
const api = require('./server/routers/api.js');
 
const router = new Router();
const app = new Koa();

app.use(json());
app.use(logger());
app.use(bodyparser());

// 将路由规则挂载到Koa上。
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  // ctx.body = 'hello koa2';
  let start = new Date;
  await next;
  let ms = new Date - start;
  console.log('%s %s - %s', ctx.request.method, ctx.request.url, ms); // 显示执行的时间
});


// app.use(async (ctx, next) => {  //  如果JWT验证失败，返回验证失败信息
//   try {
//     await next;
//   } catch (err) {
//     if (401 == err.status) {
//       ctx.status = 401;
//       ctx.body = {
//         success: false,
//         token: null,
//         info: 'Protected resource, use Authorization header to get access'
//       };
//     } else {
//       throw err;
//     }
//   }
// });


app.use((ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
    } else {
      throw err;
    }
  });
});

app.on('error', function(err, ctx){
  console.log('server error', err);
});

// 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use('/auth', auth.routes()); 

// 所有走/api/打头的请求都需要经过jwt中间件的验证。secret密钥必须跟我们当初签发的secret一致
router.use("/api", koaJwt({secret: 'vue-koa-demo'}), api.routes())



app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;