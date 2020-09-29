
/**
 * @description json test
 * @author Kevin
 */

const {User} = require('../../src/db/model/index')
test('User 模型各个属性，符合预期',async () =>{
    const user =User.build({
        userName:'zhangsan',
        password:'p123123',
        nickName:'张三',
        gender:3,
        picture:'/XXX.png',
        city:'北京'
    })
    //验证各个属性
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('p123123')
    expect(user.nickName).toBe('张三')
    expect(user.gender).toBe(3)
    expect(user.picture).toBe('/XXX.png')
    expect(user.city).toBe('北京')
})

