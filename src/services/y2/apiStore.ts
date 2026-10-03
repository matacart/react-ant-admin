import request from '@/utils/request';
import cookie from 'react-cookies';
import { errHandle } from './apiAppstore';

// 基础设置
export async function getTodayData(startDate:number,endDate:number,options?: { signal?: AbortSignal }) {
  const res = await request<ApiStore.Default>('/ApiStore/today_statistics', {
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
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除产品
export async function deleteProduct(id: string) {
  const res = await request<ApiStore.Default>('/ApiStore/product_del', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      id: id,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取产品详情
export async function getProductDetail(id: string,languagesId: string) {
  const res = await request<ApiStore.Default>('/ApiStore/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      id: id,
      languages_id: languagesId
    },
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 选项类型
export async function getOptionType() {
  const res = await request<ApiStore.Default>('/ApiStore/product_option_type_select', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

//创建 --- 更新商品 
export async function upDateProduct(options:any){
  const res = await request<ApiStore.Default>('/ApiStore/product_add', {
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

// 查询  ----产品列表
// page: 1
// limit: 10
// domain_id: 
// languages_id: 
// model: 1
// title: 
// tags
export async function getProductList(options:any,signal?: AbortSignal) {
  const res = await request<ApiStore.ProductList>(`/ApiStore/product_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id: cookie.load("domain")?.id,
      ...options
    },
    signal
  })
  if (res.code != 0 && res.code != 201) errHandle(res);
  return res;
}

// 修改产品的状态 0：下架 1：上架 2:存档
export async function upDateProductStatus(productId: string, status: string) {
  const res = await request<ApiStore.Default>('/ApiStore/product_status_update', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      id: productId,
      status: status
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 批量删除
export async function deleteProductList(ids:string) {
  const res = await request<ApiStore.Default>('/ApiStore/product_batchdel', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ids: ids
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 批量更新价格
export async function updataBatchUpdatePrice(options:any) {
  const res = await request<ApiStore.Default>('/ApiStore/batchUpdatePrice', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}


// 创建款式名称 languages_id product_option_name sort product_option_type_id status
export async function addStyleName(options:{
  id:string,
  languages_id:string,
  product_option_name:string,
  sort:string,
  product_option_type_id:string,
  status:string
}){
  const res = await request<ApiStore.Default>('/ApiStore/product_option_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 将款式添加到对应的产品id
// option_id: 1363158285484
// optionvaluesIds: 1363166745810
// productIds: 1363152740171
// status: 1
export async function addStyle(options:{
  option_id:number,
  optionvaluesIds:number,
  productIds:string
}){
  const res = await request<ApiStore.Default>('/ApiStore/attribute_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      status:1,
      ...options,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}
// 通过模型获取该模型下的所有款式
// model: 12332222111   languages_id: 12332222111
// ApiStore/attribute_list
export async function getProductStyleList(options:{
  model:string,
  languages_id:string,
}){
  const res = await request<ApiStore.Default>('/ApiStore/attribute_list',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

export async function getProductOption(options:{
  id:string,
  languages_id:string,
}){
  const res = await request<ApiStore.Default>('/ApiStore/product_option',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}


// 获取所有款式选项
export async function getProductOptionSelect(languagesId:string){
  const res = await request<ApiStore.Default>('/ApiStore/product_option_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      languages_id:languagesId
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// id: 1363171657457
// attributes_image: []
// price_prefix: +
// option_values_price: 0.0000
// product_attribute_weight: 011
// sort: 657457
// status: 1
// 修改产品款式
// export async function updateProductStyle(id:number,price:string,weight:string){
//   return await request('/ApiStore/attribute_add',{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     data:{
//       "id":id,
//       "attributes_image":"[]",
//       "option_values_price":price,
//       "product_attribute_weight":weight,
//       "sort":1,
//       "status":1
//     }
//   })
// }

// 删除款式
// export async function deleteProductStyle(id:number){
//   return await request('/ApiStore/attribute_del',{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     data:{
//       id:id
//     }
//   })
// }

// 获取所有款式
export async function getProductStyleValueList(options:{
  option_id:string,
  languages_id:string
}){
  const res = await request<ApiStore.Default>('/ApiStore/product_option_values_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      page:1,
      limit:100,
      ...options,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 添加款式选项
export async function addProductOptionValues(options:{
  id:string,
  languages_id:string,
  option_id:string,
  option_values_name:string
}){
  const res = await request<ApiStore.Default>('/ApiStore/product_option_values_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options,
      status:"1",
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 添加标签
export async function addTags(languagesId:string,tag:string){
  const res = await request<ApiStore.Default>('/ApiStore/tags_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      languages_id:languagesId,
      tags:tag
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除标签
export async function removeTags(options:{
  languages_id:string,
  tag:string
}){
  const res = await request<ApiStore.removeTags>('/ApiStore/tags_del',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 查询标签
export async function selectTags(options:{
  languages_id:string,
  tagName:string,
  order_field?:string,
  order_direction?:string,
}){
  const res = await request<ApiStore.selectTags>('/ApiStore/tags_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options,
    }
  })
  if (res.code != 0 && res.code != 201) errHandle(res);
  return res;
}

// 平台分类
export async function getPlatformCategorySelect(language:string){
  const res = await request<ApiStore.Default>('/ApiStore/platform_category_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      language_id:language,
      // page:1,
      // limit:100,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 查询
export async function getCategorySelect(options:{
  page?:number,
  limit?:number
},signal?:AbortSignal){
  const res = await request<ApiStore.Category>('/ApiStore/category_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      ...options,
    },
    signal: signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 分类列表
export async function getCategoryList(options:{
  languages_id:string,
  page:string,
  limit:string,
},signal?:AbortSignal){
  const res = await request<ApiStore.Category>('/ApiStore/category_list',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      ...options
    },
    signal: signal
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 详情
export async function getCategory(id:string,languageId:string){
  const res = await request<ApiStore.Default>('/ApiStore/category',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      id:id,
      languages_id: languageId,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 更新分类 无id时创建
export async function setCategory(options:any){
  const res = await request<ApiStore.Default>('/ApiStore/category_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id: cookie.load("domain")?.id,
      ...options
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除分类
export async function deleteCategory(id:string){
  const res = await request<ApiStore.Default>('/ApiStore/category_del',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 采购订单列表
export async function getPurchaseList(orderNumber?:string,status?:string,supplier?:string,warehouse?:string,px?:any){
  const res = await request<ApiStore.Default>('/ApiStore/purchase_orders_list',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      order_number:orderNumber,
      orders_status_id:status,
      supplier_id:supplier,
      warehouse_id:warehouse
    }
  })
  if (res.code != 0 && res.code != 201) errHandle(res);
  return res;
}

// 采购订单详情
export async function getPurchase(id:string){
  const res = await request<ApiStore.Default>('/ApiStore/purchase_orders',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 添加采购订单
export async function addPurchaseOrders(options:any){
  const res = await request<ApiStore.Default>('/ApiStore/purchase_orders_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // 订单号
      order_number:options.orderNumber,
      supplier_id:options.supplierId,
      supplier_name:options.supplierName,
      warehouse_id:options.warehouseId,
      warehouse_name:options.warehouseName,
      currency:options.currency,
      // 汇率
      currency_value:options.currencyRate,
      payment_terms_id:options.paymentTermsId,
      payment_terms:options.paymentTerms,
      shipping_firstname:options.firstName,
      shipping_lastname:options.lastName,
      shipping_company:"",
      shipping_street_address:options.address,
      shipping_detailed_address:options.detailedAddress,
      shipping_district:options.district,
      shipping_country:options.country,
      shipping_country_id:options.countryId,
      shipping_state:options.state,
      shipping_state_id:options.stateId,
      shipping_city:options.city,
      shipping_city_id:options.cityId,
      // 运输商
      shipments:JSON.stringify(options.shippings),

      orders_status_id:"1",
      order_tax:"",
      order_total:options.orderTotal,
      remark:options.remark,
      comments:"",
      send_email:"0",
      status:"1"
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 编辑采购订单
export async function editPurchaseOrders(options:any){
  const res = await request<ApiStore.Default>('/ApiStore/purchase_orders_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      // 订单号
      id:options.id,
      order_number:options.orderNumber,
      supplier_id:options.supplierId,
      supplier_name:options.supplierName,
      warehouse_id:options.warehouseId,
      warehouse_name:options.warehouseName,
      currency:options.currency,
      currency_value:options.currencyId,
      payment_terms_id:options.paymentTermsId,
      payment_terms:options.paymentTerms,
      shipping_firstname:options.firstName,
      shipping_lastname:options.lastName,
      shipping_company:"",
      shipping_street_address:options.address,
      shipping_detailed_address:options.detailedAddress,
      shipping_district:options.district,
      shipping_country:options.country,
      shipping_country_id:options.countryId,
      shipping_state:options.state,
      shipping_state_id:options.stateId,
      shipping_city:options.city,
      shipping_city_id:options.cityId,
      // 运输商
      shipments:JSON.stringify(options.shippings),

      orders_status_id:"1",
      order_tax:"",
      order_total:options.orderTotal,
      remark:options.remark,
      comments:"",
      send_email:"0",
      status:"1"
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 删除采购单
export async function delPurchaseOrders(id:string){
  const res = await request<ApiStore.Default>('/ApiStore/purchase_orders_del',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      id:id,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 添加仓库地址
export async function addWarehouse(options:any){
  const res = await request<ApiStore.Default>('/ApiStore/warehouse_add',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
      id:"",
      code:options.warehouseLocationCode,
      name:options.warehouseLocationName,
      // 邮箱
      capacity:options.capacity,
      occupied_space:"",
      country:options.countryLaber,
      country_id:options.nation,
      state:options.provinceLaber,
      state_id:options.province,
      city:options.cityLaber,
      city_id:options.city,
      district:options.district,
      postcode:options.postcode,
      address:options.address,
      detailed_address:options.detailedAddress,
      // 姓氏
      lastname:options.lastName,
      // 名称
      firstname:options.name,
      telephone:options.phone,
      email_address:options.email,
      status:"1",
      is_default:"0"
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 仓库地址列表
export async function getAddWarehouseList(){
  const res = await request<ApiStore.Default>('/ApiStore/warehouse_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 仓库地址详情
export async function getAddWarehouse(id:string){
  const res = await request<ApiStore.Default>('/ApiStore/warehouse_select',{
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data:{
      domain_id:cookie.load("domain")?.id,
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 获取草稿单标签
export async function getDraftOrderTagList(draftId:string) {
  const res = await request<ApiStore.Default>(`/ApiStore/getDraftOrderTagList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      draftId:draftId
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 草稿单添加标签
export async function batchAddDraftOrderTags(options:{draftIds:string,tagNames:string}) {
  const res = await request<ApiStore.Default>(`/ApiStore/batchAddDraftOrderTags`, {
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

// 添加草稿单
export async function addDraftOrder(options:any) {
  const res = await request<ApiStore.Default>(`/ApiStore/createOrder`, {
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

// 草稿单列表
export async function getOrderDraftList(options:any,signal?:AbortSignal) {
  const res = await request<ApiStore.Order>(`/ApiStore/order_draft_list`, {
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
  if (res.code != 0) errHandle(res);
  return res;
}

// 草稿单信息
export async function getDraftDetail(draftId:string) {
  const res = await request<ApiStore.Default>(`/ApiStore/getDraftDetail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      draftId:draftId
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}

// 草稿单
export async function editDraftOrder(options:any) {
  const res = await request<ApiStore.Default>(`/ApiApiStore/editDraftOrder`, {
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

// 删除草稿单
export async function delDraftOrder(id:any) {
  const res = await request<ApiStore.Default>(`/ApiApiStore/delDraftOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      domain_id:cookie.load("domain")?.id,
      draftId:id
    }
  })
  if (res.code != 0) errHandle(res);
  return res;
}