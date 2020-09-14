/**
 * @description 连接 redis 的方法 get set
 * @author Kevin
 */

const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

// 创建 redis 客户端

const redisClient =redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error',err=>{
    console.error('redis error',err)
})
/**
 * redis set
 * @param {string} key 
 * @param {string} val 
 * @param {nymber} timeout  过期时间
 */
// set
function set(key,val,timeout = 60 *60){
    if(typeof val ==='object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key,val)
    redisClient.expire(key,timeout)
}
/**
 * redis set
 * @param {string} key 
 */
// get
function get(key){
    const promise =new Promise((reslove,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
            if(val ==null){
                reslove(null)
                return
            }
            try{
                reslove(JSON.parse(val))
            } catch {
                reslove(val)
            }
        })
    })
    return promise

}


module.exports={set,get}



