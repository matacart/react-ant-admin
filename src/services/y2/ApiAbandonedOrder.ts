import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';

export async function searchAbandonedOrder(options:{
    languages_id:string,
    pageNum:string,
    pageSize:string,
    sortBy:string,
    status:string,
    keyword:string,
},signal?:AbortSignal){
  const res = await request<ApiAbandonedOrder.Default>(`/ApiAbandonedOrder/search`, {
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

export async function getAbandonedOrderDetail(options:{
    languages_id:string,
    seq:string,
},signal?:AbortSignal){
  const res = await request<ApiAbandonedOrder.Default>(`/ApiAbandonedOrder/detail`, {
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

export async function searchScrollAbandonedOrder(options:{
    languages_id:string,
    abandonedOrderSeq:string,
    sortBy:string,
},signal?:AbortSignal){
  const res = await request<ApiAbandonedOrder.Default>(`/ApiAbandonedOrder/searchScroll`, {
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

export async function setAbandonedOrderRemark(options:{
    languages_id:string,
    abandonedOrderSeq:string,
    remark:string,
},signal?:AbortSignal){
  const res = await request<ApiAbandonedOrder.Default>(`/ApiAbandonedOrder/modifyRemark`, {
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

export async function sendRecallEmail(options:{
  abandonedOrderSeqList:string,
  mToken:string,
  languages_id:string,
  emailTitle:string,
  headerContent:string,
  senderName:string,
  hasChange:boolean,
},signal?:AbortSignal){
  const res = await request<ApiAbandonedOrder.Default>(`/ApiAbandonedOrder/sendRecallEmail`, {
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