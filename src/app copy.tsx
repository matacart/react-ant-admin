import { Footer, Question, SelectLang, AvatarDropdown, AvatarName } from '@/components';
import { GlobalOutlined, RightOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';
import { ProLayout, type Settings as LayoutSettings } from '@ant-design/pro-components';
import { history,Link,RunTimeLayoutConfig,RequestConfig } from '@umijs/max';
import { getOptionType, getAccessToken, currentUser as queryCurrentUser, currentUserStatus } from '@/services/y2/api';
import axios from 'axios';
import { App, Avatar, Flex, Menu, message, Modal } from 'antd';
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
import MCPaymentHead from './components/Header/MCPaymentHead';
import { AddIcon, NailIcon, PrintIcon, RightIcon } from './components/Icons/Icons';
import SalesChannel from './components/Menu/SalesChannel';
import userInfo from './store/userInfo';

// 流程参考 https://www.bilibili.com/video/BV1yH4y1T7NW

let currentVersion = '';


// 配置NProgress
NProgress.configure({ showSpinner: false }) // 是否显示右上角螺旋加载提示

const checkVersion = async () => {
  try {
    const res = await fetch('/version.json?t=' + Date.now()); // 跳过缓存
    const { version } = await res.json();
    
    if (!currentVersion) {
      currentVersion = version; // 初始化当前版本
      return;
    }

    if (version !== currentVersion) {
      Modal.confirm({
        title: '发现新版本',
        centered: true,
        content: '是否立即刷新以获取最新内容？',
        okText: '刷新',
        onOk: () => location.reload(),
      });
    }
  } catch (err) {
    console.error('版本检测失败:', err);
  }
};

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
      const msg = await queryCurrentUser();
      return msg.data // 返回用户信息
    } catch (error) {
      // history.push(loginPath);
    }
    return undefined;
  };

  // access_token 初始化
  // let access_token = localStorage.getItem('access_token')
  let access_token = cookie.load('access_token')
  if (!access_token) {
    let test = window.location.hostname.slice(window.location.hostname.indexOf("."))
    getAccessToken().then((res) => {
      if(window.location.hostname.startsWith("localhost")){
        cookie.save("access_token",res.access_token,{path:"/"})
      }else{
        cookie.save("access_token",res.access_token,{domain:test,path:"/"})
      }
      // localStorage.setItem('access_token', res.access_token)
    }).catch((err) => {
      message.error(err.message)
    })
  }

  // 如果不是登录 || 注册 || 重置 页面，执行
  const { location } = history;
  // 例如 访问/welcome
  if (location.pathname == loginPath || location.pathname == '/user/forget' || location.pathname == '/user/signUp') {
  }else{
    // currentUser 用户信息
    const currentUser = await fetchUserInfo(); // 调接口获取用户信息
    !currentUser && history.push(loginPath);
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

// axios.post('/api/ApiAppstore/shippingcourier_select')

Promise.all([axios.post('/api/ApiAppstore/languages_select'),axios.post('/api/ApiAppstore/currencies_select'),axios.post('/api/ApiAppstore/country_select'),axios.post('/api/ApiAppstore/timezones_select')]).then(([res,res2,res3,res4])=>{
  if(res.data.code == 0){
    sessionStorage["languages"] = JSON.stringify(res.data.data)
  }
  if(res2.data.code == 0){
    sessionStorage["currencies"] = JSON.stringify(res2.data.data)
  }
  // if(res3.data.code == 0){
  //   sessionStorage["shippingcourier"] = JSON.stringify(res3.data.data)
  // }
  if(res3.data.code == 0){
    sessionStorage["country"] = JSON.stringify(res3.data.data)
  }
  if(res4.data.code == 0){
    sessionStorage["timezones"] = JSON.stringify(res4.data.data)
  }
}).catch((err)=>{
  console.log(err)
})
// 运行时布局配置
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {

  // 版本轮询
  useEffect(() => {
    const timer = setInterval(checkVersion, 1000000);
    return () => clearInterval(timer);
  }, []);


  // 进度条提示
  // const location = useLocation();
  // useEffect(() => {
  //   // 路由切换开始时触发
  //   NProgress.start();
  //   return () => {
  //     // 路由切换完成时触发
  //     NProgress.done();
  //   };
  // }, [location]);

  const [layoutHeight,setLayoutHeight] = useState(60);

  const stores = window.location.pathname

  // 获取数据
  useEffect(()=>{
    // document.title = window.location.hostname.startsWith("localhost") ? "localhost"+"-"+document.title: window.location.hostname.slice(0,window.location.hostname.indexOf("."))+"-"+document.title;
    getOptionType().then((res:any)=>{
      if(res.code == 0){
        sessionStorage["productOptionType"] = JSON.stringify(res.data)
      }else{
        console.log("获取商品类型失败")
      }
    })
    // 获取用户状态
    currentUserStatus().then(res=>{
      userInfo.setUserSession(res)
      if(res.code == 0){
        parseInt((res?.data.package.end_time*1000 - Date.now())/1000/60/60/24)>15?setLayoutHeight(60):setLayoutHeight(100);
        // domainStatus?.code == 1 ? 100:
      }else{
        
        setLayoutHeight(100);
      }
    })
  },[])


  return {
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          <App>
            {children}
          </App>
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
    // menu菜单底部
    menuFooterRender: () => {
      return (
        <div className='menu-item-settings'>
          <Link style={stores.slice(0,8) == "/setting"?{color:"#1677FF",backgroundColor:"#F7F8FB"}:{color:"rgba(0, 0, 0, .65)"}} to={"/settings"}>
            <SettingOutlined />
            <span style={{marginLeft:"8px"}}>设置</span>
          </Link>
        </div>
      )
    },
    // 自定菜单项
    menuItemRender:(item, dom)=>{
      if(item.path == "/app-store"){
        return <Link to={item.path}>
          <Flex justify='space-between' align='center'>
            <Flex className='font-12'>
              {dom}
              <RightIcon style={{fontWeight:600,fontSize:"14px"}} />
            </Flex>
            <AddIcon className='font-12 color-7A8499' />
          </Flex>
        </Link>
      }else if(item.path == "/channel"){
        return <SalesChannel dom={dom} />
      }else if(item.path == "/settings"){
        return <Link to={item.path} className='menu-item-settings'>
        {dom}
      </Link>
      }
      return <Link to={item.path}>
        {dom}
      </Link>
    },
    // 修改菜单数据
    menuDataRender: (menuData) => {
      if(stores.slice(0,8) == "/stores/"){
        return menuData.filter(item => item.path.slice(0,8) == "/stores/" )
      }else{
        return menuData.filter(item => item.path.slice(0,8) !== "/stores/" )
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
    menuProps: {
      className:stores.slice(0,8) == "/stores/"?"":"mc-menu-item"
    },
    headerRender: () => {
      if(stores.slice(19,28) == "mcpayment"){
        return <MCPaymentHead />
      }
      return (
        <Header stores={stores.slice(0,8)} initialState={initialState} />
      )
    },
    ...initialState?.settings,
   
    token: {
      bgLayout: '#EAEDF1',
      header:{
        colorBgHeader: '#ffffff',
        heightLayoutHeader:layoutHeight,
      }, 
      sider:{
        colorBgMenuItemHover: '#f7f8fb',
        colorBgMenuItemSelected: '#f7f8fb',
        colorTextMenuSelected:"#356DFF"
      },
    },
    pageTitleRender:(props,defaultPageTitle,info)=>{
      const title = window.location.hostname.startsWith("localhost") ? "localhost": window.location.hostname.slice(0,window.location.hostname.indexOf("."));
      // console.log(title)
      // console.log(info)
      return (
        // title+" - "+info?.pageName+" - "+"MataCart"
        title+" - "+defaultPageTitle
      )
    },
    // title:"MataCart",
  };
};



// 运行时路由配置
export function patchRoutes({ routes, routeComponents }) {
  console.log('patchRoutes', routes, routeComponents);
  Object.keys(routes).forEach(key => {
    const icon = routes[key];
    icon.path == "order_invoice_customization" && (routes[key].icon = <Flex align='center'><PrintIcon style={{fontSize:"18px"}} /></Flex>)
  });
}

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

// 请求封装
export const request: RequestConfig = {
  timeout: 5000, //超时处理，请求超过0.05分钟，取消请求
  // // 错误统一处理
  errorConfig: {
    // 抛出错误
    errorThrower: (res: any) => {
      // console.log(res);
      // const { code, data, errorCode, errorMessage } = res as unknown as ResponseStructure;
      // //   console.log(res);
      // // // access_token 过期
      // if (data.code == 40013) {
      //   const error: any = new Error(errorMessage);
      //   error.name = 'access_token_expires';
      //   error.info = { errorCode, errorMessage, data };
      //   throw error; // 抛出自制的错误
      // }
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
    // }
    // 错误接收及处理
    errorHandler(error: any, opts: any) {
      endProgress();
      console.log(error)
      // access_token 过期
      // if (error.name === 'access_token_expires') {
      //   let test = window.location.hostname.slice(window.location.hostname.indexOf("."))
      // }else{
      //   // 其它错误
      // }
      // message.error("超时")
    },
  },
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      if (!config.skipAuthRefresh) {
        startProgress(); // 启动进度条
      }
      // 在请求拦截器中带token（除登录接口）
      const token = cookie.load("token")
      if (token && config.url != loginPath)
        config.headers['token'] = token;
        // config['token'] = token;
        // 携带access_token
        // config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        config.headers['Authorization'] = 'Bearer ' + cookie.load("access_token");
      return config;
    },
      
  ],
  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      return response
    },
    // access_token 过期
    (res:any) =>{
      endProgress();
      // 过滤
      if(res.config.url == "/api/Oauth2/gettoken"){
        return res
      }
      let test = window.location.hostname.slice(window.location.hostname.indexOf("."))
      if(res.data.code==40013){
        getAccessToken().then(res => {
          if(window.location.hostname.startsWith("localhost")){
            cookie.save("access_token",res.access_token,{path:"/"})
          }else{
            cookie.save('access_token', res.access_token, { domain:test,path: '/' });
          }
        }).catch((err) => { console.log(err) });
      }else if(res.data.code==1001){
        // 登录过期
        sessionStorage.removeItem("domain")
        cookie.remove("token",{ domain:test,path: '/' })
        cookie.remove("token",{ path: '/' })
        history.push(loginPath);
      }else if(res.data.code>2000){
        message.error(res.data.msg);
        console.log(res)
      }else{
        return res;
      }
    }
  ],
}


// (res:any) =>{
//   console.log(res)
//   endProgress();
//   // 过滤
//   if(res.config.url == "/api/Oauth2/gettoken"){
//     return res
//   }
//   let test = window.location.hostname.slice(window.location.hostname.indexOf("."))
//   if(res.data.code==40013){
//     getAccessToken().then(res => {
//       if(window.location.hostname.startsWith("localhost")){
//         cookie.save("access_token",res.access_token,{path:"/"})
//       }else{
//         cookie.save('access_token', res.access_token, { domain:test,path: '/' });
//       }
//     }).catch((err) => { console.log(err) });
//   }else if(res.data.code==1001){
//     // 登录过期
//     sessionStorage.removeItem("domain")
//     cookie.remove("token",{ domain:test,path: '/' })
//     cookie.remove("token",{ path: '/' })
//     history.push(loginPath);
//   }else if(res.data.code>2000){
//     message.error(res.data.msg);
//     console.log(res)
//   }else{
//     return res;
//   }
// }

