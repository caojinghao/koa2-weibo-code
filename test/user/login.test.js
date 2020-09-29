/*
 * @Author: Kevin
 * @Date: 2020-09-29 14:53:00
 * @LastEditTime: 2020-09-29 16:25:30
 * @LastEditors: Please set LastEditors
 * @Description: api user yesy
 * @FilePath: /code-demo/koa2-weibo-code/test/user/login.test.js
 */

const server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName:userName,
    gender:1
}

// 存储 cookie
let COOKIE = ''

// 注册
test('注册一个用户，应该成功',async()=>{
    const res = await server
        .post('/api/user/register')
        .send(testUser)

    expect(res.body.errno).toBe(0)
})
// 重复注册
test('重复注册用户，应该失败',async()=>{
    const res = await server
        .post('/api/user/register')
        .send(testUser)

    expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询用户存在,应该存在',async()=>{
    const res = await server
        .post('/api/user/isExist')
        .send({userName})

    expect(res.body.errno).toBe(0)
})


// JSON schema 检测
test('json schema 检测，非法格式，注册应该失败',async()=>{
    const res =await server
        .post('/api/user/register')
        .send({
            userName:'123',
            password:'a',
            gender:'mail'
        })
    expect(res.body.errno).not.toBe(0)
})

// 登录
test('登录,应该成功',async()=>{
    const res = await server
        .post('/api/user/login')
        .send({userName,password})

    expect(res.body.errno).toBe(0)
    // 获取 cookie
    COOKIE =res.headers['set-cookie'].join(';')
})

// 删除
test('删除用户,应该成功',async()=>{
    const res = await server
        .post('/api/user/delete')
        .set('cookie',COOKIE)
    expect(res.body.errno).toBe(0)
})

// 再次查询用户，应该不存在
test('再次查询用户，应该不存在',async()=>{
    const res = await server
        .post('/api/user/isExist')
        .send({userName})

    expect(res.body.errno).not.toBe(0)
})