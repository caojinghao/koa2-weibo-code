/*
 * @Author: kevin
 * @Date: 2020-09-29 17:38:39
 * @LastEditTime: 2020-09-30 11:18:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/src/controller/utils.js
 */
const MIX_SIZE =1024*1024*1024
const {ErrorModel,SuccessModel} = require('../model/ResModel')
const {uploadFileSizeFailInfo} = require('../model/ErrorInfo')
const fse =require('fs-extra')
const path = require('path')
// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname,'..','..','uploadFiles')

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist =>{
    if(!exist){
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * @description: 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} filePath 文件路径
 */

async function saveFile({name,type,size,filePath}){
    if(size>MIX_SIZE){
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    // 移动文件
    const fileName = Date.now() + '.' + name //防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH,fileName)//目的地
    await fse.move(filePath,distFilePath)

    // 返回信息
    return new SuccessModel({
        url:'/'+fileName
    })
}

module.exports = {saveFile}

