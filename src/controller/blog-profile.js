/*
 * @Author: your name
 * @Date: 2020-10-12 17:54:53
 * @LastEditTime: 2020-10-13 17:38:31
 * @LastEditors: Please set LastEditors
 * @Description:    个人主页
 * @FilePath: /code-demo/koa2-weibo-code/src/controller/blog-profile.js
 */
const { getBlogListByUser } = require('../services/blog')
const {PAGE_SIZE} = require('../conf/constant')
const { SuccessModel,ErrorModel }=require('../model/ResModel')



async function getProfileBlogList(userName,pageIndex = 0){
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize:PAGE_SIZE
    })
    const blogList = result.blogList
    // 拼接返回数据
    return new SuccessModel({
        isEmpty:blogList.length ===0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count:result.count
    })
}

module.exports = {
    getProfileBlogList
}

