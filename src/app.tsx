import { Footer, Question, SelectLang, AvatarDropdown, AvatarName } from '@/components';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
// import { errorConfig } from './requestErrorConfig';
import { currentUser as queryCurrentUser } from '@/services/y2/api';
import React from 'react';
import axios from 'axios';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/signIn';
import { message } from 'antd';
import { Ping } from './components/RightContent';
import access from './access';
import { Oauth2 } from '../config/myConfig'
import { getAccessToken } from '@/services/y2/api';
import type { RequestConfig } from '@umijs/max';
import { errorConfig } from './requestErrorConfig';
// 流程参考 https://www.bilibili.com/video/BV1yH4y1T7NW



// getInitialState 获取初始化状态
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  // fetchUserInfo    方法 从接口获取用户信息，没有则跳转登录页
  const fetchUserInfo = async () => {
    //调用(mock中的)接口获取用户信息
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data; // 返回用户信息
    } catch (error) {
      console.log(error);
      history.push(loginPath);
    }
    return undefined;
  };


  // access_token 初始化
  let access_token = localStorage.getItem('access_token')
  if (!access_token) {
    getAccessToken().then((res)=>{
      localStorage.setItem('access_token',res.access_token)
      // console.log(res)
    }).catch((err)=>{
      message.error(err.message)
    })
  }

  // 如果不是登录页面，执行
  const { location } = history;
  // 例如 访问/welcome
  if (location.pathname !== loginPath) {
    // currentUser 用户信息
    const currentUser = await fetchUserInfo(); // 调接口获取用户信息
    // history.push(loginPath);
    return {
      fetchUserInfo, // 方法
      currentUser, // { username: 'lizhi',age:18,avatar:"xxxx" }
      settings: defaultSettings as Partial<LayoutSettings>, // 右抽屉配置
    };
  }

  // 是登录页
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [
      <Question key="doc" />,
      <SelectLang key="SelectLang" />,
      <Ping key="Ping" />,
    ],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};





// 与后端约定的响应数据格式
interface ResponseStructure {
  code: number;
  data: any;
  errorCode?: number;
  errorMessage?: string;
}



// 请求封装
export const request: RequestConfig = {
  timeout: 60000, //超时处理，请求超过1分钟，取消请求

  // 错误统一处理
  errorConfig: {
    // 抛出错误
    errorThrower: (res:any) => {
      const { code, data, errorCode, errorMessage} =
        res as unknown as ResponseStructure;
        // access_token 过期
      if (code===40013) {
        const error: any = new Error(errorMessage);
        error.name = 'access_token_expires';
        error.info = { errorCode, errorMessage, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理 axios
    // errorHandler(error: any, opts: any) {
    //   // message.error("网络繁忙，请稍后再试");
    //   let access_token = ''
    //   if(error.name === 'access_token_expires'){
    //     getAccessToken().then((res:any)=>{
    //       access_token = res.data;
    //       localStorage.setItem('access_token',access_token)
    //     });
    //   console.log('重新获取access_token')
    //   message.error('access_token过期，请稍后再试');
    //   }


    errorHandler(error: any, opts: any) {
      // message.error("网络繁忙，请稍后再试");
      if(error.name === 'access_token_expires'){
          getAccessToken().then(res=>{
            let access_token = res.data.access_token;
            localStorage.setItem('access_token',access_token)
          }).catch((err)=>{console.log(err)})
      }
    },
  },


  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      // 在请求拦截器中带token（除登录接口）
      const token = localStorage.getItem('token')
      if (token && config.url != loginPath)
        config.headers['token'] = token;
      
      // 携带access_token
      config.headers['Authorization'] ='Bearer '+ localStorage.getItem('access_token') ;
      return config;
    },
    
  ],
  // 响应拦截器
  responseInterceptors: [
    (response: any) => response,
    // access_token 过期

  ],


};

