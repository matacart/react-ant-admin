import request, { baseURL } from '../util/request';

/**
 * 登录请求，获取 token
 * @param {*} data 登录参数
 */
export function login(data) {
    return request({
        url: baseURL.adminApi + '/ApiAppstore/newlogin',
        method: 'post',
        data,
    });
}

/**
 * 手机验证码请求
 */
export function getVerificationCode(
    base_name,
    queue_type = 'reg',
    area_code = '86',
    service = 'xht',
    from = 'matacart',
) {
    return request({
        url: baseURL.matacartApi + '/h-module-sendSmsCode.html',
        method: 'get',
        params: {
            base_name,
            queue_type,
            area_code,
            service,
            from,
        },
    });
}

/**
 * 注册请求
 */
export function signUp(data) {
    return request({
        url: baseURL.matacartApi + '/h-module-URegister.html',
        method: 'post',
        data,
    });
}

/**
 * 修改密码请求
 */
export function resetting(data) {
    return request({
        url: baseURL.matacartApi + '/h-module-UForgetPassword.html',
        method: 'post',
        data,
    });
}

/**
 * 获取用户基本信息
 * @param {String} token 身份鉴权
 */
export function getUserInfo(token) {
    return request({
        url: baseURL.adminApi + '/ApiAppstore/userInfo',
        method: 'get',
        params: {
            access_token: token,
        },
    });
}

/**
 * 退出登录
 */
export function logout() {
    return request({
        url: baseURL.adminApi + '/ApiAppstore/logout',
        method: 'post',
    });
}
