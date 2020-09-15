/**
 * @description json test
 * @author Kevin
 */

const server = require('./server')
test('json 接口返回数据格式正确',async () =>{
    const res =await server.get('/users/bar')
    expect(res.body).toEqual({title:'this is a users/bar response'})
    expect(res.body.title).toBe('this is a users/bar response')
})

