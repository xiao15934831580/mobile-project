import http from './request'

export const login = (data) => {
    return http({
        url: '/system/login',
        method: 'POST',
        data
    })
}
export const loginOut = () => {
    return http({
        url: '/system/logout',
        method: 'POST',
    })
}
// 用户管理
/**
 * 获取用户数据
 * @param {*} params 
 * @returns 
 */
export const getAllUserInfo = (params) => {
    return http({
        url: `/getAllUserInfo/${params.pageNum}/${params.limit}`,
        method: 'GET',
    })
}
/**
 * 保存用户数据
 * @returns 
 */
export const saveOrUpdateUser = (data) => {
    return http({
        url: '/saveOrUpdateUser',
        method: 'POST',
        data
    })
}
/**
 * 修改用户密码
 * @returns 
 */
 export const resetPassword = (data) => {
    return http({
        url: '/resetPassword',
        method: 'POST',
        data
    })
}
export const updatePassword = (data) => {
    return http({
        url: '/updatePassword',
        method: 'POST',
        data    
    })
}

/**
 * 查询用户信息
 * @param {*} pageNum： 当前页数 
 * @param {*} limit 显示条数 
 * @param {*} query 查询条件，支持模糊查询 
 */
 export const queryUser = (params) => {
    return http({
        url: '/queryUser',
        method: 'GET',
        params
    })
}
/**
 * 删除用户
 * @param {*} userId 当前用户
 */
 export const deleteUser = (userId) => {
    return http({
        url: `/deleteUser/${userId}`,
        method: 'POST',
    })
}
/**
 * 获取当前用户信息
 */
 export const getUserInfo = () => {
    return http({
        url: '/getUserInfo',
        method: 'GEt',
    })
}

/***************角色模块********************** */
/**
 * 删除角色
 * @param roleId 角色id
 */
 export const deleteRole = (roleId) => {
    return http({
        url: `/sysRole/delete/${roleId}`,
        method: 'POST',
    })
}

/***
 * 获取所有的角色
 * @param limit 显示条数
 * @param pageNum 当前页数
 */
 export const getAllRole = (params) => {
    return http({
        url: `/sysRole/getAllRole/${params.pageNum}/${params.limit}`,
        method: 'POST',
    })
}
/***
 * 保存角色信息
 */
 export const saveOrUpdate = (data) => {
    return http({
        url: '/sysRole/saveOrUpdate',
        method: 'POST',
        data
    })
}
