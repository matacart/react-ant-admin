import request from '@/utils/request';
import { errHandle } from './apiAppstore';

// 查询物流服务商
export async function getShippingCourier() {
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/queryCouriers`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 收藏物流服务商
export async function setFavoriteCourier(options:{
  courierId:string,
}){
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/favoriteCourier`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 取消收藏物流服务商
export async function cancelFavoriteCourier(options:{
  courierId:string,
}){
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/unfavoriteCourier`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

export async function queryCouriers(options:{
  languages_id:string,
  orderSeq:string,
  expressCode:string,
  expressCompanyCode:string,
}){
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/queryTrackingTrace`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}