/*
 * @Author: your name
 * @Date: 2020-10-12 11:09:52
 * @LastEditTime: 2020-10-12 11:35:04
 * @LastEditors: Please set LastEditors
 * @Description: 微博 view 路由
 * @FilePath: /code-demo/koa2-weibo-code/src/routes/view/blog.js
 */


const router = require('koa-router')()
const {loginRedirect} = require('../../middlewares/loginChecks')

// 首页
router.get('/',loginRedirect,async (ctx,next)=>{
    await ctx.render('index',{})
})

module.exports = router