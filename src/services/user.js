/*
 * @Author: your name
 * @Date: 2020-09-15 15:41:11
 * @LastEditTime: 2020-09-30 14:50:54
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
const {addFollower} = require('./user-relation')
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
    const data = result.dataValues
    // 自己关注自己
    addFollower(data.id,data.id)

    return data
}
/**
 * @description: 删除用户
 * @param {type} 
 * @return {type} 
 */
async function deleteUser(userName){
    const result = await User.destroy({
        where:{
            userName
        }
    })
    return result>0
}
/**
 * @description: 更新用户信息
 * @param {Object}  要修改的内容 {newPassword,newNickname, newPicture, newCity}
 * @param {type} 查询条件{userName,password}
 * @param {type} 
 * @return {type} 
 */
async function updateUser(
    {newPassword,newNickname, newPicture, newCity},
    {userName,password}
){
// 拼接修改内容
    const updateData = {}
    if(newPassword){
        updateData.password=newPassword
    }
    if(newNickname){
        updateData.nickName=newNickname
    }
    if(newPicture){
        updateData.picture=newPicture
    }
    if(newCity){
        updateData.city=newCity
    }
    
    //查询条件
    const whereData = {
        userName
    }
    if(password){
        whereData.password = password
    }
    // 执行修改
    const result = await User.update(updateData,{
        where:whereData
    })
    return result[0]>0 //修改的行数 


}
    
module.exports = {
    getUserInfo,createUser,deleteUser,updateUser
}
