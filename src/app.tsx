import { Footer } from '@/components';
import { SettingOutlined } from '@ant-design/icons';
import { type Settings as LayoutSettings } from '@ant-design/pro-components';
import { history,Link,RunTimeLayoutConfig,setLocale,useIntl } from '@umijs/max';
import { getAccessToken, getCurrenciesList, getPlatformInfo, getShippingcourier, getTimeZoneList, currentUser as queryCurrentUser } from '@/services/y2/api';
import axios from 'axios';
import cookie from 'react-cookies';
import { App, Flex, message } from 'antd';
import React, { useState } from 'react';
import { AddIcon, PrintIcon, RightIcon } from './components/Icons/Icons';
import { requestConfig } from '@/utils/requestConfig';
// layout
import defaultSettings from '../config/defaultSettings';

const loginPath = '/user/signIn';
// 在 app.tsx 文件顶部添加导入语句
import "nprogress/nprogress.css";
import globalStore from './store/globalStore';
import SalesChannel from './components/Menu/SalesChannel';
import Header from './components/Header/Header';
import MCPaymentHead from './components/Header/MCPaymentHead';
// 流程参考 https://www.bilibili.com/video/BV1yH4y1T7NW
// let currentVersion = '';

// 版本轮询
// const checkVersion = async () => {
//   try {
//     const res = await fetch('/version.json?t=' + Date.now()); // 跳过缓存
//     const { version } = await res.json();
    
//     if (!currentVersion) {
//       currentVersion = version; // 初始化当前版本
//       return;
//     }

//     if (version !== currentVersion) {
//       Modal.confirm({
//         title: '发现新版本',
//         centered: true,
//         content: '是否立即刷新以获取最新内容？',
//         okText: '刷新',
//         onOk: () => location.reload(),
//       });
//     }
//   } catch (err) {
//     console.error('版本检测失败:', err);
//   }
// };


// 配置化请求参数
const CONFIG_REQUESTS = [
  { 
    url: '/api/ApiAppstore/languages_select',
    storageKey: 'languages',
    retry: 3
  },
  {
    url: '/api/ApiAppstore/currencies_select',
    storageKey: 'currencies', 
    retry: 3
  },
  {
    url: '/api/ApiAppstore/country_select',
    storageKey: 'country',
    retry: 3
  }
];

