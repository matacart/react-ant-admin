import request from '@/utils/request';
import cookie from 'react-cookies';
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
      domain_id: cookie.load("domain")?.id,
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
      domain_id: cookie.load("domain")?.id,
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
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 查询物流商品分组
export async function queryProductGroup(options:{
  languages_id:string,
  pageNum:number,
  pageSize:number,
}){
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/product_group_page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}
// 添加物流分组
export async function setProductGroup(options:{
  languages_id:string,
  productGroup:string,
  deliveryLocationGroupSetInfo:string
}){
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/product_group_set_v2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除物流分组
export async function deleteProductGroup(options:{
  languages_id:string,
  productGroupSeq:string,
}){
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/product_group_delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// 获取物流商品分组
export async function getProductGroup(options:{
  languages_id:string,
  productGroupSeq:string
}){
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/shipping_plans_v2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}
// 获取物流商品分组详情
export async function getProductGroupDetail(options:{
  languages_id:string,
  productGroupSeq:string
}){
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/product_group_detail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}
// 查询物流商品分组下的商品
export async function queryProductGroupGoods(options:{
  languages_id:string,
  productGroupSeq:string,
  pageNum:number,
  pageSize:number,
}){
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/product_search_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// 查询所有物流国家/地区
export async function queryProductGroupCountry(options:{
  languages_id:string,
}){
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/country_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// 查询物流商品列表
export async function queryProductList(options:{
  languages_id:string,
  pageNum:number,
  pageSize:number,
}){
  const res = await request<ApiLogistics.Default>(`/ApiStore/product_query_page_selector`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

// 查询物流商品详情
export async function queryProductInfo(options:{
  languages_id:string,
  productIds:string,
}){
  const res = await request<ApiLogistics.Default>(`/ApiLogistics/product_group_related`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}