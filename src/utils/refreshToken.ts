// src/utils/refreshToken.ts
import axios, { AxiosRequestConfig } from 'axios';
import cookie from 'react-cookies';
import { history } from '@umijs/max';
import { getAccessToken } from '@/services/y2/api';
import { clearAllCookies } from './common';

// 全局刷新锁
let refreshTokenPromise: Promise<any> | null = null;

/**
 * 处理 access_token 过期（code === 40013）
 * @param originalRequest 原始请求配置
 * @returns 重试后的响应 Promise
 */
export function handleTokenExpired(originalRequest: AxiosRequestConfig): Promise<any> {
  // 如果已有刷新任务，直接等待它完成，然后使用新 token 重试原始请求
  if (refreshTokenPromise) {
    return refreshTokenPromise.then(() => {
        const newToken = cookie.load('access_token');
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        // 重试时跳过进度条（可选）
        return axios(originalRequest);
    });
  }

  // 发起新的刷新任务
  refreshTokenPromise = getAccessToken().then((tokenRes: any) => {
        const { access_token } = tokenRes;
        // 保存 token（区分 localhost 和域名）
        const hostname = window.location.hostname;
        if (hostname.startsWith('localhost')) {
            cookie.save('access_token', access_token, { path: '/' });
        } else {
            const domain = hostname.slice(hostname.indexOf('.')); // 如 ".example.com"
            cookie.save('access_token', access_token, { domain, path: '/' });
        }
        // 重试原始请求
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
        return axios(originalRequest);
    }).catch((err) => {
        // 刷新失败，清理所有 cookie，跳转登录
        clearAllCookies();
        const loginPath = '/user/signIn';
        // 保留原始页面 URL 用于登录后跳转
        history.push(`${loginPath}`);
        // 继续抛出错误，让上层捕获
        return Promise.reject(err);
    }).finally(() => {
        // 无论成功失败，清除锁，使得后续过期请求能重新发起刷新
        refreshTokenPromise = null;
    });
    return refreshTokenPromise;
}