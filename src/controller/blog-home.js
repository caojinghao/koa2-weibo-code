/*
 * @Author: your name
 * @Date: 2020-10-12 11:53:02
 * @LastEditTime: 2020-10-12 14:50:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/src/controller/blog-home.js
 */
const xss = require('xss')
const {createBlog} = require('../services/blog')
const { SuccessModel,ErrorModel }=require('../model/ResModel')
const {
    createBlogFailInfo
} = require('../model/ErrorInfo')


/**
 * @description: 
 * @param {type} 
 * @return {type} 
 */


 
async function create({userId,content,image}){
    // service
    try {
        // 创建微博
        const blog = await createBlog({
            userId,
            content:xss(content),
            image
        })
        return new SuccessModel(blog)
        
    } catch (error) {
        console.error(ex.message,ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }

}
module.exports= {
    create
}





