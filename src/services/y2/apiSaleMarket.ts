
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
