import request from '@/utils/request';
import cookie from 'react-cookies';

// 获取标签列表
export async function getOrderTagList(orderId:string) {
  return request<ApiOrders.Default>('/ApiOrders/getOrderTagList', {
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
  return request<ApiOrders.Default>('/ApiOrders/getOrderDetailNew', {
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
  return request<ApiOrders.Default>('/ApiOrders/updateOrderRemark', {
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
  return request<ApiOrders.Default>('/ApiOrders/getOrderSubIdScroll', {
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
  return request<ApiOrders.Default>('/ApiOrders/getUserOrderHistory', {
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
  return request<ApiOrders.Default>(`/ApiOrders/setOrderContact`, {
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
  return request<ApiOrders.Default>(`/ApiOrders/pauseOrderShipping`, {
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

// 发货
export async function sendOrderPackage(res:{
  languageId:string,
  orderSeq:string,
  fulfillmentOrderSeq:string,
  logisticsType:string,
  multiExpressInfo:string,
  sendNotify:string,
  senderInfo:string,
  extInfo:{},
  productInfoList:string,
}) {
  return request<ApiOrders.Default>(`/ApiOrders/sendOrderPackage`, {
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

// 取消订单发货
export async function cancelOrderShipment(res:{
  orderId:string,
  packageSeq:string,
}) {
  return request<ApiOrders.Default>(`/ApiOrders/cancelOrderShipment`, {
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

// 更新物流单号
export async function updatePackageExpress(res:{
  languages_id:string,
  orderId:string,
  packageSeq:string,
  sendNotify:boolean,
  sellerCountryCode:string,
  multiExpressInfo:string,
}) {
  return request<ApiOrders.Default>(`/ApiOrders/updatePackageExpress`, {
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

// 设置收货地址
export async function updateOrderReceiverInfo(res:{
  languages_id:string,
  addressSource:string,
  deliveryDescription:string,
  deliveryType:string,
  localShipping:string,
  orderSeq:string,
  receiverAddress:string,
  receiverAddressAdd:string,
  receiverArea:string,
  receiverAreaCode:string,
  receiverCertificatesNo:string,
  receiverCertificatesType:string,
  receiverCity:string,
  receiverCityCode:string,
  receiverCompany:string,
  receiverCountry:string,
  receiverCountryId:string,
  receiverCountryCode:string,
  receiverFirstName:string,
  receiverLastName:string,
  receiverName:string,
  receiverMobile:string,
  receiverNeighborhood:string,
  receiverPostcode:string,
  receiverProvince:string,
  receiverProvinceCode:string,
  receiverStoreCode:string,
  receiverStoreId:string,
  receiverStoreName:string,
  receiverUniqueKey:string,
  shippingType:string,
  taxNum:string,
  taxType:string,
}) {
  return request<ApiOrders.Default>(`/ApiOrders/updateOrderReceiverInfo`, {
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

// 创建退货订单
export async function createReturnOrder(res:{
  languages_id:string,
  fromType:string,
  orderSeq:string,
  returnGoodsType:string,
  sendEmail:boolean,
  skuInfos:string,
  storeId:string,
}) {
  return request<ApiOrders.Default>(`/ApiOrders/createReturnOrder`, {
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

// 退货原因
export async function getReturnReasonList(languagesId:string) {
  return request<ApiOrders.Default>(`/ApiOrders/getReturnReasonList`, {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languagesId:languagesId
    }
  })
}

// 取消退货订单
export async function cancelReturnOrder(res:{
  languages_id:string,
  orderSeq:string,
  afterSaleOrderSeq:string,
}) {
  return request<ApiOrders.Default>(`/ApiOrders/cancelReturnOrder`, {
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

// 更新退货订单物流单号
export async function updateReturnExpressInfo(res:{
  languages_id:string,
  afterSaleOrderSeq:string,
  appScene:string,
  expressCode:string,
  expressCompany:string,
  expressCompanyCode:string,
  expressUrl:string,
}) {
  return request<ApiOrders.Default>(`/ApiOrders/updateReturnExpressInfo`, {
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
