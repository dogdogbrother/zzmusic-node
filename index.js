const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const parameter = require('koa-parameter')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./src/conf/db')
const { SESSION_SECRET_KEY } = require('./src/conf/secretKeys')
const routing = require('./src/routes')

const app = new Koa()

// session 配置
app.keys = [SESSION_SECRET_KEY] // keys是对客户端的cookie值进行加密的。 
app.use(session({
  key: 'zzmusic.sid', // cookie name 默认是 `zzmusic.sid` 开头
  prefix: 'zzmusic:sess:', // redis key 的前缀，默认是 `zzmusic:sess:` 开头
  cookie: {
    path: '/', // 指的是生成的cookie在所有目录都能访问
    httpOnly: true, // 只能服务端修改，客户端不能修改。就是你盗用了一个用户的cookie，却不能在另一个浏览器获取信息。
    maxAge: 30 * 24 * 60 * 60 * 1000  // 单位 ms。cookie过期时间。其实这里还有一个默认做法，就是把 session 的过期时间也设置为一致的了。 
  },
  store: redisStore({ // 把session的信息存到redis数据库中
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

app.use(bodyparser())
app.use(parameter(app))

routing(app)


app.listen(3009, () => {console.log('3009端口已经开启')})