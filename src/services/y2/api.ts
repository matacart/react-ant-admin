// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import axios from 'axios';
import { Oauth2 } from '../../../config/myConfig'

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/ApiAppstore/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/ApiAppstore/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/ApiAppstore/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account  /y2/ApiAppstore/newlogin */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/ApiAppstore/newlogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    }
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    }
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    }
  });
}

/** 重设密码 */
export async function reset(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/ApiAppstore/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册 */
export async function register(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/ApiAppstore/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取access_token */
// export async function getAccessToken() {
//   let AccessToken = '';
//   await axios.post(
//     Oauth2.hdyUrl,
//     {
//       grant_type: Oauth2.grant_type,
//       accessKeyId: Oauth2.accessKeyId,
//       accessKeySecret: Oauth2.accessKeySecret
//     }, {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   }).then((res:any) => {
//     AccessToken = res.data.access_token;
//   }).catch((error:any) => {
//     console.log('error', error);
//   });
//   return AccessToken;
// }

/** 获取access_token */
export async function getAccessToken() {
  return request(Oauth2.hdyUrl,{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      grant_type: Oauth2.grant_type,
      accessKeyId: Oauth2.accessKeyId,
      accessKeySecret: Oauth2.accessKeySecret
    },
  })
}

  
