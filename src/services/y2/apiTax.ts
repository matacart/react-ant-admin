import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';

export async function getCountryList(options:{langId:string,pageSize:number,current:number,keyword?:string}) {
  const res = await request<ApiTax.Default>('/ApiTax/getCountryList',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:options.langId,
      pageNum:options.current,
      pageSize:options.pageSize,
      keyword:options.keyword,
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res.data
}

export async function getTaxDisplayConfig(options:{langId:string}) {
  const res = await request<ApiTax.Default>('/ApiTax/getTaxDisplayConfig',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:options.langId,
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res.data
}

export async function saveTaxDisplayConfig(options:{languages_id:string,is_enabled:boolean}) {
  const res = await request<ApiTax.Default>('/ApiTax/saveTaxDisplayConfig',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options,
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res.data
}

export async function updateCountryTaxStatus(options:{langId:string,countryId:string,status:string}) {
  const res = await request<ApiTax.Default>('/ApiTax/updateCountryTaxStatus',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:options.langId,
      country_id:options.countryId,
      status:options.status,
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res.data
}

// 获取区域列表
export async function getZoneList(options:{langId:string,countryId:string}) {
  const res = await request<ApiTax.Default>('/ApiTax/getZoneList',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:options.langId,
      country_id:options.countryId,
      pageSize:100,
      level:0,
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res.data
}

// 获取税率
export async function getTaxList(options:{
  languages_id:string,
  country_id:string
}) {
  const res = await request<ApiTax.Default>('/ApiTax/getList',{
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
  return res.data
}

export async function getTaxDetail(options:{langId:string,countryId:string}) {
  const res = await request<ApiTax.Default>('/ApiTax/getTaxDetail',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:options.langId,
      country_id:options.countryId,
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res.data
}

export async function updateTaxDetail(options:{
  languages_id:string,
  country_id:string
}) {
  const res = await request<ApiTax.Default>('/ApiTax/batchUpdateTaxConfig',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options,
    }
  })
  if (res.code != "SUCCESS") errHandle(res);
  return res.data
}