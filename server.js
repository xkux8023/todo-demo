const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const koaJwt = require('koa-jwt');
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const historyApiFallback = require('koa-history-api-fallback');
const auth = require('./server/routers/auth.js');
const api = require('./server/routers/api.js');
 
const router = new Router();
const app = new Koa();

app.use(json());
app.use(logger());
app.use(bodyparser());





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



// 将路由规则挂载到Koa上。
app.use(router.routes());
// 静态文件serve在koa-router的其他规则之上 
// 将webpack打包好的项目目录作为Koa静态文件服务的目录

app.use(serve(path.join(__dirname, './dist')))



app.use(async (ctx, next) => {
  // ctx.body = 'hello koa2';
  let html = await fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8');
  ctx.body = html;
  let start = new Date;
  await next;
  let ms = new Date - start;
  console.log('%s %s - %s', ctx.request.method, ctx.request.url, ms); // 显示执行的时间
});

// app.use(serve(path.resolve('dist')));
app.use(historyApiFallback());

app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;