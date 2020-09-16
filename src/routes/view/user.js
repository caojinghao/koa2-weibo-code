/**
 * @description user view 路由
 * @author Kevin
 */

const router = require('koa-router')()
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
module.exports = router