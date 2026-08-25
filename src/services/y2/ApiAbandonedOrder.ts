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

export function searchScrollAbandonedOrder(res:{
    languages_id:string,
    abandonedOrderSeq:string,
    sortBy:string,
},signal?:AbortSignal){
  return request<ApiAbandonedOrder.Default>(`/ApiAbandonedOrder/searchScroll`, {
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

export function setAbandonedOrderRemark(res:{
    languages_id:string,
    abandonedOrderSeq:string,
    remark:string,
},signal?:AbortSignal){
  return request<ApiAbandonedOrder.Default>(`/ApiAbandonedOrder/modifyRemark`, {
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

export async function sendRecallEmail(res:{
  abandonedOrderSeqList:string,
  mToken:string,
  languages_id:string,
  emailTitle:string,
  headerContent:string,
  senderName:string,
  hasChange:boolean,
},signal?:AbortSignal){
  const response = await request<ApiAbandonedOrder.Default>(`/ApiAbandonedOrder/sendRecallEmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
  if(response.code != 0){
    throw new Error(response.msg)
  }
  return response 
}