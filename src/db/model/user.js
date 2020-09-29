/*
 * @Author: your name
 * @Date: 2020-09-15 14:46:17
 * @LastEditTime: 2020-09-16 18:17:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/src/db/model/user.js
 */
/**
 * @description 用户数据模型
 * @author Kevin
 */

const seq = require('../seq')
const {STRING,DECIMAL} = require('../types')

const User = seq.define('user',{
    userName:{
        type:STRING,
        allowNull:false,
        unique:true,
        comment:'用户名唯一'
    },
    password:{
        type:STRING,
        allowNull:false,
        comment:'密码'
    },
    nickName:{
        type:STRING,
        allowNull:false,
        comment:'昵称'
    },
    gender:{
        type:DECIMAL,
        allowNull:false,
        defaultValue:3,
        comment:'性别 (1 男，2 女，3 保密)'
    },
    picture:{
        type:STRING,
        comment:'图片头像地址'
    },
    city:{
        type:STRING,
        comment:'城市'
    }
})
module.exports=User