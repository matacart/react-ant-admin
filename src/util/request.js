import axios from 'axios';
import store from '../store/store';
import { getToken } from './auth';

const baseURL = {
    adminApi: 'https://api.handingyun.cn/y1',
    matacartApi: 'https://www.matacart.com',
};

const service = axios.create({
    // baseURL: '/adminApi',
    // baseURL: 'https://api.handingyun.cn/appstore/',

    timeout: 5000, // 请求等待时间，超时则中断。
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
    config => {
        const token = store.getState().user.token;

        if (token) {
            config.headers['X-Token'] = getToken();
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
    response => {
        // const res = response.data
        // // 成功码：0
        // if (res.code !== 0) {
        //     // Message({
        //     //     message: res.msg || 'Error',
        //     //     type: 'error',
        //     //     duration: 5 * 1000,
        //     // })
        //     if (
        //         res.code === 50008 ||
        //         res.code === 50012 ||
        //         res.code === 50014
        //     ) {
        //         // MessageBox.confirm(
        //         //     'You have been logged out, you can cancel to stay on this page, or log in again',
        //         //     'Confirm logout',
        //         //     {
        //         //         confirmButtonText: 'Re-Login',
        //         //         cancelButtonText: 'Cancel',
        //         //         type: 'warning',
        //         //     },
        //         // ).then(() => {
        //         //     store.dispatch('user/resetToken').then(() => {
        //         //         location.reload()
        //         //     })
        //         // })
        //     }
        //     return Promise.reject(new Error(res.message || 'Error'))
        // } else {
        //     return res
        // }
        return response;
    },
    error => {
        // console.log('err' + error)
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000,
        // })

        return Promise.reject(error);
    },
);

export default service;

export { baseURL };
