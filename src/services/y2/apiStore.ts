import request from '@/utils/request';
import cookie from 'react-cookies';

// 基础设置 --- 
export async function getTodayData(startDate:number,endDate:number,options?: { signal?: AbortSignal }) {
  return request<ApiStore.Default>('/ApiStore/today_statistics', {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domainID: cookie.load("domain")?.id,
      startDate:startDate,
      endDate:endDate
    },
    signal: options?.signal,
  })
}


// 获取标签列表
export async function getOrderTagList(orderId:string) {
  return request<ApiStore.Default>('/ApiStore/getOrderTagList', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      orderId:orderId
    }
  })
}

// 获取订单
export async function getOrderDetail(res:{
  order_id:string,
  languages_id:string,
}){
  return request<ApiStore.Default>('/ApiStore/getOrderDetailNew', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...res
    }
  })
}

// 更新订单备注
export async function updateOrderRemark(res:{
  remark_id:string,
  languages_id:string,
  remark:string
}) {
  return request<ApiStore.Default>('/ApiStore/updateOrderRemark', {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...res
    },
  })
}

// 获取前后订单
export async function getOrderSubIdScroll(res:{
  languages_id:string,
  sinceOrderSeq:string,
}) {
  return request<ApiStore.Default>('/ApiStore/getOrderSubIdScroll', {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      pageNum:1,
      pageSize:1,
      sortBy:16,
      locationSeqs:"[]",
      includeHide:false,
      ...res
    },
  })
}

// 获取客户历史订单数
export async function getUseOrderHistory(res:{
  uids:string,
  languages_id:string,
}) {
  return request<ApiStore.Default>('/ApiStore/getUserOrderHistory', {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...res
    },
  })
}


// 联系信息
export async function setOrderContact(res:any) {
  return request<ApiStore.Default>(`/ApiStore/setOrderContact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}

// 暂停发货
export async function pauseOrderShipping(res:{
  orderId:string,
  fulfillmentId:string,
  pauseReason:string,
  pauseReasonDetail?:string,
}) {
  return request<ApiStore.Default>(`/ApiStore/pauseOrderShipping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...res
    }
  })
}