/*
 * @Author: Kevin
 * @Date: 2020-09-15 17:16:43
 * @LastEditTime: 2020-09-15 18:09:58
 * @LastEditors: Please set LastEditors
 * @Description: res 的数据模型
 * @FilePath: /code-demo/koa2-weibo-code/src/model/ResModel.js
 */

/**
 * @description: 基础模块
 */ 
class BaseModel {
    constructor({errno,data, message}) {
        this.errno = errno
        if(data){
            this.data=data
        }
        if(message){
            this.message=message
        }
    }
}
/**
 * @description: 成功的数据模型
 */
class SuccessModel extends BaseModel {

    constructor(data={}) {
        super({
            errno:0,
            data
        })
    }
}
/**
 * @description: 失败的数据模型
 */
class ErrorModel extends BaseModel {
    constructor({errno, message}) {
        super({errno, message})
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
