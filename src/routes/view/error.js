/**
 * @description 404 error 路由
 * @author Kevin
 */

const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
    // throw Error()
    // ctx.body ={
    //     msg:'xxxx'
    // }
    await ctx.render('error')
})
router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router
