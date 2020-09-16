/*
 * @Author: your name
 * @Date: 2020-09-15 15:41:11
 * @LastEditTime: 2020-09-16 11:12:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/src/services/user.js
 */

/**
 * @description user service
 * @author Kevin
 */

const {User} = require('../db/model/index')
const {formatUser} = require('./_format')
/**
 * @description: 获取用户信息
 * @param {string}  userName 用户名
 * @return {string} password 密码
 */

async function getUserInfo(userName,password){
    // 查询条件
    const whereOpt ={
        userName
    }
    if(password){
        Object.assign(whereOpt,{password})
    }
    //    查询
    const result = await User.findOne({
        attributes:['id','userName','nickName','picture','city'],
        where:whereOpt
    })
    if(result == null){
        return result
    }
    // 格式化
    const formatRes = formatUser(result.dataValues)
    return formatRes
}

/**
 * @description: 
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} nickName 昵称
 * @param {number} gender 性别（1，2，3）
 */
async function createUser({userName,password,gender=3,nickName}){
    const result = await User.create({
        userName,
        password,
        nickName:nickName?nickName:userName,
        gender
    })
    return result.dataValues
}
    
module.exports = {
    getUserInfo,createUser
}