// 带重试的请求封装
const fetchWithRetry = (url: string, retries: number): Promise<any> => {
  return axios.post(url,{},{ timeout: 60000 }).catch(err => {
    return retries > 0 
      ? fetchWithRetry(url, retries - 1)
      : Promise.reject(err);
  });
};
// 安全存储方法
const safeSessionStorageSet = (key: string, data: unknown) => {
  try {
    if (data && typeof data === 'object') {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  } catch (e) {
    console.error(`SessionStorage 存储失败 [${key}]`, e);
  }
};
// 执行请求并处理
Promise.allSettled(
  CONFIG_REQUESTS.map(({ url, storageKey, retry }) => 
    fetchWithRetry(url, retry).then(response => {
      if (response?.data?.code === 0 && response.data.data) {
        safeSessionStorageSet(storageKey, response.data.data);
      }
      return response;
    }).catch(err => {
      console.error(`请求失败 [${url}]`, err);
      return null;
    })
  )
).then(results => {
  const failed = results.filter(r => r.status === 'rejected');
  if (failed.length > 0) {
    console.warn(`${failed.length}个请求未完全成功`);
  }
});

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
      // 用户语言
      localStorage.setItem("use_lang", msg?.data?.languages_id ?? "2");
      // 设置语言
      const language = globalStore.language.filter(item => item.id === msg?.data?.languages_id)[0]?.code
      setLocale(language,false);
      // 获取平台信息
      getPlatformInfo().then((res:any)=>{
        if (res.data) {
          localStorage.setItem('MC_DATA_PLATFORM_INFO', JSON.stringify(res.data));
          // 动态设置 favicon
          // updateFavicon(res.data?.faviconUrl);
        } else {
          // 使用默认 favicon
          // updateFavicon('/img/logo.png');
        }
      }).catch(error => {
          // 使用默认 配置
          // updateFavicon('/img/logo.png');
      });
      // 获取物流服务
      getShippingcourier().then((res:any)=>{
        localStorage["MC_DATA_SHIPPING_COURIER"] = JSON.stringify(res.data)
      }).catch(err=>{
      })
      // 获取时区列表
      getTimeZoneList().then(res=>{
        localStorage.setItem('MC_DATA_TIME_ZONEZ', JSON.stringify(res??[]));
      })
      // 获取币种列表
      getCurrenciesList(1,100).then(res=>{
        res.code == 0 && localStorage.setItem('MC_DATA_CURRENCIES', JSON.stringify(res.data??[]));
        
      })
      return msg.data // 返回用户信息
    } catch (error) {
      // history.push(loginPath);
    }
    return undefined;
  };

  // 设置 favicon 的函数
  const updateFavicon = (href: string) => {
    // 移除现有的 favicon
    const existingIcons = document.querySelectorAll("link[rel*='icon']");
    existingIcons.forEach(icon => icon.remove());
    
    // 创建新的 favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = href;
    document.head.appendChild(link);
  };

  

  // access_token 初始化
  // let access_token = localStorage.getItem('access_token')
  let access_token = cookie.load('access_token')
  if (!access_token) {
    let test = window.location.hostname.slice(window.location.hostname.indexOf("."))
    getAccessToken().then((res:any) => {
      if(window.location.hostname.startsWith("localhost")){
        cookie.save("access_token",res.access_token,{path:"/"})
      }else{
        cookie.save("access_token",res.access_token,{domain:test,path:"/"})
      }
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

// 运行时布局配置
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {

  const [height,setHeight] = useState(120)

  const stores = window.location.pathname
  
  return {
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
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
      const intl = useIntl(); // 获取国际化实例
      const settingText = intl.formatMessage({ id: 'menu.settings' }); // 根据 key 获取对应语言的文本
      return (
        <div className='menu-item-settings'>
          <Link style={stores.slice(0,8) == "/setting"?{color:"#1677FF",backgroundColor:"#F7F8FB"}:{color:"rgba(0, 0, 0, .65)"}} to={"/settings"}>
            <SettingOutlined />
            <span style={{marginLeft:"8px"}}>{settingText}</span>
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
        // 
      }else if(item.path == "/channel"){
        return <SalesChannel dom={dom} />
      }else if(item.path == "/settings"){
        return <Link to={item.path} className='menu-item-settings'>
        {dom}
      </Link>
      }
      return <Link to={item.path as string}>
        {dom}
      </Link>
    },
    // 修改菜单数据
    menuDataRender: (menuData) => {
      if(stores.slice(0,8) == "/stores/"){
        return menuData.filter((item:any) => item.path.slice(0,8) == "/stores/" )
      }else{
        return menuData.filter((item:any) => item.path.slice(0,8) !== "/stores/" )
      }
    },
    // 
    menuProps: {
      className: 'my-custom-menu', // 为菜单容器添加自定义类名
      style: { 
        height: '100%', 
        overflowY: 'auto',
      }
    },
    headerRender: () => {
      if(stores.slice(19,28) == "mcpayment"){
        return <MCPaymentHead />
      }
      return (
        <Header setHeight={setHeight} url={stores.slice(0,8)} initialState={initialState} />
      )
    },
    ...initialState?.settings,
    // 覆盖默认token
    token: {
      bgLayout: '#EAEDF1',
      header:{
        colorBgHeader: '#FFFFFF',
        heightLayoutHeader:height,
      },
      sider:{
        colorBgMenuItemHover: '#f7f8fb',
        colorBgMenuItemSelected: '#f7f8fb',
        colorTextMenuSelected:"#356DFF"
      },
    },
    pageTitleRender:(props,defaultPageTitle,info)=>{
      const title = window.location.hostname.startsWith("localhost") ? "localhost": window.location.hostname.slice(0,window.location.hostname.indexOf("."));
      return (
        title+" - "+defaultPageTitle
      )
    },
  };
};

// 运行时路由配置
export function patchRoutes({ routes, routeComponents }:any) {
  console.log('patchRoutes', routes, routeComponents);
  Object.keys(routes).forEach(key => {
    const icon = routes[key];
    icon.path == "order_invoice_customization" && (routes[key].icon = <Flex align='center'><PrintIcon style={{fontSize:"18px"}} /></Flex>)
  });
}

// 请求配置
export const request = requestConfig;