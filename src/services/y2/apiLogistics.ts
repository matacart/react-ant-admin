import request from '@/utils/request';

// 查询物流服务商
export function getShippingCourier() {
  return request<ApiLogistics.Default>(`/ApiLogistics/queryCouriers`, {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

// 收藏物流服务商
export function setFavoriteCourier(res:{
  courierId:string,
}){
  return request<ApiLogistics.Default>(`/ApiLogistics/favoriteCourier`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...res
    }
  })
}

// 取消收藏物流服务商
export function cancelFavoriteCourier(res:{
  courierId:string,
}){
  return request<ApiLogistics.Default>(`/ApiLogistics/unfavoriteCourier`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...res
    }
  })
}

export function queryCouriers(res:{
  languages_id:string,
  orderSeq:string,
  expressCode:string,
  expressCompanyCode:string,
}){
  return request<ApiLogistics.Default>(`/ApiLogistics/queryTrackingTrace`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...res
    }
  })
}