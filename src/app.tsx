import { Footer, Question, SelectLang, AvatarDropdown, AvatarName } from '@/components';
import { GlobalOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';
import { ProLayout, type Settings as LayoutSettings } from '@ant-design/pro-components';
import { history,Link,RunTimeLayoutConfig,RequestConfig } from '@umijs/max';
import { getOptionType, getAccessToken, currentUser as queryCurrentUser, getShippingCourierList, currentUserStatus } from '@/services/y2/api';
import axios from 'axios';
import { Avatar, Flex, message } from 'antd';
import { Ping } from './components/RightContent';
import SelectDomain from './components/RightContent/SelectDomain';
import React, { useEffect, useState } from 'react';
// layout
import { FormattedMessage, useLocation } from 'umi';  //多语言
import cookie from 'react-cookies'
import { Provider } from 'mobx-react';
import store from './store/store'
import defaultSettings from '../config/defaultSettings';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/signIn';
// 在 app.tsx 文件顶部添加导入语句
// 进度条提示
import NProgress from "nprogress"; 
import "nprogress/nprogress.css";
import Header from './components/Header/Header';

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
      });
      return msg.data; // 返回用户信息
    } catch (error) {
      console.log(error);
      history.push(loginPath);
    }
    return undefined;
  };


  // access_token 初始化
  // let access_token = localStorage.getItem('access_token')
  let access_token = cookie.load('access_token')
  if (!access_token) {
    let test = window.location.hostname.slice(window.location.hostname.indexOf("."))
    getAccessToken().then((res) => {
      // localStorage.setItem('access_token', res.access_token)
      if(window.location.hostname.startsWith("localhost")){
        cookie.save("access_token",res.access_token,{path:"/"})
      }else{
        cookie.save("access_token",res.access_token,{domain:test,path:"/"})
      }
      // localStorage.setItem('access_token', res.access_token)
      // console.log(res)
    }).catch((err) => {
      message.error(err.message)
    })
  }

  // 如果不是登录 || 注册 || 重置 页面，执行
  const { location } = history;
  // 例如 访问/welcome
  console.log(location.pathname)
  if (location.pathname == loginPath || location.pathname == '/user/forget' || location.pathname == '/user/signUp') {
  }else{
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


// 语言
axios.post('/api/ApiAppstore/languages_select').then((res) => {
  if(res.data.code == 0){
    sessionStorage["languages"] = JSON.stringify(res.data.data)
  }
})
// 货币
axios.post('/api/ApiAppstore/currencies_select').then((res) => {
  if(res.data.code == 0){
    sessionStorage["currencies"] = JSON.stringify(res.data.data)
  }
})

// 运输承运商
axios.post('/api/ApiAppstore/shippingcourier_select').then((res) => {
  if(res.data.code == 0){
    sessionStorage["currency"] = JSON.stringify(res.data.data)
  }
})
// 国家
axios.post('/api/ApiAppstore/country_select').then((res) => {
  if(res.data.code == 0){
    sessionStorage["country"] = JSON.stringify(res.data.data)
  }
})
// 时区
axios.post('/api/ApiAppstore/timezones_select').then((res) => {
  if(res.data.code == 0){
    sessionStorage["timezones"] = JSON.stringify(res.data.data)
  }
})

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {

  const [domainStatus,setDomainStatus] = useState();

  const [layoutHeight,setLayoutHeight] = useState(60);
  
  useEffect(()=>{
    getOptionType().then((res:any)=>{
      if(res.code == 0){
        sessionStorage["productOptionType"] = JSON.stringify(res.data)
      }else{
        console.log("获取商品类型失败")
      }
    })
    currentUserStatus().then(res=>{
      setDomainStatus(res)
      console.log(res)
      if(res.code == 0){
        parseInt((res?.data.package.end_time*1000 - Date.now())/1000/60/60/24)>15?setLayoutHeight(60):setLayoutHeight(100);
        // domainStatus?.code == 1 ? 100:
      }else{
        setLayoutHeight(100);
      }
    })
  },[])

  const stores = window.location.pathname.slice(0,8)

  const location  = useLocation();
  console.log(location.pathname)
  
  return {
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: [
      // <Link key="openapi" to="/settings" target="_blank">
      //   <SettingOutlined />
      //   <span>设置</span>
      // </Link>,
      <Link key="openapi" to="/settings/index">
        <SettingOutlined />
        <span>
          <FormattedMessage id="settings.title"  />
        </span>
      </Link>,
    ],
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {/* {isDev && (
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
          )} */}
        </>
      );
    },
    // 默认配置应放在最前面防止覆盖
    
    // 默认布局调整
    waterMarkProps: {
      content: initialState?.currentUser?.name,
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
    // 修改菜单数据
    menuDataRender: (menuData) => {
      if(stores == "/stores/"){
        return menuData.filter(item => item.path == '/stores/create' || item.path == '/stores/merchantCertification' || item.path == '/stores/merchantApplication' || item.path == '/stores/list' || item.path == '/stores/bills' || item.path == '/stores/data' )
      }else{
        return menuData.filter(item => item.path !== '/stores/list' && item.path !== '/stores/bills' && item.path !== '/stores/data' )
      }
      // return (stores == "/stores/" ? [
      //   {
      //     path: '/stores/list',
      //     icon: <ShopOutlined />,
      //     name: '店铺管理',
      //   },
      //   {
      //     path: '/stores/bills',
      //     icon: <ProfileOutlined />,
      //     name: '账单管理',
      //   },
      //   {
      //     path: '/stores/data',
      //     icon: <DashboardOutlined />,
      //     name: '数据管理',
      //   }
      // ]:menuData)
    },
    // 
    headerRender: () => domainStatus && <Header stores={stores} initialState={initialState} domainStatus={domainStatus} />,
    ...initialState?.settings,
    token: {
      bgLayout: '#EAEDF1',
      header:{
        colorBgHeader: '#ffffff',
        heightLayoutHeader:layoutHeight,
      }, 
      sider:{
        colorBgMenuItemHover: '#f7f8fb',
        colorBgMenuItemSelected: '#f7f8fb'
      },
    }
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
  timeout: 10000, //超时处理，请求超过0.1分钟，取消请求
  // // 错误统一处理
  errorConfig: {
    // 抛出错误
    errorThrower: (res: any) => {
      // const { code, data, errorCode, errorMessage } =
      //   res as unknown as ResponseStructure;
      //   console.log(res);
      // // access_token 过期
      // if (data.code == 40013) {
      //   const error: any = new Error(errorMessage);
      //   error.name = 'access_token_expires';
      //   error.info = { errorCode, errorMessage, data };
      //   throw error; // 抛出自制的错误
      // }
    },
  //   // 错误接收及处理 axios
  //   // errorHandler(error: any, opts: any) {
  //   //   // message.error("网络繁忙，请稍后再试");
  //   //   let access_token = ''
  //   //   if(error.name === 'access_token_expires'){
  //   //     getAccessToken().then((res:any)=>{
  //   //       access_token = res.data;
  //   //       localStorage.setItem('access_token',access_token)
  //   //     });
  //   //   console.log('重新获取access_token')
  //   //   message.error('access_token过期，请稍后再试');
  //   //   }


    errorHandler(error: any, opts: any) {
      // message.error("网络繁忙，请稍后再试");
      // if (error.name === 'access_token_expires') {
      //   getAccessToken().then(res => {
      //     let access_token = res.data.access_token;
      //     localStorage.setItem('access_token', access_token)
      //   }).catch((err) => { console.log(err) })
      // }
    },
  },
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      // 在请求拦截器中带token（除登录接口）
      NProgress.start(); // 开启进度条
      const token = cookie.load("token")
      if (token && config.url != loginPath)
        config.headers['token'] = token;
        // config['token'] = token;
        // 携带access_token
        // config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        config.headers['Authorization'] = 'Bearer ' + cookie.load("access_token");
      return config;
      NProgress.done(); // 关闭进度条
    },

  ],
  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      NProgress.done(); // 关闭进度条
      return response
    },
    // access_token 过期
    (res:any) =>{
      NProgress.done(); // 关闭进度条
      // console.log(res.data.code == 1001);
      let test = window.location.hostname.slice(window.location.hostname.indexOf("."))
      if(res.data.code==40013){
          getAccessToken().then(res => {
            if(window.location.hostname.startsWith("localhost")){
              console.log(window.location.hostname.startsWith("localhost"))
              cookie.save("access_token",res.access_token,{path:"/"})
            }else{
              cookie.save('access_token', res.access_token, { domain:test,path: '/' });
            }
          // localStorage.setItem('access_token',  res.access_token)
        }).catch((err) => { console.log(err) });
      }
      if(res.data.code==1001){
        sessionStorage.removeItem("domain")
        history.push(loginPath);
        return res;
      }
      // if()
      // res.code==
      else return res;
      // return res
    }
  ],
}

