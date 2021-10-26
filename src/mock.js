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

//////////////// 菜单管理 ////////////////

Mock.mock('/system/menu/list', 'get', () => {
    let menus = [
        {
            "id": 1,
            "created": "2021-01-15T18:58:18",
            "updated": "2021-01-15T18:58:20",
            "status": 1,
            "parentId": 0,
            "name": "系统管理",
            "path": "",
            "perms": "system:manager",
            "component": "",
            "type": 0,
            "icon": "el-icon-s-operation",
            "sort": 1,
            "children": [
                {
                    "id": 2,
                    "created": "2021-01-15T19:03:45",
                    "updated": "2021-01-15T19:03:48",
                    "status": 1,
                    "parentId": 1,
                    "name": "用户管理",
                    "path": "/system/user",
                    "perms": "system:user:list",
                    "component": "views/sys/SysUser",
                    "type": 1,
                    "icon": "el-icon-s-custom",
                    "sort": 1,
                    "children": [
                        {
                            "id": 9,
                            "created": "2021-01-17T21:48:32",
                            "updated": null,
                            "status": 1,
                            "parentId": 2,
                            "name": "添加用户",
                            "path": null,
                            "perms": "system:user:save",
                            "component": null,
                            "type": 2,
                            "icon": null,
                            "sort": 1,
                            "children": []
                        },
                        {
                            "id": 10,
                            "created": "2021-01-17T21:49:03",
                            "updated": "2021-01-17T21:53:04",
                            "status": 1,
                            "parentId": 2,
                            "name": "修改用户",
                            "path": null,
                            "perms": "system:user:update",
                            "component": null,
                            "type": 2,
                            "icon": null,
                            "sort": 2,
                            "children": []
                        },
                        {
                            "id": 11,
                            "created": "2021-01-17T21:49:21",
                            "updated": null,
                            "status": 1,
                            "parentId": 2,
                            "name": "删除用户",
                            "path": null,
                            "perms": "system:user:delete",
                            "component": null,
                            "type": 2,
                            "icon": null,
                            "sort": 3,
                            "children": []
                        },
                        {
                            "id": 12,
                            "created": "2021-01-17T21:49:58",
                            "updated": null,
                            "status": 1,
                            "parentId": 2,
                            "name": "分配角色",
                            "path": null,
                            "perms": "system:user:role",
                            "component": null,
                            "type": 2,
                            "icon": null,
                            "sort": 4,
                            "children": []
                        },
                        {
                            "id": 13,
                            "created": "2021-01-17T21:50:36",
                            "updated": null,
                            "status": 1,
                            "parentId": 2,
                            "name": "重置密码",
                            "path": null,
                            "perms": "system:user:repass",
                            "component": null,
                            "type": 2,
                            "icon": null,
                            "sort": 5,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 3,
                    "created": "2021-01-15T19:03:45",
                    "updated": "2021-01-15T19:03:48",
                    "status": 1,
                    "parentId": 1,
                    "name": "角色管理",
                    "path": "/system/role",
                    "perms": "system:role:list",
                    "component": "views/sys/SysRole",
                    "type": 1,
                    "icon": "el-icon-rank",
                    "sort": 2,
                    "children": []
                },

            ]
        },
        {
            "id": 5,
            "created": "2021-01-15T19:06:11",
            "updated": null,
            "status": 1,
            "parentId": 0,
            "name": "系统工具",
            "path": "",
            "perms": "system:tools",
            "component": null,
            "type": 0,
            "icon": "el-icon-s-tools",
            "sort": 2,
            "children": [
                {
                    "id": 6,
                    "created": "2021-01-15T19:07:18",
                    "updated": "2021-01-18T16:32:13",
                    "status": 1,
                    "parentId": 5,
                    "name": "数字字典",
                    "path": "/system/dict",
                    "perms": "system:dict:list",
                    "component": "views/sys/SysDict",
                    "type": 1,
                    "icon": "el-icon-s-order",
                    "sort": 1,
                    "children": []
                }
            ]
        }
    ]

    Result.data = menus

    return Result
})

Mock.mock(RegExp('/system/menu/info/*'), 'get', () => {

    Result.data = {
        "id": 3,
        "status": 1,
        "parentId": 1,
        "name": "角色管理",
        "path": "/system/role",
        "perms": "system:role:list",
        "component": "views/sys/SystemRole",
        "type": 1,
        "icon": "el-icon-rank",
        "sort": 2,
        "children": []
    }

    return Result
})


Mock.mock(RegExp('/sys/menu/*'), 'post', () => {

    return Result
})

//////////////// 角色管理 ////////////////

Mock.mock(RegExp('/system/role/list*'), 'get', () => {

    Result.data = {
        "records": [
            {
                "id": 3,
                "created": "2021-01-04T10:09:14",
                "updated": "2021-01-30T08:19:52",
                "status": 1,
                "name": "普通用户",
                "code": "normal",
                "remark": "只有基本查看功能",
                "menuIds": []
            },
            {
                "id": 6,
                "created": "2021-01-16T13:29:03",
                "updated": "2021-01-17T15:50:45",
                "status": 1,
                "name": "超级管理员",
                "code": "admin",
                "remark": "系统默认最高权限，不可以编辑和任意修改",
                "menuIds": []
            }
        ],
        "total": 2,
        "size": 10,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "hitCount": false,
        "countId": null,
        "maxLimit": null,
        "searchCount": true,
        "pages": 1
    }

    return Result

})

Mock.mock(RegExp('/system/role/info/*'), 'get', () => {

    Result.data = {
        "id": 6,
        "created": "2021-01-16T13:29:03",
        "updated": "2021-01-17T15:50:45",
        "status": 1,
        "name": "超级管理员",
        "code": "admin",
        "remark": "系统默认最高权限，不可以编辑和任意修改",
        "menuIds": [3]
    }

    return Result
})

Mock.mock(RegExp('/system/role/*'), 'post', () => {

    return Result
})

//////////////// 用户管理 ////////////////

Mock.mock(RegExp('/system/user/list*'), 'get', () => {
    Result.data = {
        "records": [
            {
                "id": 1,
                "created": "2021-01-12T22:13:53",
                "updated": "2021-01-16T16:57:32",
                "status": 1,
                "username": "admin",
                "password": "$2a$10$R7zegeWzOXPw871CmNuJ6upC0v8D373GuLuTw8jn6NET4BkPRZfgK",
                "avatar": "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg",
                "email": "123@qq.com",
                "city": "广州",
                "lastLogin": "2020-12-30T08:38:37",
                "roles": [
                    {
                        "id": 6,
                        "created": "2021-01-16T13:29:03",
                        "updated": "2021-01-17T15:50:45",
                        "status": 1,
                        "name": "超级管理员",
                        "code": "admin",
                        "remark": "系统默认最高权限，不可以编辑和任意修改",
                        "menuIds": []
                    },
                    {
                        "id": 3,
                        "created": "2021-01-04T10:09:14",
                        "updated": "2021-01-30T08:19:52",
                        "status": 1,
                        "name": "普通用户",
                        "code": "normal",
                        "remark": "只有基本查看功能",
                        "menuIds": []
                    }
                ]
            },
            {
                "id": 2,
                "created": "2021-01-30T08:20:22",
                "updated": "2021-01-30T08:55:57",
                "status": 1,
                "username": "test",
                "password": "$2a$10$0ilP4ZD1kLugYwLCs4pmb.ZT9cFqzOZTNaMiHxrBnVIQUGUwEvBIO",
                "avatar": "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg",
                "email": "test@qq.com",
                "city": null,
                "lastLogin": null,
                "roles": [
                    {
                        "id": 3,
                        "created": "2021-01-04T10:09:14",
                        "updated": "2021-01-30T08:19:52",
                        "status": 1,
                        "name": "普通用户",
                        "code": "normal",
                        "remark": "只有基本查看功能",
                        "menuIds": []
                    }
                ]
            }
        ],
        "total": 2,
        "size": 10,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "hitCount": false,
        "countId": null,
        "maxLimit": null,
        "searchCount": true,
        "pages": 1
    }

    return Result
})


Mock.mock(RegExp('/system/user/*'), 'post', () => {
    return Result
})

Mock.mock(RegExp('/system/user/info/*'), 'get', () => {

    Result.data = {
        "id": 2,
        "created": "2021-01-30T08:20:22",
        "updated": "2021-01-30T08:55:57",
        "status": 1,
        "username": "test",
        "password": "$2a$10$0ilP4ZD1kLugYwLCs4pmb.ZT9cFqzOZTNaMiHxrBnVIQUGUwEvBIO",
        "avatar": "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg",
        "email": "test@qq.com",
        "city": null,
        "lastLogin": null,
        "roles": []
    }
    return Result
})



