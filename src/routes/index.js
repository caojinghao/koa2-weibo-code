/*
 * @Author: your name
 * @Date: 2020-09-08 16:40:06
 * @LastEditTime: 2020-09-16 17:11:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/src/routes/index.js
 */
const router = require('koa-router')()
const {loginRedirect,loginCheck} = require('../middlewares/loginChecks')

router.get('/',loginRedirect, async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        msg:'hello world',
        isMe:true,
        blogList:[
            {
                id:1,
                title:'aaa'
            },{
                id:2,
                title:'bbb'
            },{
                id:3,
                title:'ccc'
            },
        ]
    })
})
router.get('/profile/:userName', async (ctx, next) => {
    const session = ctx.session
    if(session.viewNum == null){
        session.viewNum = 0
    }
    session.viewNum ++
    const {userName} = ctx.params
    ctx.body = {
        title: 'this is profile page',
        userName,
        viewNum:session.viewNum
        
    }
})
router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
    const {userName,pageIndex} = ctx.params
    ctx.body = {
        title: 'this is loadMore page',userName,pageIndex
    }
})
module.exports = router
