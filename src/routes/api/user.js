/*
 * @Author: your name
 * @Date: 2020-09-15 15:27:04
 * @LastEditTime: 2020-09-16 11:32:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/src/routes/api/user.js
 */
/**
 * @description user API 路由
 * @author Kevin
 */
const router = require('koa-router')()
const {isExist,register} = require('../../controller/user')

 
router.prefix('/api/user')

// 注册路由
router.post('/register',async(ctx,next)=>{
    const {userName,password,gender} = ctx.request.body
    // 调用controller
    ctx.body = await register({
        userName,password,gender
    })
})

// 用户名是否存在
router.post('/isExist',async(ctx,next)=>{
    const {userName} = ctx.request.body
    // controller
    ctx.body = await isExist(userName)
})

module.exports = router

