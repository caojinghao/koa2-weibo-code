/*
 * @Author: your name
 * @Date: 2020-09-29 16:37:59
 * @LastEditTime: 2020-10-12 10:29:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings EditBl
 * @FilePath: /code-demo/koa2-weibo-code/src/db/model/index.js
 */
/**
 * @description 数据模型入口文件
 * @author Kevin
 */
const User =require('./user')
const Blog =require('./Blog')

Blog.belongsTo(User,{
    foreignKey: 'userId'
})



module.exports={
    User,Blog
}

