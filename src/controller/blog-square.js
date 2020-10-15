/*
 * @Author: your name
 * @Date: 2020-10-14 18:00:37
 * @LastEditTime: 2020-10-15 16:35:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/src/controller/blog-square.js
 */
/**
 * @description 广场页 controller
 * @author 双越老师
 */

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')

/**
 * 获取广场的微博列表
 * @param {number} pageIndex pageIndex
 */
async function getSquareBlogList(pageIndex = 0) {
    const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
    const blogList = result.blogList

    // 拼接返回数据
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = { 
    getSquareBlogList
}