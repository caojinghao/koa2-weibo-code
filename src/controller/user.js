/**
 * @description user controller
 * @author Kevin
 */
 
const { getUserInfo } = require('../services/user')
const { SuccessModel,ErrorModel }=require('../model/ResModel')
const {
    registerUserNameNotExistInfo
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


module.exports = {
    isExist
}