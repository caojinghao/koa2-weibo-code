/**
 * @description 存储配置
 * @author Kevin
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'weibo_db'
}

MYSQL_CONF= {
    host:'39.105.198.228',
    user:'root',
    password:'123456',
    port:'3306',
    database:'weibo_db',
    useConnectionPooling: true,
}
if (isProd) {
    MYSQL_CONF= {
        host:'39.105.198.228',
        user:'root',
        password:'123456',
        port:'3306',
        database:'weibo_db',
        useConnectionPooling: true,
    }
    REDIS_CONF={
        port:6379,
        host:'127.0.0.1',
    }
    MYSQL_CONF.pool = {
        max:5, //最大连接数量
        min:0, // 最小连接
        idle:10000 //如果一个连接池10s内不被使用则被释放
    }
    
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}
