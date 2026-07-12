import request from '@/utils/request';
import cookie from 'react-cookies';

// 获取结算信息
export function getList(res:{
  page:string,
  limit:string,
  languages_id:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckoutAdditional/list_info`, {
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

// 添加国家
export function addCountry(res:any,signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckoutAdditional/add`, {
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

// 编辑国家
export function editCountry(res:any,signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckoutAdditional/edit`, {
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

// 修改状态
export function changeCountryStatus(res:{
  id:string,
  languages_id:string,
  status:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckoutAdditional/status`, {
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

// 删除国家
export function delCountry(res:{
  id:string,
  languages_id:string,
},signal?:AbortSignal){
  return request<ApiCheckout.Default>(`/ApiCheckoutAdditional/delete`, {
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
