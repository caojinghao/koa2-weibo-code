/*
 * @Author: your name
 * @Date: 2020-10-12 11:54:34
 * @LastEditTime: 2020-10-12 12:03:41
 * @LastEditors: Please set LastEditors
 * @Description:    微博 service
 * @FilePath: /code-demo/koa2-weibo-code/src/services/blog.js
 */

const {Blog} = require('../db/model/index')

/**
 * @description: 创建微博
 * @param {type} 
 * @return {type} 
 */

async function createBlog({userId,content,image}){
    const result= await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

module.exports = {
    createBlog
}


