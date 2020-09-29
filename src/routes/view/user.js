/*
 * @Author: your name
 * @Date: 2020-09-29 16:37:59
 * @LastEditTime: 2020-09-29 17:04:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/src/routes/view/user.js
 */
/**
 * @description user view 路由
 * @author Kevin
 */

const router = require('koa-router')()
const {loginRedirect} = require('../../middlewares/loginChecks')
router.prefix('/')
/**
 * @description: 获取登录信息
 * @param {type} ctx
 * @return {type} 
 */
function getLoginInfo(ctx){
    let data = {
        isLogin:false //默认未登录
    }

    const userInfo = ctx.session.userInfo
    if(userInfo){
        data={
            isLogin:true,
            userName:userInfo.userName
        }
    }
    return data
}

router.get('/login',async(ctx,next)=>{
    await ctx.render('login',getLoginInfo(ctx))
})

router.get('/register',async(ctx,next)=>{
    await ctx.render('register',getLoginInfo(ctx))
})
router.get('/setting',loginRedirect,async(ctx,next)=>{
    await ctx.render('setting',ctx.session.userInfo)
})
module.exports = router