import request from '@/utils/request';
import cookie from 'react-cookies';




export function searchAbandonedOrder(res:{
    languages_id:string,
    pageNum:string,
    pageSize:string,
    sortBy:string,
    status:string,
    keyword:string,
},signal?:AbortSignal){
  return request<ApiAbandonedOrder.Default>(`/ApiAbandonedOrder/search`, {
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

export function getAbandonedOrderDetail(res:{
    languages_id:string,
    seq:string,
},signal?:AbortSignal){
  return request<ApiAbandonedOrder.Default>(`/ApiAbandonedOrder/detail`, {
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