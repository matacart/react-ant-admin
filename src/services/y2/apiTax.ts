import request from '@/utils/request';
import cookie from 'react-cookies';

export async function getCountryList({
  langId,
  current,
  pageSize,
  keyword,
}:{langId:string,pageSize:number,current:number,keyword?:string}) {
  const res = await request<ApiTax.Default>('/ApiTax/getCountryList',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
        domain_id:cookie.load("domain")?.id,
        languages_id:langId,
        pageNum:current,
        pageSize:pageSize,
        keyword:keyword,
    }
  })
  return res.data
}

export async function getTaxDisplayConfig({
  langId,
}:{langId:string}) {
  const res = await request<ApiTax.Default>('/ApiTax/getTaxDisplayConfig',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:langId,
    }
  })
  return res.data
}

export async function saveTaxDisplayConfig(res:{languages_id:string,is_enabled:boolean}) {
  return request<ApiTax.Default>('/ApiTax/saveTaxDisplayConfig',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res,
    }
  })
}

export function updateCountryTaxStatus({
  langId,
  countryId,
  status,
}:{langId:string,countryId:string,status:string}) {
  return request<ApiTax.Default>('/ApiTax/updateCountryTaxStatus',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
        domain_id:cookie.load("domain")?.id,
        languages_id:langId,
        country_id:countryId,
        status:status,
    }
  })
}

// 获取区域列表
export async function getZoneList({
  langId,
  countryId
}:{langId:string,countryId:string}) {
  const res = await request<ApiTax.Default>('/ApiTax/getZoneList',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:langId,
      country_id:countryId,
      pageSize:100,
      level:0,
    }
  })
  return res.data
}

// 获取税率
export async function getTaxList(opt:{
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
        ...opt
    }
  })
  return res.data
}

export async function getTaxDetail({langId,countryId}:{langId:string,countryId:string}) {
  const res = await request<ApiTax.Default>('/ApiTax/getTaxDetail',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languages_id:langId,
      country_id:countryId,
    }
  })
  return res.data
}

export function updateTaxDetail(res:{
  languages_id:string,
  country_id:string
}) {
  return request<ApiTax.Default>('/ApiTax/batchUpdateTaxConfig',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res,
    }
  })
}