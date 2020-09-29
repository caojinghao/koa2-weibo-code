
/**
 * @description user controller
 * @author Kevin
 */
 
const { getUserInfo,createUser,deleteUser } = require('../services/user')
const { SuccessModel,ErrorModel }=require('../model/ResModel')
const doCrypto=require('../utils/cryp')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo
} = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName){
// 业务逻辑处理
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        //{erno:0,data:{...}}
        return new SuccessModel(userInfo)
    }else{
        //{erno:10003,message:'用户名未存在'}
        return new ErrorModel(registerUserNameNotExistInfo)

    }

// 调用 services 获取数据
// 统一返回格式
}
/**
 * @description: 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1，2，3）
 */
async function register({userName,password,gender}){
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        //用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    try{
        await createUser({
            userName,
            password:doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch(ex) {
        console.error(ex.message,ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * @description: 登录
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} ctx koa2 ctx
 */
async function login(ctx,userName,password){
    const userInfo = await getUserInfo(userName,doCrypto(password))
    if(!userInfo){
    // 登录失败
        return new ErrorModel(loginFailInfo)
    }
    //    登录成功
    if(ctx.session.userInfo== null){
        ctx.session.userInfo =userInfo
    }
    return new SuccessModel()

}
async function deleteCurUser(userName){
    const result = await deleteUser(userName)
    if(result){
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)

}

module.exports = {
    isExist,register,login,deleteCurUser
}