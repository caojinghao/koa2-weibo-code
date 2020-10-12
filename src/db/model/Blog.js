/*
 * @Author: your name
 * @Date: 2020-10-12 10:24:23
 * @LastEditTime: 2020-10-12 10:26:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/src/db/model/Blog.js
 */
/**
 * @description 微博数据模型
 * @author Kevin
 */

const seq = require('../seq')
const {STRING,INTEGER,TEXT} = require('../types')
const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        comment: '图片地址'
    }
})

module.exports = Blog



