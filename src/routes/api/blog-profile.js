/*
 * @Author: your name
 * @Date: 2020-10-13 11:33:06
 * @LastEditTime: 2020-10-13 18:27:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/src/routes/api/blog-profile.js
 */
/**
 * @description 个人主页 API 路由
 * @author 双越老师
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
// const { follow, unFollow } = require('../../controller/user-relation')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, pageIndex)

    // 渲染为 html 字符串
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})


// // 关注
// router.post('/follow', loginCheck, async (ctx, next) => {
//     const { id: myUserId } = ctx.session.userInfo
//     const { userId: curUserId } = ctx.request.body
//     ctx.body = await follow(myUserId, curUserId)
// })

// // 取消关注
// router.post('/unFollow', loginCheck, async (ctx, next) => {
//     const { id: myUserId } = ctx.session.userInfo
//     const { userId: curUserId } = ctx.request.body
//     ctx.body = await unFollow(myUserId, curUserId)
// })

module.exports = router
