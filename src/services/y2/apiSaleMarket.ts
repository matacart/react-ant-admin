
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

// 偏好设置
export async function getMarketPreference(options:{
  languages_id:string,
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/market_setting`, {
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

// 修改偏好设置
export async function modifyMarketPreference(options:{
  languages_id:string,
  enableSettleSwitchMarket:boolean,
  priceRounding:boolean,
  redirect:boolean,
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/market_setting_modify`, {
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

// 自定义尾数规则
export async function getCustomRoundingRule(options:{
  languages_id:string,
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/rounding_rule_list`, {
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

export async function modifyCustomRoundingRule(options:{
  languages_id:string,
  currencyRoundingRules:string
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/rounding_rule_modify`, {
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

// 修改市场状态
export async function modifyMarketStatus(options:{
  languages_id:string,
  marketId:string,
  visible:boolean,
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/market_visible`, {
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

// 删除市场
export async function deleteMarket(options:{
  languages_id:string,
  marketId:string,
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/market_delete`, {
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

// 市场语言查询
export async function selectMarketLanguage(options:{
  languages_id:string,
  marketId:string,
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/market_languages_select`, {
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

// 语言市场配置
export async function getLanguageMarketsList(options:{
  language:string,
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/language_market_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      ...options
    },
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 设置语言市场配置
export async function setLanguageMarketsList(options:{
  language:string,
  bindList:string,
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/language_market_bind`, {
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

// 更新市场语言配置
export async function updateMarketLanguage(options:{
  languages_id:string,
  marketId:string,
  configType:string,
  configValue:string,
  marketLanguageList:string
}){
  const res = await request<ApiSaleMarket.Default>(`/ApiSaleMarket/market_config_update`, {
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
