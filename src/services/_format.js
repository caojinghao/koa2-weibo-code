/*
 * @Author: Kevin
 * @Date: 2020-09-15 16:44:44
 * @LastEditTime: 2020-09-15 17:10:58
 * @LastEditors: Please set LastEditors
 * @Description: 数据格式化
 * @FilePath: /code-demo/koa2-weibo-code/src/services/_format.js
 */
const { DEFAULT_PICTURE } = require('../conf/constant')
/**
 * @description: 用户默认头像
 * @param {Object}}  obj 用户对象
 */ 
function _formatUserPicture(obj){
    if(obj.picture ==null){
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}
/**
 * @description: 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象 
 */
function formatUser(list){
    if(!list){
        return list
    }
    if(list instanceof Array){
        return list.map(_formatUserPicture)
    }
    // 单个对象
    return _formatUserPicture(list)
}
module.exports= {
    formatUser
}
