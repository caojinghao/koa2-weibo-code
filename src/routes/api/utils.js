/*
 * @Author: Kevin
 * @Date: 2020-09-29 17:23:08
 * @LastEditTime: 2020-09-30 11:15:56
 * @LastEditors: Please set LastEditors
 * @Description: util api 路由
 * @FilePath: /code-demo/koa2-weibo-code/src/routes/api/utils.js
 */

const router = require('koa-router')()
const {loginCheck} = require('../../middlewares/loginChecks')
const koaForm = require('formidable-upload-koa')
const {saveFile} = require('../../controller/utils')

router.prefix('/api/utils')

// 上传图片/utils/upload
router.post('/upload',loginCheck,koaForm(),async(ctx,next)=>{
    const file = ctx.req.files['file']
    if (!file) {
        return
    }
    const {size,path,name,type} = file
    // controller
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath:path
    })
})

module.exports= router
