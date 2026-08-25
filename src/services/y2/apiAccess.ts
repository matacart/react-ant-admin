import request from '@/utils/request';
import cookie from 'react-cookies';

// 偏好设置 --- 添加IP地址 list_type 白名单/黑名单
export async function addIPAddressAccess(res:{
  ip_input:string,
  list_type:string,
},signal?:AbortSignal){
  return request<ApiAccess.Default>(`/ApiAccess/ipBlackAdd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 偏好设置 --- 删除IP地址
export async function delIPAddressAccess(id:string,signal?:AbortSignal){
  return request<ApiAccess.Default>(`/ApiAccess/ipBlackDelete`, {
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
}

// 偏好设置 --- 添加区域黑名单
export async function addRegionAddressAccess(res:{
  rules:string,
},signal?:AbortSignal){
  return request<ApiAccess.Default>(`/ApiAccess/regionBlackBatchAdd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 偏好设置 --- 删除区域黑名单
export async function delRegionAddressAccess(id:string,signal?:AbortSignal){
  return request<ApiAccess.Default>(`/ApiAccess/regionBlackDelete`, {
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
}

// 偏好设置 --- IP地址访问名单列表
export async function getIPAddressAccessList(res:{
  page:number,
  limit:number
},signal?:AbortSignal){
  return request<ApiAccess.Default>(`/ApiAccess/ipBlackList`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    },
    signal:signal,
  })
}

// 偏好设置 --- IP地区访问限制名单列表
export async function getIPRegionBlackList(res:{
  page:number,
  limit:number
},signal?:AbortSignal){
  return request<ApiAccess.Default>(`/ApiAccess/regionBlackList`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    },
    signal:signal,
  })
}