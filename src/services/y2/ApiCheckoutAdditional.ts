import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';

// 获取结算信息
export async function getList(options:{
  page:string,
  limit:string,
  languages_id:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckoutAdditional/list_info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 添加国家
export async function addCountry(options:any,signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckoutAdditional/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 编辑国家
export async function editCountry(options:any,signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckoutAdditional/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 修改状态
export async function changeCountryStatus(options:{
  id:string,
  languages_id:string,
  status:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckoutAdditional/status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除国家
export async function delCountry(options:{
  id:string,
  languages_id:string,
},signal?:AbortSignal){
  const res = await request<ApiCheckout.Default>(`/ApiCheckoutAdditional/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}
