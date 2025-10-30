import { RequestConfig,history } from "@umijs/max";
import axios from "axios";
import cookie from 'react-cookies';
import { getAccessToken } from '@/services/y2/api';
import { message } from "antd";
// 进度条提示
import NProgress from "nprogress";
// 配置NProgress
NProgress.configure({ showSpinner: false }) // 是否显示右上角螺旋加载提示

const loginPath = '/user/signIn';

// 与后端约定的响应数据格式
interface ResponseStructure {
    code: number;
    data: any;
    errorCode?: number;
    errorMessage?: string;
}
  
// 全局计数器
let requestCount = 0;
// 启动进度条
const startProgress = () => {
    if (requestCount === 0) {
        NProgress.start(); // 只有当计数器为 0 时才启动进度条
    }
    requestCount++;
};
// 结束进度条
const endProgress = () => {
requestCount--;
if (requestCount === 0) {
    NProgress.done(); // 只有当计数器回到 0 时才关闭进度条
}
};

let isMessageShown = false;
const showErrorMessage = () => {
if (!isMessageShown) {
    message.error("网络错误，请稍后处理");
    isMessageShown = true;

    // 5秒后允许再次提示
    setTimeout(() => {
    isMessageShown = false;
    }, 5000);
}
};

// 请求封装
export const requestConfig: RequestConfig = {
    timeout: 60000, //默认超时时间 超时处理，请求超过1分钟，取消请求
    // 错误统一处理
    errorConfig: {
        // 抛出错误
        errorThrower: (res: any) => {
        if (!res) throw new Error('空响应');
        },
        // 错误接收及处理
        errorHandler(error: any, opts: any) {
            endProgress();
            // 处理网络错误和超时
            if (error.config?.retryOnError && (error.code === 'ECONNABORTED' || !navigator.onLine)) {
                return new Promise((resolve, reject) => {
                let retryCount = 0;
                const maxRetries = 3;
                const retryRequest = () => {
                    if (retryCount >= maxRetries) {
                    showErrorMessage(); // 使用节流提示
                    return reject(error);
                    }
                    retryCount++;
                    setTimeout(() => {
                    axios.request(error.config)
                        .then(response => resolve(response))
                        .catch(() => retryRequest());
                    }, Math.min(1000 * Math.pow(2, retryCount), 10000));
                };
                retryRequest();
                });
            }
            return error;
        },
    },
    // 请求拦截器
    requestInterceptors: [
        (config: any) => {
        // 根据接口URL设置不同的超时时间
        if(config.url === '/api/ApiTemplate/file_list'){
            config.timeout = 300000;
        }else{
            config.timeout = 60000;
        }
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 8;
        let result = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        if(config.method == "post"){
            config.url = config.url+"?__trackId__="+result
            // config.url = config.url
        }

        if (!config.skipAuthRefresh) {
            startProgress(); // 启动进度条
        }
        // 在请求拦截器中带token（除登录接口）
        const token = cookie.load("token")
        // console.log(config)
        if (token && config.url != loginPath){
            config.headers['token'] = token;
            // 携带access_token
            config.headers['Authorization'] = 'Bearer ' + cookie.load("access_token");
        }
        return config;
        },
    ],
    // 响应拦截器
    responseInterceptors: [
        // access_token 过期
        (res:any) =>{

        if(!res.data){
            const error = new Error('Empty response data');
            return error
        }

        endProgress();
        // 过滤
        if(res.config.url == "/Oauth2/gettoken"){
            return res
        }
        let test = window.location.hostname.slice(window.location.hostname.indexOf("."))
        // access_token过期
        if(res.data.code==40013){
            getAccessToken().then(res => {
            if(window.location.hostname.startsWith("localhost")){
                cookie.save("access_token",res.access_token,{path:"/"})
            }else{
                cookie.save('access_token', res.access_token, { domain:test,path: '/' });
            }
            }).catch((err) => { 
            console.log(err)
            });
        }else if(res.data.code==1001){
            // token过期
            sessionStorage.removeItem("domain")
            cookie.remove("token",{ domain:test,path: '/' })
            cookie.remove("token",{ path: '/' })
            history.push(loginPath);
        }else if(res.data.code>2000){
            message.error(res.data.msg);
            // console.log(res)
        }else{
            return res;
        }
        },
    ],
}