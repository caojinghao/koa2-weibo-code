/*
 * @Author: your name
 * @Date: 2020-10-12 11:45:08
 * @LastEditTime: 2020-10-12 12:09:52
 * @LastEditors: Please set LastEditors
 * @Description: 首页 api 路由
 * @FilePath: /code-demo/koa2-weibo-code/src/routes/api/blog-home.js
 */

const router = require('koa-router')()
const {create} = require('../../controller/blog-home')
const userValidate =require('../../validator/user')
const {genValidator} = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const {loginCheck} = require('../../middlewares/loginChecks')

 
router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, async (ctx, next) =>{
    const {content,image} = ctx.request.body
    const {id:userId} = ctx.session.userInfo
    ctx.body = await create({userId,content,image})
})

module.exports = router


