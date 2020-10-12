/*
 * @Author: your name
 * @Date: 2020-09-29 16:37:59
 * @LastEditTime: 2020-10-12 14:53:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/src/validator/blog.js
 */
/**
 * @description 微博 数据格式校验
 * @author Kevin
 */

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
}

/**
 * 校验微博数据格式
 * @param {Object} data 微博数据
 */
function blogValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = blogValidate
