import Cookies from 'js-cookie';
// token
const TokenKey = 'Admin-Token';
// user
const UserInfo = 'User-Info';
// page
const Page = 'Page-Info';

/*********************************  token操作  **************************/
/**
 * 获取 token
 * @returns 返回 token 值
 */
export function getToken() {
    return Cookies.get(TokenKey);
}

/**
 * 在 cookie 中 存储 token
 * @param {*} token
 */
export function setToken(token) {
    return Cookies.set(TokenKey, token, {
        expires: 7,
    });
}

/**
 * 移除 token
 */
export function removeToken() {
    return Cookies.remove(TokenKey);
}

/*********************************  user操作  **************************/
/**
 * 获取用户信息
 */
export function getUserInfo() {
    return JSON.parse(localStorage.getItem(UserInfo));
}

/**
 * 存储用户信息
 */
export function setUserInfo(info) {
    return localStorage.setItem(UserInfo, JSON.stringify(info));
}

/**
 * 移除用户信息
 */
export function removeUserInfo() {
    return localStorage.removeItem(UserInfo);
}

/*********************************  page页面信息  **************************/
let page = {};
/**
 * 获取用户信息
 */
export function getLocale() {
    if (
        JSON.parse(localStorage.getItem(Page)) &&
        JSON.parse(localStorage.getItem(Page)).locale
    )
        return JSON.parse(localStorage.getItem(Page)).locale;
}

/**
 * 存储用户信息
 */
export function setLocale(locale) {
    page.locale = locale;
    return localStorage.setItem(Page, JSON.stringify(page));
}
