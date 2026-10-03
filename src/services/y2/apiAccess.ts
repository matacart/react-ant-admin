import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';

// 偏好设置 --- 添加IP地址 list_type 白名单/黑名单
export async function addIPAddressAccess(options:{
  ip_input:string,
  list_type:string,
},signal?:AbortSignal){
  const res = await request<ApiAccess.Default>(`/ApiAccess/ipBlackAdd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 偏好设置 --- 删除IP地址
export async function delIPAddressAccess(id:string,signal?:AbortSignal){
  const res = await request<ApiAccess.Default>(`/ApiAccess/ipBlackDelete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      rule_id:id,
      delete_type:"soft",
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 偏好设置 --- 添加区域黑名单
export async function addRegionAddressAccess(options:{
  rules:string,
},signal?:AbortSignal){
  const res = await request<ApiAccess.Default>(`/ApiAccess/regionBlackBatchAdd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 偏好设置 --- 删除区域黑名单
export async function delRegionAddressAccess(id:string,signal?:AbortSignal){
  const res = await request<ApiAccess.Default>(`/ApiAccess/regionBlackDelete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      rule_id:id,
      delete_type:"soft",
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 偏好设置 --- IP地址访问名单列表
export async function getIPAddressAccessList(options:{
  page:number,
  limit:number
},signal?:AbortSignal){
  const res = await request<ApiAccess.Default>(`/ApiAccess/ipBlackList`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 偏好设置 --- IP地区访问限制名单列表
export async function getIPRegionBlackList(options:{
  page:number,
  limit:number
},signal?:AbortSignal){
  const res = await request<ApiAccess.Default>(`/ApiAccess/regionBlackList`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal,
  })
  if (res.code != 0) errHandle(res);
  return res;
}