
/**
 * @description user API 路由
 * @author Kevin
 */
const router = require('koa-router')()
const {isExist,register,login,deleteCurUser} = require('../../controller/user')
const userValidate =require('../../validator/user')
const {genValidator} = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const {loginCheck} = require('../../middlewares/loginChecks')

 
router.prefix('/api/user')

// 注册路由
router.post('/register',genValidator(userValidate),async(ctx,next)=>{
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
//登录
router.post('/login',async(ctx,next)=>{
    const {userName,password,gender} = ctx.request.body
    // controller
    ctx.body = await login(ctx,userName,password)
})
// 删除当前 
router.post('/delete',loginCheck,async(ctx,next)=>{
    if(isTest){
        // 测试账号删除自己
        const {userName} = ctx.session.userInfo
        ctx.body=await deleteCurUser(userName)
    }
})
module.exports = router

