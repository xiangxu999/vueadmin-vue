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
        captchaImg: Random.dataImage("120x40", "P74NG") //生成验证码为11111的base64图片编码
    }
    return Result
})


Mock.mock('/login', 'post', () => {
    // 无法在header中传入参数jwt

    Result.code = 200
    Result.msg = "登录成果"

    return Result
})

Mock.mock('/sys/userInfo', 'get', () => {
    // 无法在header中传入参数jwt

    Result.data = {
        id: '1',
        userName: 'wxx',
        avatar: 'https://cdn.lixingyong.com/2021/01/15/QQ20210115152209.jpg'
    }

    return Result
})


Mock.mock('/logout', 'post', () => {
    return Result
})

Mock.mock('/system/menu/nav', 'get', () => {
    let nav = [
        {
            name: 'SysManager',
            title: '系统管理',
            icon: 'el-icon-s-operation',
            path: '/system/manager',
            component: '',
            children: [
                {
                    name: 'SysUser',
                    title: '用户管理',
                    icon: 'el-icon-s-custom',
                    path: '/system/user',
                    component: 'views/sys/SysUser',
                },
                {
                    name: 'SysRole',
                    title: '角色管理',
                    icon: 'el-icon-rank',
                    path: '/system/role',
                    component: 'views/sys/SysRole',
                },
                {
                    name: 'SysMenu',
                    title: '菜单管理',
                    icon: 'el-icon-menu',
                    path: '/system/menu',
                    component: 'views/sys/SysMenu',
                }
            ]
        },
        {
            name: 'SysTools',
            title: '系统工具',
            icon: 'el-icon-s-tools',
            path: '/system/tool',
            component: '',
            children: [
                {
                    name: 'SysDict',
                    title: '数字字典',
                    icon: 'el-icon-s-order',
                    path: '/system/dict',
                    component: 'views/sys/SysDict',
                }
            ]
        }
    ]
    let authorities = []

    Result.data = {
        nav: nav,
        authorities: authorities
    }


    return Result
})



