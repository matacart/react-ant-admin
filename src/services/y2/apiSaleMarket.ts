
import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';


export async function getMarketList(options:{
    languages_id:string,
}) {
 const res = await request<ApiSaleMarket.Default>('/ApiSaleMarket/getMarketList', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

export async function getMarketDetail(options:{
    market_id:string,
    languages_id:string,
}) {
 const res = await request<ApiSaleMarket.Default>('/ApiSaleMarket/getMarketDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}


// 市场数据
export async function getMarketStatistic(options:{
    market_id:string,
    languages_id:string,
    statistic_query_type:string,
}) {
 const res = await request<ApiSaleMarket.Default>('/ApiSaleMarket/getMarketStatistic', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取市场域名和语言配置
export async function getMarketConfigV2(options:{
  marketId:string,
  languages_id:string,
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/getMarketConfigV2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res;
}

export async function getMarketCountry(options:{
  marketId:string,
  languages_id:string,
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/market_country_select`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 修改市场国家/地区
export async function modifyMarketCountry(options:{
  languages_id:string,
  marketId:string,
  marketName:string,
  countryCodeList:string,
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/modifyMarket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}