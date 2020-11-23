/*
 * @Author: your name
 * @Date: 2020-10-12 11:45:08
 * @LastEditTime: 2020-10-12 14:55:23
 * @LastEditors: Please set LastEditors
 * @Description: 首页 api 路由
 * @FilePath: /code-demo/koa2-weibo-code/src/routes/api/blog-home.js
 */

const router = require('koa-router')()
const {create} = require('../../controller/blog-home')
const blogValidate =require('../../validator/blog')
const {genValidator} = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const {loginCheck} = require('../../middlewares/loginChecks')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getBlogListStr } = require('../../utils/blog')


 
router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck,genValidator(blogValidate), async (ctx, next) =>{
    const {content,image} = ctx.request.body
    const {id:userId} = ctx.session.userInfo
    ctx.body = await create({userId,content,image})
})
/// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const { id: userId } = ctx.session.userInfo
    const result = await getHomeBlogList(userId, pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})



module.exports = router


