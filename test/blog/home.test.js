/*
 * @Author: your name
 * @Date: 2020-10-12 15:21:32
 * @LastEditTime: 2020-10-12 17:30:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /code-demo/koa2-weibo-code/test/blog/home.test.js
 */


const server = require('../server')
const {Z_COOKIE} = require('../testUserInfo')
let BLOG_ID = ''
// 存储 cookie

// 注册
test('创建一条微博，应该成功',async()=>{
    // 定义测试内容
    const content = '单元测试自动创建微博_' + Date.now()
    const image = '/xxx.png'
    // 开始测试
    const res = await server
        .post('/api/blog/create')
        .send({content,image})
        .set('Cookie',Z_COOKIE)

    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    // 记录微博 id
    BLOG_ID = res.body.data.id
})






