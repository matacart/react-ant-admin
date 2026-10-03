import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';

// 获取标签列表
export async function getOrderTagList(orderId:string) {
  const res = await request<ApiOrders.Default>('/ApiOrders/getOrderTagList', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      orderId:orderId
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取订单
export async function getOrderDetail(options:{
  order_id:string,
  languages_id:string,
}){
  const res = await request<ApiOrders.Default>('/ApiOrders/getOrderDetailNew', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 更新订单备注
export async function updateOrderRemark(options:{
  remark_id:string,
  languages_id:string,
  remark:string
}) {
  const res = await request<ApiOrders.Default>('/ApiOrders/updateOrderRemark', {
    method: 'POST',
    retryOnError: true, // 重试
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    },
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取前后订单
export async function getOrderSubIdScroll(options:{
  languages_id:string,
  sinceOrderSeq:string,
}) {
  const res = await request<ApiOrders.Default>('/ApiOrders/getOrderSubIdScroll', {
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
      ...options
    },
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取客户历史订单数
export async function getUseOrderHistory(options:{
  uids:string,
  languages_id:string,
}) {
  const res = await request<ApiOrders.Default>('/ApiOrders/getUserOrderHistory', {
    method: 'POST',
    retryOnError: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    },
  })
  if (res.code != 0) errHandle(res);
  return res;
}


// 联系信息
export async function setOrderContact(options:any) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/setOrderContact`, {
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

// 暂停发货
export async function pauseOrderShipping(options:{
  orderId:string,
  fulfillmentId:string,
  pauseReason:string,
  pauseReasonDetail?:string,
}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/pauseOrderShipping`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options
    }
  });
  if (res.code != 0) errHandle(res);
  return res;
}

// 发货
export async function sendOrderPackage(options:{
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
  const res = await request<ApiOrders.Default>(`/ApiOrders/sendOrderPackage`, {
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

// 取消订单发货
export async function cancelOrderShipment(options:{
  orderId:string,
  packageSeq:string,
}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/cancelOrderShipment`, {
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

// 更新物流单号
export async function updatePackageExpress(options:{
  languages_id:string,
  orderId:string,
  packageSeq:string,
  sendNotify:boolean,
  sellerCountryCode:string,
  multiExpressInfo:string,
}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/updatePackageExpress`, {
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

// 设置收货地址
export async function updateOrderReceiverInfo(options:{
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
  const res = await request<ApiOrders.Default>(`/ApiOrders/updateOrderReceiverInfo`, {
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

// 创建退货订单
export async function createReturnOrder(options:{
  languages_id:string,
  fromType:string,
  orderSeq:string,
  returnGoodsType:string,
  sendEmail:boolean,
  skuInfos:string,
  storeId:string,
}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/createReturnOrder`, {
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

// 退货原因
export async function getReturnReasonList(languagesId:string) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/getReturnReasonList`, {
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
  if (res.code != 0) errHandle(res);
  return res;
}

// 取消退货订单
export async function cancelReturnOrder(options:{
  languages_id:string,
  orderSeq:string,
  afterSaleOrderSeq:string,
}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/cancelReturnOrder`, {
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

// 更新退货订单物流单号
export async function updateReturnExpressInfo(options:{
  languages_id:string,
  afterSaleOrderSeq:string,
  appScene:string,
  expressCode:string,
  expressCompany:string,
  expressCompanyCode:string,
  expressUrl:string,
}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/updateReturnExpressInfo`, {
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

// 设置订单发货
export async function setOrderShipped(options:any) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/setOrderShipped`, {
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

// 商家备注
export async function addOrderRemark(options:{orderId:string,remark:string}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/addOrderRemark`, {
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

// 订单日志
export async function getOrderLogs(options:any) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/getOrderLogs`, {
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

// 标记付款
export async function setOrderPaid(options:any) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/setOrderPaid`, {
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

// 设置付款期限
export async function setOrderPaymentTerm(options:{orderId:string,paymentTerm:string,startDate:number}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/setOrderPaymentTerm`, {
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

// 设置护照号/身份证号
export async function setOrderIdNumber(options:{orderId:string,idNumber:string}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/setOrderIdNumber`, {
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

// 删除付款期限
export async function delOrderPaymentTerm(options:{orderId:string}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/delOrderPaymentTerm`, {
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

// 订单退货
export async function setOrderReturned(options:any) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/setOrderReturned`, {
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

// 标记已退货
export async function setMarkProductAsRefunded(options:any) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/markProductAsRefunded`, {
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

// 订单取消
export async function setCancelOrder(options:any) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/cancelOrder`, {
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

// 添加标签
export async function addOrderTag(options:{orderId:string,tagName:string}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/addOrderTag`, {
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
// 删除标签
export async function removeOrderTag(options:{orderId:string,tagName:string}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/removeOrderTag`, {
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

// 批量添加标签列表
export async function batchAddOrderTags(options:{orderIds:string,tagNames:string}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/batchAddOrderTags`, {
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

// 获取订单列表
export async function getOrderList(options:any,signal?:AbortSignal){
  const res = await request<ApiOrders.Default>(`/ApiOrders/order_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      ...options
    },
    signal:signal
  })
  if (res.code != 0 && res.code != 201) errHandle(res);
  return res;
}

// 订单取消归档
export async function batchUnarcOrder(ids:string) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/batchUnarcOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      orderIds:ids
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 订单归档
export async function batchArcOrder(ids:string) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/batchArcOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      orderIds:ids
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 开始发货
export async function resumeOrderShipping(options:{orderId:string,fulfillmentId:string}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/resumeOrderShipping`, {
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

// 编辑订单产品
export async function editOrderProducts(options:any) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/editOrderProducts`, {
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

// 退款
export async function setOrderRefunded(options:any) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/setOrderRefunded`, {
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

// 拆分发货
export async function splitOrderProducts(options:{orderProducts:string}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/splitOrderProducts`, {
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

export async function getReturnActions(languagesId:string) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/getReturnActions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languagesId:languagesId
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

export async function getReturnStatuses(languagesId:string) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/getReturnStatuses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      languagesId:languagesId
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 预览订单产品
export async function previewOrderProducts(options:{
  languages_id:string,
  orderSeq:string,
  mainOrderSeq:string,
  productInfoList:string
 }) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/previewOrderProducts`, {
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

// 订单产品更新
export async function updateOrderProducts(options:{
  languages_id:string,
  orderSeq:string,
  mainOrderSeq:string,
  sendEmail:boolean,
  sendPaymentEmail:boolean,
  productInfoList:string
}) {
  const res = await request<ApiOrders.Default>(`/ApiOrders/updateOrderProducts`, {
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
