const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const { isProd} = require('./utils/env')
const jwtKoa = require('koa-jwt')

const errViewRouter = require('./routes/view/error')
const index = require('./routes/index')
const users = require('./routes/users')


const {SECRET} = require('./conf/constant')
// error handler
let onerrorConf = {}
if(isProd){
    onerrorConf = {
        redirect:'/error'
    }
}

onerror(app,onerrorConf)
// jwt 验证
app.use(jwtKoa({
    secret:SECRET
}).unless({
    path:[/^\/users\/login/] //自定义哪些目录忽略jwt验证
}))


// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errViewRouter.routes(), errViewRouter.allowedMethods()) //404 路由注册最下面

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
