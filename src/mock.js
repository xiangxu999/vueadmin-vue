// 引入mockjs
const Mock = require('mockjs')
const Random = Mock.Random
let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}
/**
 * Mock.mock( url, post/get , function(options))；
 * url 表示需要拦截的 URL，
 * post/get 需要拦截的 Ajax 请求类型
 *
 * 用于生成响应数据的函数
 */



// 获取验证码图片base64编码以及一个随机码
Mock.mock('/captcha', 'get', () => {
    Result.data = {
        token: Random.string(32), // 获取一个32位的随机字符串,
        captchaImg: Random.dataImage( "120x40", "P74NG" ) //生成验证码为11111的base64图片编码
    }
    return Result
})


Mock.mock('/login', 'post', () => {
    // 无法在header中传入参数jwt

    return Result
})