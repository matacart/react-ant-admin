import request from '@/utils/request';


// 省
export async function getProvinceList(countryId:string){
  return await request<ApiAppstore.Default>('/ApiAppstore/state_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      country_id:countryId
    }
  })
}

// 市
export async function getCityList(provinceCode:string){
  return await request<ApiAppstore.Default>('/ApiAppstore/city_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      state_id:provinceCode
    }
  })
}